from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import and_
from sqlalchemy.orm import Session
from app.config import settings
from typing import List, Optional
from .. import models, schemas, oauth2
from ..utils import format_output
from ..database import get_db
import datetime
import os
import csv

router = APIRouter(prefix="/report", tags=['Report'])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def generate_report(report: schemas.GenerateReport, db: Session = Depends(get_db),
                          current_user=Depends(oauth2.get_current_user)):
    start_year, start_month, start_day = report.since.split("-")  # split the date
    start_date = datetime.datetime(int(start_year), int(start_month), int(start_day), 1, 5, 5,
                                   100000)  # create a date object
    end_year, end_month, end_day = report.until.split("-")
    end_date = datetime.datetime(int(end_year), int(end_month), int(end_day), 23, 59, 55, 100000)
    visits = db.query(models.Visit).filter(models.Visit.date.between(start_date, end_date)).filter(
        and_(models.Visit.building_id == report.building, models.Visit.office_id == report.office)).all()
    if not visits:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'there is not visits with this parameters')
    visits = format_output(visits)
    cwd = os.getcwd()
    report_path = os.path.join(cwd, "app/reports")
    rel_path = f"{start_day}-{start_month}-{start_year}__{end_day}-{end_month}-{end_year}_{current_user.user_id}.csv"
    server_path = f'{settings.domain_name}/app/reports/{rel_path}'
    report = open(f"{report_path}/{rel_path}", "w", newline='')
    output_report = csv.DictWriter(report, list(visits[0].keys()))
    output_report.writeheader()
    for visit in visits:
        output_report.writerow(visit)
    report.close()
    new_report = models.Report(owner=current_user.user_id, url=server_path)
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


@router.get("/{id}")
async def get_report(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    report = db.query(models.Report).filter(models.Report._id == id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"report with {id} not exists")
    return report
