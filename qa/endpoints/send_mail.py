import requests
from endpoints.base_endpoint import Endpoint
from config import Anonymous_Uuid

class SendMail(Endpoint):


    def send_code_to_email(self, payload):
        self.response = requests.post('http://localhost/api/send-mail/',
                                      headers={"Anonymous-Uuid": Anonymous_Uuid},
                                      json=payload)
        self.response_json = self.response.json()

    # def check_code_in_DB(self):
