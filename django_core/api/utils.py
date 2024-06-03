import random


def registration_token():
    random_symbol = '1234567890'
    return ''.join([random.choice(random_symbol) for i in range(4)])