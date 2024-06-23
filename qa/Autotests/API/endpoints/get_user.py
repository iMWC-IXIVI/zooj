import requests
from endpoints.base_endpoint import Endpoint

class GetUser(Endpoint):

    def get_user_info(self):
        self.response = requests.get('http://localhost/api/get-user/',
                                     headers={"Authorization": Endpoint.TOKEN}
                                     )
        self.response_json = self.response.json()