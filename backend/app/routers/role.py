from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, models
from .. import oauth2

router = APIRouter(prefix="/roles", tags=["Roles"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_role(role: schemas.CreateRole, db: Session = Depends(get_db)):
    new_role = models.Role(**role.dict())
    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


@router.get("/")
async def list_roles(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    roles = db.query(models.Role).all()
    if not roles:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is not  exists roles yet")

    return roles


@router.delete("/{id}")
async def delete_role(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    role_query = db.query(models.Role).filter(models.Role._id == id)
    role = role_query.first()
    if role is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"role with id :{id} does not exists")
    role_query.delete(synchronize_session=False)
    db.commit()

