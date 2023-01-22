from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models
from app.database import get_db
from app import oauth2

router = APIRouter(prefix="/locations", tags=["Locations"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_location(location: schemas.CreateLocation, db: Session = Depends(get_db),
                          current_user=Depends(oauth2.get_current_user)):

    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")

    building = db.query(models.Building).filter(models.Building.name == location.building).first()
    name = building.name + "-" + "PISO-" + location.floor
    location.building = building._id
    location_duplicated = db.query(models.Location).filter(
        models.Location.building == building._id).filter(models.Location.floor == location.floor).first()
    if location_duplicated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Duplicate location record")

    new_location = models.Location(name=name, **location.dict())
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location


@router.get("/")
async def list_location(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    locations = db.query(models.Location).all()
    if not locations:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is not locations yet")

    return locations


@router.get("/{id}")
async def get_location(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    location_query = db.query(models.Location).filter(models.Location._id == id)
    location = location_query.first()
    if not location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Location with {id} not exists")
    return location


@router.put("/{id}")
async def update_location(location_updated: schemas.CreateLocation, id: int, db: Session = Depends(get_db),
                          current_user=Depends(oauth2.get_current_user)):
    building = db.query(models.Building).filter(models.Building.name == location_updated.building).first()
    location= db.query(models.Location).filter(models.Location._id == id).first()
    if not location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"There is not location with this {id} ")
    location.building = building._id
    location.floor = location_updated.floor
    db.commit()
    db.refresh(location)
    return location


@router.delete("/{id}")
async def delete_location(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")

    query = db.query(models.Location).filter(models.Location._id == id)
    location = query.first()
    if not location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Location with {id} not exists")
    query.delete(synchronize_session=False)
    db.commit()

