import payloads
import psycopg2
from endpoints.send_mail import SendMail
from endpoints.registration import Registration
from endpoints.info import Info
from endpoints.get_user import GetUser
from endpoints.anon_info import AnonInfo
from endpoints.get_anon_info import GetAnonInfo
from endpoints.favorite import Favorite
from config import host, user, password, db_name, port, myemail


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
                    FROM api_code
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


def test_send_mail():
    send_mail_endpoint = SendMail()
    send_mail_endpoint.send_code_to_email(payload=payloads.for_send_mail)
    send_mail_endpoint.check_status_code_is_(201)
    send_mail_endpoint.check_response_message_is_success()


def test_registration():
    registration_endpoint = Registration()
    code = get_code_from_BD(myemail)
    registration_endpoint.enter_code(payload={
        "code": f"{code}"
    })
    registration_endpoint.check_status_code_is_(201)
    registration_endpoint.check_response_has_token()


def test_info():
    info_endpoint = Info()
    info_endpoint.add_user_info(payload=payloads.for_info)
    info_endpoint.check_status_code_is_(201)
    info_endpoint.check_response_message_is_success()


def test_get_user():
    get_user_endpoint = GetUser()
    get_user_endpoint.get_user_info()
    get_user_endpoint.check_status_code_is_(200)
    get_user_endpoint.check_user_data_like_was_send(payloads.for_info)


def test_change_user_info():
    info_endpoint = Info()
    info_endpoint.change_user_info(payload=payloads.for_change_info)
    info_endpoint.check_status_code_is_(201)
    info_endpoint.check_response_message_is_success()


def test_anon_info():
    anon_info_endpoint = AnonInfo()
    anon_info_endpoint.add_anonymous_user_info(payload=payloads.for_info)
    anon_info_endpoint.check_status_code_is_(201)
    anon_info_endpoint.check_response_message_is_success()


def test_get_anon_info():
    get_anon_info_endpoint = GetAnonInfo()
    get_anon_info_endpoint.get_anonymous_user_info()
    get_anon_info_endpoint.check_status_code_is_(200)
    get_anon_info_endpoint.check_anon_user_data_like_was_send(payloads.for_info)


def test_add_to_favorites():
    favorite_endpoint = Favorite()
    favorite_endpoint.add_to_favorites(payload=payloads.for_favorites)
    favorite_endpoint.check_status_code_is_(201)
    favorite_endpoint.check_response_message_is_success()


def test_show_my_favorites():
    favorite_endpoint = Favorite()
    favorite_endpoint.show_my_favorites()
    favorite_endpoint.check_status_code_is_(200)


def test_delete_from_favorites():
    favorite_endpoint = Favorite()
    favorite_endpoint.delete_from_favorites(payload=payloads.for_favorites)
    favorite_endpoint.check_status_code_is_(200)
    favorite_endpoint.check_response_message_is_success()
