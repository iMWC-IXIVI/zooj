import requests
from endpoints.base_endpoint import Endpoint
from config import ANON_UUID

class GetAnonInfo(Endpoint):

    def get_anonymous_user_info(self):
        print(f'UUID = {ANON_UUID}')
        self.response = requests.get('http://localhost/api/get-anon-info/',
                                     headers={"Anonymous-Uuid": ANON_UUID}
                                     )
        self.response_json = self.response.json()

    def check_anon_user_data_like_was_send(self, info):
        assert self.response_json['Anonymous']['gender'] == info['gender'], 'gender не совпадает'
        assert self.response_json['Anonymous']['age'] == int(info['age']), 'age не совпадает'
        assert self.response_json['Anonymous']['weight'] == int(info['weight']), 'weight не совпадает'
        assert self.response_json['Anonymous']['des_weight'] == int(info['des_weight']), 'des_weight не совпадает'
        assert self.response_json['Anonymous']['height'] == int(info['height']), 'height не совпадает'
        assert self.response_json['Anonymous']['activity'] == int(info['activity']), 'height не совпадает'