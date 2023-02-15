import os
import psycopg2
from . import utils
from .config import settings


def startup_config():
    if not os.path.isfile(".run_log"):
        admin_role = {"name": "Administrador", "function": "Mantener codigo de la Aplicacion web"}
        receptionist_role = {"name": "Recepcionista", "function": "Registro y monitoreo de visitas"}
        checker_role = {"name": "Verificador", "function": "Comprobar la informacion de los pases"}
        supervisor_role = {
            "name": "Supervisor",
            "function": "Administrar Registro de Edificio,Oficina,Usuarios,Ubicaciones y monitorear a los recepcionista."
        }
        roles = [admin_role, supervisor_role, receptionist_role, checker_role]
        conn = psycopg2.connect(dbname=settings.database_name, user=settings.database_username,
                                password=settings.database_password, host=settings.database_hostname,
                                port=settings.database_port)
        cur = conn.cursor()
        for v in roles:
            cur.execute("INSERT INTO roles(name ,function ) VALUES (%s,%s)", (v["name"], v["function"]))
        conn.commit()
        user_password = utils.hash('Attias33*')
        cur.execute(
            "INSERT INTO users (role,name,lastname,username,password,email) VALUES (%s,%s,%s,%s,%s,%s)",
            (1, 'Gustavo', 'Attias', 'Attiasg', user_password, 'gattias@mppef.gob.ve'))
        conn.commit()
        cur.close()
        conn.close()
