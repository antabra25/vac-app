from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session
from starlette import status
from ..database import get_db
from .. import schemas, models, utils, oauth2

router = APIRouter(prefix="/users", tags=['Users'])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.CreateUser, db: Session = Depends(get_db),
                      current_user: int = Depends(oauth2.get_current_user)):
    role = db.query(models.Role).filter(models.Role.name == user.role).first()
    user.role = role._id
    hashed_password = utils.hash(user.password)
    user.password = hashed_password
    user.photo = utils.save_photo(user.photo, user.username, 'user')
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/")
async def list_users(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),
                     page_size: int = 10, page_number: int = 1):
    if current_user.role == 3 or current_user.role == 4:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    users = db.query(models.User).limit(page_size).offset((page_number - 1) * page_size).all()
    total = db.query(models.User).count()

    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"There are no users")

    return {"users": users, "total": total}


@router.get("/check/{username}")
async def check_user(username: str, db: Session = Depends(get_db),
                     current_user: int = Depends(oauth2.get_current_user)):
    check_user = db.query(models.User).filter(models.User.username == username).first()
    if check_user == None:
        available: bool = True
    else:
        available: bool = False

    return {"available": available}


@router.get("/verify/{email}")
async def check_email(email: str, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    check_email = db.query(models.User).filter(models.User.email == email).first()
    if check_email == None:
        available: bool = True
    else:
        available: bool = False

    return {"available": available}


@router.get("/{id}")
async def get_user(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User._id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with {id} not exists")
    return user


@router.put("/location")
async def update_user_location(update_location: schemas.UpdateUserLocation, db: Session = Depends(get_db),
                               current_user=Depends(oauth2.get_current_user)):
    location = db.query(models.Location).filter(models.Location.name == update_location.name).first()
    user = current_user
    user.location = location._id  # update user location
    db.commit()
    db.refresh(user)
    return user


@router.put("/{id}")
async def update_user(id: int, updated_user: schemas.CreateUser, db: Session = Depends(get_db),
                      current_user: int = Depends(oauth2.get_current_user)):
    role = db.query(models.Role).filter(models.Role.name == updated_user.role).first()
    user = db.query(models.User).filter(models.User._id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with {id} not exists")

    user.role = role._id
    user.username = updated_user.username
    user.name = updated_user.name
    user.lastname = updated_user.lastname
    user.email = updated_user.email
    user.photo = utils.save_photo(updated_user.photo, updated_user.username, 'user')
    user.password = utils.hash(updated_user.password)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{id}")
async def delete_user(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    query = db.query(models.User).filter(models.User._id == id)
    user = query.first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not exists user with {id}")
    query.delete()
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
