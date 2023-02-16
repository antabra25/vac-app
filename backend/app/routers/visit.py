from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .. import models, schemas, oauth2
from ..database import get_db
from .. import utils
from datetime import datetime

from ..utils import format_output, output_find, get_visits_by_date

router = APIRouter(
    prefix="/visits",
    tags=['Visit']
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_visit(visit: schemas.CreateVisit,
                       db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    if current_user.role != 3:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have the proper permissions")
    activate_pass = db.query(models.Pass).filter(models.Pass._id == visit.ticket)
    activate_pass.update({models.Pass.activated: True})
    db.commit()
    verify_visitor = db.query(models.Visitor).filter(models.Visitor.ci == visit.ci).first()
    if verify_visitor:
        visitor = verify_visitor._id
        visit_date = db.query(models.Visit).order_by(models.Visit.date.desc()).filter(
            models.Visit.visitor == visitor).first()
        if visit_date:
            today = datetime.now()
            visit_date = visit_date.date
            delta = today - visit_date
            days = delta.days
            if days > 29:
                verify_visitor.photo = utils.save_photo(visit.photo, visit.ci, 'visitor')
                db.commit()
    else:
        photo = utils.save_photo(visit.photo, visit.ci, 'visitor')
        exists_phone = db.query(models.Visitor).filter(models.Visitor.phone == visit.phone).first()
        if exists_phone:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Phone number already exists")

        new_visitor = models.Visitor(ci=visit.ci, name=visit.name, lastname=visit.lastname, phone=visit.phone,
                                     photo=photo)
        db.add(new_visitor)
        db.commit()
        db.refresh(new_visitor)
        visitor = new_visitor._id
    building = db.query(models.Building).filter(models.Building.name == visit.building).first()
    office = db.query(models.Office).filter(models.Office.name == visit.office).first()
    reason = db.query(models.Reason).filter(models.Reason.name == visit.reason).first()
    reason = reason._id
    building = building._id
    office = office._id
    new_visit = models.Visit(visitor=visitor, user=current_user._id, office=office, building=building, reason=reason,
                             passcard=visit.ticket, company=visit.company, host=visit.host)
    db.add(new_visit)
    db.commit()
    db.refresh(new_visit)

    return new_visit


@router.get("/")
async def list_visits(db: Session = Depends(get_db), page_size: int = 10, page_number: int = 1,
                      current_user: int = Depends(oauth2.get_current_user)):
    visit_query = db.query(models.Visit)
    visits = visit_query.order_by(models.Visit._id.desc()).limit(page_size).offset(
        (page_number - 1) * page_size).all()
    visits = format_output(visits)
    total = visit_query.count()

    return {"visits": visits, "total": total}


@router.get("/active/")
async def get_active_visits(db: Session = Depends(get_db), page_size: int = 10, page_number: int = 1,
                            current_user: int = Depends(oauth2.get_current_user)):
    visits_activated = db.query(models.Visit, models.Visitor).filter(models.Visit.activated == True).filter(
        models.Visit.visitor == models.Visitor._id).order_by(models.Visit.date.desc()).limit(
        page_size).offset(
        (page_number - 1) * page_size).all()
    visits = []
    for item in visits_activated:
        visit, visitor = item
        visits.append({'_id': visit._id,
                       'visitor': visitor._id,
                       'host': visit.host,
                       'date': visit.date, 'ci': visitor.ci, 'name': visitor.name,
                       'lastname': visitor.lastname, 'office': visit.offices.acronym,
                       'flat': visit.offices.flat, 'building': visit.buildings.name,
                       'photo': visitor.photo, 'phone': visitor.phone})
    total = db.query(models.Visit).filter(models.Visit.activated == True).count()
    return {"visits": visits, "total": total}


@router.get("/search/active")
async def search_active_visits(q: str, db: Session = Depends(get_db),
                               current_user: int = Depends(oauth2.get_current_user)):
    try:
        passcard = int(q)
    except Exception as Error:
        passcard = 0
    activated = db.query(models.Visit, models.Visitor).filter(models.Visit.activated == True).filter(
        models.Visit.visitor == models.Visitor._id).filter(
        or_(models.Visitor.name == q, models.Visitor.lastname == q, models.Visitor.ci == q,
            models.Visitor.phone == q, models.Visit.passcard == passcard)).order_by(
        models.Visit.date.desc()).all()
    visits = []
    for item in activated:
        visit, visitor = item
        visits.append({'_id': visit._id,
                       'host': visit.host,
                       'date': visit.date, 'ci': visitor.ci, 'name': visitor.name,
                       'lastname': visitor.lastname, 'office': visit.offices.acronym,
                       'flat': visit.offices.flat, 'building': visit.buildings.name,
                       'photo': visitor.photo, 'phone': visitor.phone})

    return visits


@router.get("/{search}/{field}")
async def get_visits(db: Session = Depends(get_db), search: str = '', field: str = 'CI'):
    if field == 'CI':
        visitor_query = db.query(models.Visitor).filter(models.Visitor.ci == search).first()
        if not visitor_query:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'There is not visitor with C.I {search}')
        visits = visitor_query.visits

        return output_find(visits, db)
    elif field == 'Telf':
        visitor_query = db.query(models.Visitor).filter(models.Visitor.phone == search).first()
        if not visitor_query:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f'There is not visitor with Telf {search}')
        visits = visitor_query.visits
        return output_find(visits, db)
    elif field == 'Oficina':
        office_query = db.query(models.Office).filter(
            or_(models.Office.acronym == search, models.Office.name == search)).first()
        if not office_query:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'There is not Office with name {search}')
        visits = office_query.visits
        return output_find(visits, db)
    elif field == 'Fecha':
        day, month, year = search.split('-')
        day = int(day)
        month = int(month)
        year = int(year)
        start_date = datetime(year, month, day, 1, 5, 5, 100000)
        end_date = datetime(year, month, day, 23, 59, 55, 100000)
        return get_visits_by_date(start_date, end_date, db)


@router.get("/{id}")
async def get_visit(id: str, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    visit_query = db.query(models.Visit).filter(models.Visit.visitor == id)
    visit = visit_query.first()

    if visit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"visit with id: {id} does not exist")

    return visit


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_visit(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    visit = db.query(models.Visit).filter(models.Visit._id == id).first()
    if visit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"visit with id :{id} does not exits")

    db.query(models.Visit).filter(models.Visit._id == id).delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}")
async def update_visit(id: int, updated_visit: schemas.CreateVisit, db: Session = Depends(get_db),
                       current_user: int = Depends(oauth2.get_current_user)):
    visit_query = db.query(models.Visit).filter(models.Visit._id == id)
    visit = visit_query.first()
    if visit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"visit with id:{id} does not exist")

    visit_query.update(updated_visit.dict(), synchronize_session=False)
    db.commit()

    return visit_query.first()


@router.put("/close/{id}")
async def closed_visit(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    if current_user.role == 2 or current_user.role == 4:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Only admin and receptionists can close visits")
    visit_query = db.query(models.Visit).filter(models.Visit._id == id)
    visit = visit_query.first()
    close_pass = db.query(models.Pass).filter(models.Pass._id == visit.passcard)
    pass_ = close_pass.first()
    if visit is None or pass_ is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"visit with id:{id} does not exist")
    close_pass.update({models.Pass.activated: False}, synchronize_session=False)
    visit_query.update({models.Visit.activated: False}, synchronize_session=False)
    db.commit()

    return visit_query.first()
