import uuid

class Endpoint:
    response = None
    response_json = None
    TOKEN = None


    def check_status_code_is_(self, expected_status_code):
        assert self.response.status_code == expected_status_code, \
            (f'Статус код {self.response.status_code} {self.response.json()['detail']} '
             f'вместо ожидаемого {expected_status_code}')

    def check_response_message_is_success(self):
        print(self.response_json)
        assert self.response_json['message'] == 'success', 'Ошибка'

    def check_user_data_like_was_send(self, info):
        assert self.response_json['anketa']['gender'] == info['gender'], 'gender не совпадает'
        assert self.response_json['anketa']['age'] == int(info['age']), 'age не совпадает'
        assert self.response_json['anketa']['weight'] == int(info['weight']), 'weight не совпадает'
        assert self.response_json['anketa']['des_weight'] == int(info['des_weight']), 'des_weight не совпадает'
        assert self.response_json['anketa']['height'] == int(info['height']), 'height не совпадает'
        assert self.response_json['anketa']['activity'] == int(info['activity']), 'height не совпадает'