from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db
from app import oauth2

router = APIRouter(prefix="/cars", tags=['Cars'])


@router.post("/{visitor}", status_code=status.HTTP_201_CREATED)
async def create_car(car: schemas.CreateCar, visitor: int, db: Session = Depends(get_db),
                     current_user=Depends(oauth2.get_current_user)):
    if None not in car.dict().values():
        new_car = models.Car(visitor=visitor, **car.dict())
        db.add(new_car)
        db.commit()
        db.refresh(new_car)

        return new_car
    else:
        return None


@router.get("/")
async def list_cars(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    cars = db.query(models.Car, models.Visitor).join(models.Visitor,
                                                     models.Visitor._id == models.Car.visitor).order_by(
        models.Car._id.desc()).all()
    total = db.query(models.Car).count()
    if not cars:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="there is not cars")

    return {"cars": cars, "total": total}


@router.get("/{id}")
async def get_car(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    car = db.query(models.Car).join(models.Visitor, models.Visitor._id == models.Car.visitor).filter(
        models.Car._id == id).first()
    if not car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not car with ID {id}")

    return car


@router.put("/{id}", response_model=schemas.PublicCar)
async def update_car(id: int, updated_car: schemas.CreateCar, db: Session = Depends(get_db),
                     current_user=Depends(oauth2.get_current_user)):
    car_query = db.query(models.Car).filter(models.Car._id == id)
    if not car_query.first():
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not car wiht id {id}")

    car_query.update(**updated_car.dict(), synchronize_session=False)
    db.commit()
    return car_query.first()


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_car(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    car = models.query(models.Car).filter(models.Car._id == id)
    if not car.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not car with ID {id}")
    car.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
