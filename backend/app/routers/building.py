from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db
from app import oauth2

router = APIRouter(prefix="/buildings", tags=['Buildings'])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_building(building: schemas.CreateBuilding, db: Session = Depends(get_db),
                          current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    duplicated = db.query(models.Building).filter(models.Building.name == building.name).first()
    if duplicated:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f'Field name duplicated')
    new_building = models.Building(**building.dict())
    db.add(new_building)
    db.commit()
    db.refresh(new_building)

    return new_building


@router.get("/{id}")
async def get_building(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    building_query = db.query(models.Building).filter(models.Building._id == id)
    building = building_query.first()
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Building with {id} not exits')
    return building


@router.get("/")
async def list_buildings(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    buildings = db.query(models.Building).all()
    if not buildings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there are no buildings yet")

    return buildings


@router.put("/{id}")
async def update_building(id: int, update: schemas.CreateBuilding, db: Session = Depends(get_db),
                          current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    building = db.query(models.Building).filter(models.Building._id == id).first()
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'building with {id} not exits')

    building.name = update.name
    building.address = update.address
    db.commit()
    db.refresh(building)
    return building


@router.delete("/{id}")
async def delete_building(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    building_query = db.query(models.Building).filter(models.Building._id == id)
    building = building_query.first()
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'building with {id} not exits')

    building_query.delete(synchronize_session=False)
    db.commit()
