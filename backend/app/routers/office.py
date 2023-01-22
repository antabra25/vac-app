from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix='/offices',
    tags=['Office']
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_office(office: schemas.CreateOffice, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    duplicated = db.query(models.Office).filter(models.Office.name == office.name).first()
    if duplicated:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="there is already a building with that name")
    building = db.query(models.Building).filter(models.Building.name == office.building).first()
    building = building._id
    office.building = building
    new_office = models.Office(**office.dict())
    db.add(new_office)
    db.commit()
    db.refresh(new_office)
    return new_office


# Get offices belong building
@router.get("/building/{name}")
async def list_offices_by_building_id(name: str, db: Session = Depends(get_db),
                                      current_user=Depends(oauth2.get_current_user)):
    building = db.query(models.Building).filter(models.Building.name == name).first()
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is no building with that name")
    offices = db.query(models.Office).filter(models.Office.building == building._id).all()
    if not offices:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Offices than belong to Building with {id} not exists")

    total = db.query(models.Office).filter(models.Office.building == building._id).count()

    return {'total': total, 'offices': offices}


@router.get("/")
async def list_offices(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    offices = db.query(models.Office).all()
    total = db.query(models.Office).count()
    if not offices:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Offices than belong to Building with {id} not exists")
    return {'total': total, 'offices': offices}


@router.get("/{id}", status_code=status.HTTP_200_OK)
async def get_office(id: int, db: Session = Depends(get_db)):
    office_query = db.query(models.Office).filter(models.Office._id == id)
    office = office_query.first()
    if not office:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"office with id :{id} does not exists")
    return office


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_office(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    office_query = db.query(models.Office).filter(models.Office._id == id)
    office = office_query.first()
    if office is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"office with id :{id} does not exists")

    office_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}")
async def update_office(id: int, office_update: schemas.CreateOffice, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    office_query = db.query(models.Office).filter(models.Office._id == id)
    office = office_query.first()
    if office is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Office with id:{id} does not exists")

    office_query.update(office_update.dict(), synchronize_session=False)
    db.commit()
    return office_query.first()
