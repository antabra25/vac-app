from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .config import settings
from app.routers import visit, office, reason, visitor, building, location, role, user, passes, auth, check, home, \
    report, device, car
from fastapi.staticfiles import StaticFiles
from .startup import startup_config
from .shutdown import shutdown_config

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title=settings.title, version="1.0.0", description=settings.description)
app.mount("/app/visitors", StaticFiles(directory="app/visitors"), name="photos")
app.mount("/app/QR", StaticFiles(directory="app/QR"), name="QR")
app.mount("/app/users", StaticFiles(directory="app/users"), name="users")
app.mount("/app/reports", StaticFiles(directory="app/reports"), name="reports")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    startup_config()


@app.on_event("shutdown")
def shutdown():
    shutdown_config()


# Routers
app.include_router(visit.router)
app.include_router(office.router)
app.include_router(reason.router)
app.include_router(visitor.router)
app.include_router(building.router)
app.include_router(location.router)
app.include_router(role.router)
app.include_router(user.router)
app.include_router(passes.router)
app.include_router(auth.router)
app.include_router(check.router)
app.include_router(report.router)
app.include_router(home.router)
app.include_router(device.router)
app.include_router(car.router)
