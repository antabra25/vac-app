from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional, List


# schemas

class BaseCar(BaseModel):
    maker: Optional[str] = None
    model: Optional[str] = None
    plate: Optional[str] = None


class CreateCar(BaseCar):
    pass


class PublicCar(BaseCar):
    _id: int

    class Config:
        orm_mode = True


class BaseDevice(BaseModel):
    name: Optional[str] = None
    serial: Optional[str] = None


class PublicDevice(BaseDevice):
    _id: int

    class Config:
        orm_mode = True


class CreateDevice(BaseDevice):
    pass


class BaseVisitor(BaseModel):
    ci: str
    name: str
    lastname: str
    phone: str
    photo: str


class CreateVisitor(BaseVisitor):
    pass


class PublicVisitor(BaseVisitor):
    _id: int

    class Config:
        orm_mode = True


class BaseUser(BaseModel):
    role: str
    username: str
    name: str
    lastname: str
    email: EmailStr
    location: Optional[str] = None
    photo: Optional[str] = None


class CreateUser(BaseUser):
    password: str


class PublicUser(BaseUser):
    _id: int
    total: int

    class Config:
        orm_mode = True


class UpdateUserLocation(BaseModel):
    name: str


class BaseReason(BaseModel):
    name: str


class CreateReason(BaseReason):
    pass


class BaseOffice(BaseModel):
    building: str
    name: str
    phone: str
    acronym: str
    flat: str


class CreateOffice(BaseOffice):
    pass


class BaseBuilding(BaseModel):
    name: str
    address: str


class CreateBuilding(BaseBuilding):
    pass


class BuildingOffice(BaseBuilding):
    building: int
    offices: str


class BaseRole(BaseModel):
    name: str
    function: str


class CreateRole(BaseRole):
    pass


class BaseLocation(BaseModel):
    building: str
    floor: str


class CreateLocation(BaseLocation):
    pass


class UpdateLocationStatus(BaseModel):
    available: bool


class BasePass(BaseModel):
    building: str


class CreatePass(BasePass):
    qt: int


class BasePhoto(BaseModel):
    url: str


class CreatePhoto(BasePhoto):
    pass


class BaseCheck(BaseModel):
    qr: str


class CreateCheck(BaseCheck):
    pass


class PublicCheck(BaseCheck):
    _id: int
    date: datetime

    class Config:
        orm_mode = True


class CreateManualCheck(BaseModel):
    visitor: int
    user: int


class BaseVisit(BaseModel):
    name: str
    lastname: str
    ci: str
    phone: str
    photo: str
    reason: str
    office: str
    building: str
    ticket: int
    company: str
    host: str


class CreateVisit(BaseVisit):
    pass


class GenerateReport(BaseModel):
    since: str
    until: str
    office: int
    building: int


class BaseReport(BaseModel):
    owner: int
    url: str


class CreateReport(BaseReport):
    pass


class TokenData(BaseModel):
    user: Optional[int] = None
    role: Optional[int] = None


class Token(BaseModel):
    token: str
