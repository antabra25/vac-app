from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/visitors",
    tags=['Visitors']
)


@router.get("/{id}")
async def get_visitor(id: str, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    visitor_query = db.query(models.Visitor).filter(models.Visitor.ci == id)
    visitor = visitor_query.first()
    if not visitor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"visitante con la C.I {id} no existe")
    return visitor


@router.get("/")
async def list_visitor(db: Session = Depends(get_db), page_size: int = 10, page_number: int = 1,
                       current_user=Depends(oauth2.get_current_user)):
    visitors = db.query(models.Visitor).limit(page_size).offset((page_number - 1) * page_size).all()
    total = db.query(models.Visitor).count()
    return {"visitors": visitors, "total": total}


@router.put("/{id}")
async def update_visitor(id: int, updated_visitor: schemas.CreateVisitor, db: Session = Depends(get_db),
                         current_user=Depends(oauth2.get_current_user)):
    if current_user.role != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="")
    visitor = db.query(models.Visitor).filter(models.Visitor._id == id).first()
    if not visitor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not visitor with id {id}")
    db.query(models.Visitor).filter(models.Visitor._id == id).update(**updated_visitor.dict())
    db.commit()
    db.refresh()
    return visitor


@router.get("/verify/")
async def verify_phone(db: Session = Depends(get_db), phone: str = ''):
    visitor = db.query(models.Visitor).filter(models.Visitor.phone == phone).first()
    if visitor:
        return True
    else:
        return False


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_visitor(db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="")
    visitor = db.query(models.Visitor).filter(models.Visitor._id == id).first()
    if not visitor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"there is not visitor with id {id}")
    visitor.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
