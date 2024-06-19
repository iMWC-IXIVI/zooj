import requests
from endpoints.base_endpoint import Endpoint
from config import ANON_UUID


class AnonInfo(Endpoint):

    def add_anonymous_user_info(self, payload):
        print(f'UUID = {ANON_UUID}')
        self.response = requests.post('http://localhost/api/anon-info/',
                                      headers={"Anonymous-Uuid": ANON_UUID},
                                      json=payload)
        self.response_json = self.response.json()