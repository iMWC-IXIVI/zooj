import requests
from endpoints.base_endpoint import Endpoint

class Favorite(Endpoint):

    def add_to_favorites(self, payload):
        self.response = requests.post('http://localhost/api/favorite/',
                                      headers={"Authorization": Endpoint.TOKEN},
                                      json=payload)
        self.response_json = self.response.json()

    def show_my_favorites(self):
        self.response = requests.get('http://localhost/api/favorite/',
                                     headers={"Authorization": Endpoint.TOKEN})
        self.response_json = self.response.json()

    def delete_from_favorites(self, payload):
        self.response = requests.delete('http://localhost/api/favorite/',
                                        headers={"Authorization": Endpoint.TOKEN},
                                        json=payload)
        self.response_json = self.response.json()