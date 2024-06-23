import requests
import psycopg2

from endpoints.base_endpoint import Endpoint
from config import host, user, password, db_name, port, myemail, Anonymous_Uuid


class Registration(Endpoint):



    def enter_code(self, payload):
        self.response = requests.post('http://localhost/api/registration/',
                                      headers={"Anonymous-Uuid": Anonymous_Uuid},
                                      json=payload)
        self.response_json = self.response.json()
        print(f'Token = {self.response.json()}')
        Endpoint.TOKEN = self.response_json["token"]


    def check_response_has_token(self):
        assert 99 <= len(self.response_json['token']) <= 100,\
            f'Длина токена {len(self.response_json['token'])} символов вместо ожидаемых 99'