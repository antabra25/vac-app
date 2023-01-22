import datetime
from fastapi import APIRouter, Depends
from sqlalchemy import and_, func
from sqlalchemy.orm import Session

from app import models, oauth2
from app.database import get_db

router = APIRouter(prefix="/home", tags=["Home"])


@router.get("/resume/")
async def home_resume(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    start_date = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    current_date = datetime.datetime.now()
    closed = len(db.query(models.Visit).filter(models.Visit.activated == False).all())
    closed_today = len(db.query(models.Visit).filter(
        and_(models.Visit.activated == False, models.Visit.date.between(start_date, current_date))).all())
    activated = len(db.query(models.Visit).filter(models.Visit.activated == True).all())

    return {"activated": activated, "closed": closed, "today": closed_today}
