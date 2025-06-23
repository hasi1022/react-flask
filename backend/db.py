# db.py
import os, mysql.connector
from dotenv import load_dotenv
load_dotenv(override=True)


def get_conn():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME"),
        autocommit=True
    )
print("🔍 Loaded DB_HOST:", os.getenv("DB_HOST"))

