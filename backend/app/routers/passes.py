from typing import List
from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.openapi.models import Response
from PIL import ImageDraw, ImageFont
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .. import models
from ..config import settings
from ..database import get_db
from .. import schemas
import os.path
import qrcode
import base64
from .. import oauth2

router = APIRouter(prefix="/pass", tags=["Pass"])


def generate_qr(pass_id, building_id, db):
    building_name = db.query(models.Building.name).filter(
        models.Building._id == building_id).first()
    data = f'bbk3t[{pass_id},{building_id}]'
    data = bytes(data, encoding='utf8')
    data = base64.b16encode(data)
    full_name = building_name[0].split(' ')
    first_word, second_word = full_name

    text_to_print = f"{first_word[0]}{second_word[0]}-{pass_id}"
    img = qrcode.make(data)
    width, height = img.size
    x = (width / 2) - 6
    y = height - 30
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('/usr/share/fonts/truetype/dajavu/DejaVuSans-Bold.ttf', 26)
    draw.text((x, y), text_to_print, font=font, fill="black", align="center")
    home_path = os.getcwd()
    pass_path = f"{home_path}/app/QR/{building_id}-{pass_id}.png"
    server_path = f"{settings.domain_name}/app/QR/{building_id}-{pass_id}.png"
    img.save(pass_path)
    return server_path


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_pass(card: schemas.CreatePass, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    new_passes = []
    try:
        building = db.query(models.Building).filter(models.Building.name == card.building).first()._id

        for value in range(card.qt):
            new_pass = models.Pass(building=building)
            db.add(new_pass)
            db.commit()
            db.refresh(new_pass)
            new_passes.append(new_pass)
            pass_path = generate_qr(new_pass._id, new_pass.building, db)
            new_pass.url = pass_path
            db.add(new_pass)
            db.commit()
    except Exception as Error:

        print(Error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="there is a problem creating the pass")

    return new_passes


@router.get("/{id}")
async def get_pass(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    pass_card = db.query(models.Pass).filter(models.Pass._id == id).first()
    if not pass_card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"pass with {id} not exists")

    return pass_card


@router.get("/")
async def list_pass(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user), page_size: int = 10,
                    page_number: int = 1):
    passes = db.query(models.Pass).limit(
        page_size).offset(
        (page_number - 1) * page_size).all()
    if not passes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="there is not passes added.")

    total = db.query(models.Pass._id).count()

    return {"passes": passes, "total": total}


@router.get("/search/")
async def search_pass(q: str, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    try:
        id = int(q)
    except Exception as Error:
        id = 0
    building = db.query(models.Building).filter(models.Building.name == q).first()
    if building:
        building = building._id
    else:
        building = 0
    passes = db.query(models.Pass).filter(or_(models.Pass._id == id, models.Pass.building == building)).all()

    return passes


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_pass(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    pass_query = db.query(models.Pass).filter(models.Pass._id == id)
    office = pass_query.first()
    if office is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Pass with id :{id} does not exists")

    pass_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
