from typing import Optional
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    domain_name: str
    access_token_expire_minutes: int
    title: Optional[str] = "API Control de Acceso Visitantes"
    description: Optional[str] = "API para el control de Acceso Visitantes del MPPEFC"

    class Config:
        env_file = "../.env"


settings = Settings()
