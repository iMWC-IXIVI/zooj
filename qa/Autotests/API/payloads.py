import requests
import psycopg2
from config import myemail
from endpoints.registration import Registration
from config import host, user, password, db_name, port, myemail, Anonymous_Uuid

def get_code_from_BD(email):
    try:
        # connect to exist database
        connection = psycopg2.connect(
            host=host,
            user=user,
            password=password,
            database=db_name,
            port=port
        )
        connection.autocommit = True

        # the cursor for performing database operations
        with connection.cursor() as cursor:
            cursor.execute(
                f"""SELECT token
                    FROM api_registrtoken
                    WHERE email = '{email}';"""
            )
            code = cursor.fetchone()
            print(f'Code from BD = {code}')
            return code[0]
    except Exception as ex:
        print('[INFO] Error while working with PostgreSQL:', ex)

    finally:
        if connection:
            connection.close()
            print('[INFO] PostgreSQL connection closed')


for_send_mail = {
    "email": f"{myemail}"
}

for_registration = {
    "code": f"{get_code_from_BD(myemail)}"
}

for_info = {
    "gender": "М",
    "age": "30",
    "weight": "70",
    "des_weight": "80",
    "height": "180",
    "activity": "1"
}

for_change_info = {
    "gender": "М",
    "age": "40",
    "weight": "65",
    "des_weight": "70",
    "height": "170",
    "activity": "2"
}

for_favorites = {
    "dishes": "10"
}