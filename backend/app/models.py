from .database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime


class Visitor(Base):
    __tablename__ = "visitors"
    _id = Column(Integer, primary_key=True, nullable=False)
    ci = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    phone = Column(String, nullable=False, unique=True)
    photo = Column(String, nullable=True, unique=True)
    created = Column(DateTime, default=datetime.now)
    updated = Column(DateTime, onupdate=datetime.now)
    visits = relationship("Visit", back_populates="visitors", cascade="all,delete", passive_deletes=True)
    cars = relationship("Car", back_populates="visitors")
    devices = relationship("Device", back_populates="visitors")
    checkups = relationship("Check", back_populates="visitors")


class Visit(Base):
    __tablename__ = "visits"
    _id = Column(Integer, primary_key=True, nullable=False)
    visitor = Column(Integer, ForeignKey('visitors._id', ondelete='CASCADE'), nullable=False)

    user = Column(Integer, ForeignKey('users._id'))
    reason = Column(Integer, ForeignKey('reasons._id', ondelete='CASCADE'), nullable=False)
    office = Column(Integer, ForeignKey('offices._id', ondelete='CASCADE'), nullable=False)
    building = Column(Integer, ForeignKey('buildings._id', ondelete='CASCADE'), nullable=False)
    passcard = Column(Integer, ForeignKey('passes._id', ondelete='CASCADE'), nullable=False)
    date = Column(DateTime, default=datetime.now)
    updated = Column(DateTime, onupdate=datetime.now)
    company = Column(String, nullable=False)
    activated = Column(Boolean, nullable=False, default=True)
    host = Column(String, nullable=False)
    visitors = relationship("Visitor", back_populates="visits")
    reasons = relationship("Reason", back_populates="visits")
    offices = relationship("Office", back_populates="visits")
    buildings = relationship("Building", back_populates="visits")
    passes = relationship("Pass", back_populates="visits")


class Device(Base):
    __tablename__ = "devices"
    _id = Column(Integer, primary_key=True, nullable=False)
    visitor = Column(Integer, ForeignKey('visitors._id'))
    name = Column(String, nullable=False)
    serial = Column(String, nullable=False)
    visitors = relationship("Visitor", back_populates="devices")


class Car(Base):
    __tablename__ = "cars"
    _id = Column(Integer, primary_key=True, nullable=False)
    visitor = Column(Integer, ForeignKey('visitors._id'))
    maker = Column(String, nullable=False)
    model = Column(String, nullable=False)
    plate = Column(String, nullable=False)
    visitors = relationship("Visitor", back_populates="cars")


class Pass(Base):
    __tablename__ = "passes"
    _id = Column(Integer, primary_key=True, nullable=False)
    building = Column(Integer, ForeignKey('buildings._id'))
    activated = Column(Boolean, default=False)
    url = Column(String, nullable=True)
    visits = relationship("Visit", back_populates="passes", cascade="all, delete",
                          passive_deletes=True)


class Check(Base):
    __tablename__ = "checkups"
    _id = Column(Integer, primary_key=True, nullable=False)
    visitor = Column(Integer, ForeignKey('visitors._id'), nullable=False)
    location = Column(Integer, ForeignKey('locations._id'))
    date = Column(DateTime, default=datetime.now, nullable=False)
    visitors = relationship("Visitor", back_populates="checkups")


class Building(Base):
    __tablename__ = "buildings"
    _id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    address = Column(String, nullable=False)
    visits = relationship("Visit", back_populates="buildings", cascade="all,delete", passive_deletes=True)
    offices = relationship("Office", back_populates="buildings", cascade="all,delete", passive_deletes=True)
    locations = relationship("Location", back_populates="buildings", cascade="all, delete",
                             passive_deletes=True)


class Office(Base):
    __tablename__ = "offices"
    _id = Column(Integer, primary_key=True, nullable=False)
    building = Column(Integer, ForeignKey('buildings._id', ondelete='CASCADE', onupdate='CASCADE'))
    name = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    flat = Column(String, nullable=False)
    acronym = Column(String(6), nullable=False, unique=True)
    visits = relationship("Visit", back_populates="offices", cascade="all, delete",
                          passive_deletes=True)
    buildings = relationship("Building", back_populates="offices")


class Location(Base):
    __tablename__ = "locations"
    _id = Column(Integer, primary_key=True, nullable=False)
    building = Column(Integer, ForeignKey('buildings._id'))
    floor = Column(String, nullable=False)
    name = Column(String, unique=True, nullable=False)
    buildings = relationship("Building", back_populates="locations")
    users = relationship("User", back_populates="locations")


class Role(Base):
    __tablename__ = "roles"
    _id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    function = Column(String, nullable=False)
    users = relationship("User", back_populates="roles")


class Reason(Base):
    __tablename__ = 'reasons'
    _id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    visits = relationship("Visit", back_populates="reasons", cascade="all,delete", passive_deletes=True)


class User(Base):
    __tablename__ = "users"
    _id = Column(Integer, primary_key=True, nullable=False)
    role = Column(Integer, ForeignKey('roles._id'))
    location = Column(Integer, ForeignKey('locations._id'), nullable=True)
    name = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    username = Column(String(15), nullable=False, index=True, unique=True)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    photo = Column(String, nullable=True)
    created = Column(DateTime, default=datetime.now)
    updated = Column(DateTime, onupdate=datetime.now, nullable=True)
    visits = relationship("Visit")
    roles = relationship("Role", back_populates="users")
    locations = relationship("Location", back_populates="users")
    reports = relationship("Report")


class Report(Base):
    __tablename__ = "reports"
    _id = Column(Integer, primary_key=True, nullable=False)
    owner = Column(Integer, ForeignKey("users._id"))
    url = Column(String, nullable=False)
