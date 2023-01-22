from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/reasons", tags=['Reason']
)


@router.get("/")
async def list_reason(db: Session = Depends(get_db), page_size: int = 10, page_number: int = 1,
                      current_user=Depends(oauth2.get_current_user)):
    reason_query = db.query(models.Reason).limit(page_size).offset((page_number - 1) * page_size)
    reasons = reason_query.all()
    total = reason_query.count()

    return {"reasons": reasons, "total": total}


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_reason(reason: schemas.CreateReason, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    duplicated = db.query(models.Reason).filter(models.Reason.name == reason.name).first()
    if duplicated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Field Name Duplicate")
    new_reason = models.Reason(**reason.dict())
    db.add(new_reason)
    db.commit()
    db.refresh(new_reason)

    return new_reason


@router.get("/{id}")
async def get_reason(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    reason_query = db.query(models.Reason).filter(models.Reason._id == id)
    reason = reason_query.first()
    if not reason:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"reason with {id} does not exits")

    return reason


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reason(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    reason_query = db.query(models.Reason).filter(models.Reason._id == id)
    reason = reason_query.first()
    if not reason:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"reason with  {id} does not exists")

    reason_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}")
async def update_reason(id: int, updated_reason: schemas.CreateReason, db: Session = Depends(get_db),
                        current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="you don't have the correct permission")
    reason_query = db.query(models.Reason).filter(models.Reason._id == id)
    reason = reason_query.first()
    if not reason:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'reason with {id} not exits')
    reason_query.update(updated_reason.dict(), synchronize_session=False)
    db.commit()
    return reason_query.first()
