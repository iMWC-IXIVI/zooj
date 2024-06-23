import requests
from endpoints.base_endpoint import Endpoint


class Info(Endpoint):

    def add_user_info(self, payload):
        self.response = requests.post('http://localhost/api/info/',
                                      headers={"Authorization": Endpoint.TOKEN},
                                      json=payload)
        self.response_json = self.response.json()

    def change_user_info(self, payload):
        self.response = requests.put('http://localhost/api/info/',
                                      headers={"Authorization": Endpoint.TOKEN},
                                      json=payload)
        self.response_json = self.response.json()