from passlib.context import CryptContext
from fastapi import HTTPException
from .config import settings
from starlette import status
from . import models
import base64
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def save_photo(url: str, identifier: str, identity: str):
    before, match, raw_url = url.partition('base64,')
    photo_decoded = base64.b64decode(raw_url)
    home_path = os.path.expanduser("~")
    if identity == 'visitor':
        server_path = f"{settings.domain_name}/app/visitors/{identifier}.png"
        photo_path = f"{home_path}/PycharmProjects/APIMFV/app/visitors/{identifier}.png"
    elif identity == 'user':
        server_path = f"{settings.domain_name}/app/users/{identifier}.png"
        photo_path = f"{home_path}/PycharmProjects/APIMFV/app/users/{identifier}.png"
    try:
        with open(photo_path, 'wb') as photo:
            photo.write(photo_decoded)
    except Exception as error:
        print(error)

    return server_path


def format_output(iterator):
    out = []
    for field in iterator:
        visit = {
            "_id": field._id,
            "ci": field.visitors.ci,
            "name": field.visitors.name,
            "lastname": field.visitors.lastname,
            "phone": field.visitors.phone,
            "pass": field.passes._id,
            "office": field.offices.acronym,
            "flat": field.offices.flat,
            "host": field.host,
            "date": field.date.strftime("%d/%m/%Y %H:%M")
        }
        out.append(visit)

    return out


def output_find(iterator, db):
    out = []
    query = db.query(models.Visit)
    for visit in iterator:
        visit_id = visit._id
        visit = query.filter(models.Visit._id == visit_id).first()
        visit_fields = {
            "_id": visit._id,
            "ci": visit.visitors.ci,
            "name": visit.visitors.name,
            "lastname": visit.visitors.lastname,
            "phone": visit.visitors.phone,
            "pass": visit.passes._id,
            "office": visit.offices.acronym,
            "flat": visit.offices.flat,
            "host": visit.host,
            "date": visit.date.strftime("%d/%m/%Y %H:%M")
        }

        out.append(visit_fields)

    return out


def get_visits_by_date(start, end, db):
    visits = db.query(models.Visit).filter(models.Visit.date.between(start, end)).all()
    if not visits:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'there is not visits in this time')
    return output_find(visits, db)
