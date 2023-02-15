from typing import Optional
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str = 'localhost'
    database_port: str = '5432'
    database_password: str = 'larios'
    database_name: str = 'control'
    database_username: str = 'postgres'
    secret_key: str = 'bbk3t27c4y'
    algorithm: str = 'HS256'
    domain_name: str = 'http://127.0.0.1:8000'
    access_token_expire_minutes: int = 180
    title: Optional[str] = "API Control de Acceso Visitantes"
    description: Optional[str] = "API para el control de Acceso Visitantes del MPPEFC"

    class Config:
        env_file = ".env"


settings = Settings()
