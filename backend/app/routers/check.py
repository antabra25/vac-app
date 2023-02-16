from sqlalchemy import and_
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app import schemas, models
from app.database import get_db
from PIL import Image
from pyzbar.pyzbar import decode
import base64
import os
from app import oauth2

router = APIRouter(prefix="/check", tags=['Check'])


def read_qr(user_id):
    home_path = os.path.expanduser("~")
    rel_check = f'/app/check/{user_id}.png'  # relative path to file
    full_path = os.path.join(home_path, rel_check)
    try:
        decode_data = decode(Image.open(full_path))  # type: List[dict]
        decode_data = decode_data[0].data

        decode_data = base64.b16decode(decode_data)  #

        decode_data = decode_data.decode('utf8')  # Pasa la cadena de formato bytes a str

        if decode_data.startswith('bbk3t'):

            decode_data = decode_data.lstrip("bbk3t")  # Elimina el prefijo
            data = list(decode_data)  # Convierte la cadena en una lista de caracteres


        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='This QR does not belong to this system')

    except Exception as Error:
        print(Error)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Could not read the QR")

    to_remove = ['[', ']']
    for el in to_remove:
        index = data.index(el)
        data.pop(index)
    delimiter = data.index(',')
    pass_id = ''
    for i, v in enumerate(data[0: delimiter]):
        pass_id += v
    pass_id = int(pass_id)
    building_id = ''
    for v in data[delimiter + 1:]:
        building_id += v

    building_id = int(building_id)
    data.clear()
    data.append(pass_id)
    data.append(building_id)

    return data


def save_qr(url: str, user_id: str):
    before, match, raw_url = url.partition('base64,')
    photo_decoded = base64.b64decode(raw_url)
    home_path = os.getcwd()
    photo_path = f"{home_path}/app/check/{user_id}.png"
    with open(photo_path, 'wb') as photo:
        photo.write(photo_decoded)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_check(check: schemas.CreateCheck, db: Session = Depends(get_db),
                       current_user=Depends(oauth2.get_current_user)):
    # Almacenar la foto recibida desde el frontend
    save_qr(check.qr, current_user._id)
    # Leer datos del QR
    pass_id, building_id = read_qr(current_user._id)
    visit = db.query(models.Visit).filter(
        and_(models.Visit.passcard == pass_id, models.Visit.activated == True)).first()

    if visit:
        visitor_id = visit.visitor
        visit_id = visit._id
        ci = visit.visitors.ci
        name = visit.visitors.name
        lastname = visit.visitors.lastname
        flat = visit.offices.flat
        office = visit.offices.acronym
        photo = db.query(models.Visitor).filter(models.Visitor.ci == ci).first().photo
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="This is not valid pass")

    if current_user.role == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Usted no tiene permitido verificar vistantes.")
    user = db.query(models.User).filter(models.User._id == current_user._id).first()
    user_location_id = user._id
    is_exit = user.locations.floor

    if is_exit == 'PB':
        close_pass = db.query(models.Pass).filter(models.Pass._id == pass_id)
        close_visit = db.query(models.Visit).filter(models.Visit._id == visit_id)
        close_pass.update({models.Pass.activated: False})
        close_visit.update({models.Visit.activated: False})
        db.commit()

    new_check = models.Check(visitor=visitor_id,
                             location=user_location_id)
    db.add(new_check)
    db.commit()
    db.refresh(new_check)

    return {"_id": pass_id, "ci": ci, "name": name, "lastname": lastname, "flat": flat, "office": office,
            "photo": photo}


@router.post("/manual", status_code=status.HTTP_201_CREATED)
async def create_manual_check(check: schemas.CreateManualCheck, db: Session = Depends(get_db),
                              current_user=Depends(oauth2.get_current_user)):
    if current_user.role == 1 or current_user.role == 2:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="")

    user = db.query(models.User).filter(models.User._id == check.user).first()
    user_location = user.location
    new_check = models.Check(visitor=check.visitor,
                             location=user_location)
    db.add(new_check)
    db.commit()
    db.refresh(new_check)
    return new_check


@router.get("/")
async def list_check(db: Session = Depends(get_db), page_size: int = 10, page_number: int = 1,
                     current_user=Depends(oauth2.get_current_user)):
    checkups = db.query(models.Check).order_by(models.Check.date.desc()).limit(page_size).offset(
        (page_number - 1) * page_size).all()
    if not checkups:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is not Checks yet")
    return checkups


@router.put("/{id}", response_model=schemas.PublicCheck)
async def update_check(updated_check: schemas.PublicCheck, db: Session = Depends(get_db),
                       current_user=Depends(oauth2.get_current_user)):
    query = db.query(models.Check).filter(models.Check._id == id)
    check = query.first()
    if not check:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Check with {id} not exists")
    query.update(updated_check)
    db.commit()

    return check
