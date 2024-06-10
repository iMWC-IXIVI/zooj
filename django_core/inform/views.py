# TODO: ИЗУЧИТЬ MIDDLEWARE ПОПЫТАТЬСЯ ДОБАВИТЬ ЕГО В ПРОЕКТ
# TODO: UUID в анонимной анкете
# TODO: Положительные числа в полях

import jwt

from django.conf import settings
from django.db import transaction

from rest_framework import views, response, status, exceptions, decorators

from .serializers import InformationSerializer, AnonInfoSerializer
from .models import Information, AnonInformation

from api.models import CustomUser


class AnonInformationAPI(views.APIView):
    """Анонимная анкета пользователя"""
    @transaction.atomic
    def post(self, request):

        user_uuid = request.headers.get('anonymous-uuid')

        if AnonInformation.objects.filter(anonim_uuid=user_uuid).exists():
            return response.Response(data={'error': 'user have data'},
                                     status=status.HTTP_400_BAD_REQUEST)

        serializer_response = response.Response()

        calorie = self.get_calorie()

        if calorie < 0:
            return response.Response(data={'error': 'error in field'},
                                     status=status.HTTP_400_BAD_REQUEST)

        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)
        request.data['anonim_uuid'] = request.headers['anonymous_uuid']

        serializer = AnonInfoSerializer(data=request.data)

        if not serializer.is_valid():
            serializer_response.data = {'error': 'data does\'t valid'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        serializer.save()

        serializer_response.data = {
            'message': 'success'
        }
        serializer_response.status_code = status.HTTP_201_CREATED

        return serializer_response

    def get_calorie(self):
        """Получение кбжу пользователя"""
        try:
            weight = int(self.request.data['weight'])
            des_weight = int(self.request.data['des_weight'])
            height = int(self.request.data['height'])
            age = int(self.request.data['age'])
            gender = self.get_gender(self.request.data['gender'])
            activity = self.get_activity(self.request.data['activity'])
        except:
            return -1

        calorie = (weight * 10 + height * 6.25 - age * 5 + gender) * activity

        target = weight - des_weight

        if target > 0:
            return round(calorie - calorie * 0.1, 2)
        elif target < 0:
            return round(calorie + calorie * 0.1, 2)

        return round(calorie, 2)

    @staticmethod
    def get_carbohydrates(calorie):
        """Вычисление углеродов"""
        return round((calorie * 0.4) / 4, 2)

    @staticmethod
    def get_fats(calorie):
        """Вычисление жиров"""
        return round((calorie * 0.3) / 9, 2)

    @staticmethod
    def get_protein(calorie):
        """Вычисление белков"""
        return round((calorie * 0.3) / 4, 2)

    @staticmethod
    def get_gender(gender):
        """Пол пользователя"""
        gender_data = {
            'М': 5,
            'Ж': -161
        }

        if gender not in gender_data:
            raise KeyError('field with gender params does not valid')

        return gender_data[gender]

    @staticmethod
    def get_activity(activity):
        """Активность пользователя"""
        activity_data = {
            '1': 1.2,
            '2': 1.375,
            '3': 1.55,
            '4': 1.725,
            '5': 1.9
        }

        if activity not in activity_data:
            raise KeyError('field with activity params does not valid')

        return activity_data[activity]


@decorators.api_view(['GET', ])
def get_anon_information(request):
    """Получение данных об анонимном пользователе"""
    try:
        anonim_uuid = request.headers['anonymous_uuid']
    except:
        return response.Response(data={'error': 'uuid does\'t found'},
                                 status=status.HTTP_400_BAD_REQUEST)

    try:
        anon_user = AnonInformation.objects.get(anonim_uuid=anonim_uuid)
    except:
        return response.Response(data={'Anonymous': None},
                                 status=status.HTTP_400_BAD_REQUEST)

    return response.Response({'Anonymous': AnonInfoSerializer(anon_user).data})


class InformationView(views.APIView):
    @transaction.atomic
    def post(self, request):

        serializer_response = response.Response()

        try:
            token = request.headers['Authorization']
            user = self.get_user(token)
        except:
            serializer_response.data = {'error': 'authorization error'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        if Information.objects.filter(user_id=user.pk).exists():
            serializer_response.data = {'error': 'it is forbidden create new information'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        calorie = self.get_calorie()

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data)

        if not serializer.is_valid():
            serializer_response.data = {'error': 'data does\'t valid'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        serializer.save()

        serializer_response.data = {
            'message': 'success'
        }
        serializer_response.status_code = status.HTTP_201_CREATED

        return serializer_response

    def put(self, request):

        serializer_response = response.Response()

        try:
            token = request.headers['Authorization']
            user = self.get_user(token)
            instance = Information.objects.get(user_id=user.pk)
        except:
            serializer_response.data = {'error': 'authorization error'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        calorie = self.get_calorie()

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data,
                                           instance=instance,
                                           partial=True)

        if not serializer.is_valid():
            serializer_response.data = {'error': 'data does\'t valid'}
            serializer_response.status_code = status.HTTP_400_BAD_REQUEST
            return serializer_response

        serializer.save()

        serializer_response.data = {
            'message': 'success'
        }
        serializer_response.status_code = status.HTTP_201_CREATED

        return serializer_response

    def get_calorie(self):
        """Получение кбжу пользователя"""
        try:
            weight = int(self.request.data['weight'])
            des_weight = int(self.request.data['des_weight'])
            height = int(self.request.data['height'])
            age = int(self.request.data['age'])
            gender = self.get_gender(self.request.data['gender'])
            activity = self.get_activity(self.request.data['activity'])
        except:
            return response.Response(data={'error': 'error in field'},
                                     status=status.HTTP_400_BAD_REQUEST)

        calorie = (weight * 10 + height * 6.25 - age * 5 + gender) * activity

        target = weight - des_weight

        if target > 0:
            return round(calorie - calorie * 0.1, 2)
        elif target < 0:
            return round(calorie + calorie * 0.1, 2)

        return round(calorie, 2)

    @staticmethod
    def get_carbohydrates(calorie):
        """Вычисление углеродов"""
        return round((calorie * 0.4) / 4, 2)

    @staticmethod
    def get_fats(calorie):
        """Вычисление жиров"""
        return round((calorie * 0.3) / 9, 2)

    @staticmethod
    def get_protein(calorie):
        """Вычисление белков"""
        return round((calorie * 0.3) / 4, 2)

    @staticmethod
    def get_gender(gender):
        """Пол пользователя"""
        gender_data = {
            'М': 5,
            'Ж': -161
        }

        if gender not in gender_data:
            return response.Response(data={'error': 'field with gender does not valid'},
                                     status=status.HTTP_400_BAD_REQUEST)

        return gender_data[gender]

    @staticmethod
    def get_activity(activity):
        """Активность пользователя"""
        activity_data = {
            '1': 1.2,
            '2': 1.375,
            '3': 1.55,
            '4': 1.725,
            '5': 1.9
        }

        if activity not in activity_data:
            return response.Response(data={'error': 'field with activity does not valid'},
                                     status=status.HTTP_400_BAD_REQUEST)

        return activity_data[activity]

    @staticmethod
    def get_user(token):
        """Получение пользователя по JWT"""
        decode_jwt = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])

        user = CustomUser.objects.get(pk=decode_jwt['user_id'])

        return user
