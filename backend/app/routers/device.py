from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List
from app import schemas, models
from app.database import get_db
from app import oauth2

router = APIRouter(prefix="/devices", tags=['Devices'])


@router.post("/{visitor}", status_code=status.HTTP_201_CREATED)
async def create_device(devices: List[schemas.CreateDevice], visitor: int, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    output_devices = []
    for device in devices:
        if None not in device.dict().values():
            new_device = models.Device(visitor=visitor, **device.dict())
            db.add(new_device)
            db.commit()
            db.refresh(new_device)
            output_devices.append(new_device)
        else:
            continue

    return output_devices


@router.get("/")
async def list_devices(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    devices = db.query(models.Device, models.Visitor).join(models.Visitor,
                                                           models.Visitor._id == models.Device.visitor).all()
    total = db.query(models.Device).count()
    if not devices:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="there is not devices")
    return {"devices": devices, "total": total}


@router.get("/{id}", response_model=schemas.PublicDevice)
async def get_device(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    device = db.query(models.Device).filter(models.Device._id == id).first()
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not device with {id}")
    return device


@router.put("/{id}")
async def update_device(id: int, updated_device: schemas.CreateDevice, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    device = db.query(models.Device).filter(models.Device._id == id).first()
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, )
    device.update(**updated_device.dict())
    db.commit()


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_device(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    device = db.query(models.Device).filter(models.Device._id == id).first()
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not device with id {id}")
    device.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
