import pdb

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

        try:
            user_uuid = request.headers['anonymous-uuid']
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authentication error'})

        if AnonInformation.objects.filter(anonim_uuid=user_uuid).exists():
            raise exceptions.ValidationError({'detail': 'user have data'})

        calorie = self.get_calorie()

        if calorie < 0:
            raise exceptions.ValidationError({'detail': 'calorie an invalid value'})

        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)
        request.data['anonim_uuid'] = user_uuid

        serializer = AnonInfoSerializer(data=request.data)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer.save()

        return response.Response(data={'message': 'success'},
                                 status=status.HTTP_201_CREATED)

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
            raise exceptions.ValidationError({'detail': 'data is bad'})

        if not (weight > 0 and des_weight > 0 and height > 0 and age > 0):
            raise exceptions.ValidationError({'detail': 'data is bad'})

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
            raise exceptions.ValidationError({'detail': 'field with gender params does not valid'})

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
            raise exceptions.ValidationError({'detail': 'field with activity params does not valid'})

        return activity_data[activity]


@decorators.api_view(['GET', ])
def get_anon_information(request):
    """Получение данных об анонимном пользователе"""
    try:
        anonim_uuid = request.headers['anonymous_uuid']
    except:
        raise exceptions.AuthenticationFailed({'detail': 'authentication error'})

    try:
        anon_user = AnonInformation.objects.get(anonim_uuid=anonim_uuid)
    except:
        return response.Response(data={'Anonymous': None})

    return response.Response({'Anonymous': AnonInfoSerializer(anon_user).data})


class InformationView(views.APIView):
    @transaction.atomic
    def post(self, request):

        try:
            user = self.get_user(request.headers['Authorization'])
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authorization error'})

        if Information.objects.filter(user_id=user.pk).exists():
            raise exceptions.ValidationError({'detail': 'it is forbidden create new information'})

        calorie = self.get_calorie()

        if calorie < 0:
            raise exceptions.ValidationError({'detail': 'calorie an invalid value'})

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer.save()

        return response.Response(data={'message': 'success'},
                                 status=status.HTTP_201_CREATED)

    def put(self, request):

        try:
            user = self.get_user(request.headers['Authorization'])
            instance = Information.objects.get(user_id=user.pk)
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authorization error'})

        calorie = self.get_calorie(instance)

        if calorie < 0:
            raise exceptions.ValidationError({'detail': 'calorie an invalid value'})

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data,
                                           instance=instance,
                                           partial=True)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer.save()

        return response.Response(data={'message': 'success'},
                                 status=status.HTTP_201_CREATED)

    def get_calorie(self, instance=None):
        """Получение кбжу пользователя"""
        if self.request.method == 'POST':
            try:
                weight = int(self.request.data['weight'])
                des_weight = int(self.request.data['des_weight'])
                height = int(self.request.data['height'])
                age = int(self.request.data['age'])
                gender = self.get_gender(self.request.data['gender'])
                activity = self.get_activity(self.request.data['activity'])
            except:
                raise exceptions.ValidationError({'detail': 'data is bad'})
        elif self.request.method == 'PUT':
            weight = self.request.data.get('weight')
            des_weight = self.request.data.get('des_weight')
            height = self.request.data.get('height')
            age = self.request.data.get('age')
            gender = self.get_gender(instance.gender)
            activity = self.request.data.get('activity')

            if not weight:
                weight = instance.weight
            else:
                try:
                    weight = int(weight)
                except:
                    raise exceptions.ValidationError({'detail': 'data is bad'})

            if not des_weight:
                des_weight = instance.des_weight
            else:
                try:
                    des_weight = int(des_weight)
                except:
                    raise exceptions.ValidationError({'detail': 'data is bad'})

            if not height:
                height = instance.height
            else:
                try:
                    height = int(height)
                except:
                    raise exceptions.ValidationError({'detail': 'data is bad'})

            if not age:
                age = instance.age
            else:
                try:
                    age = int(age)
                except:
                    raise exceptions.ValidationError({'detail': 'data is bad'})

            if not activity:
                activity = instance.activity

            activity = self.get_activity(activity)

        if not (weight > 0 and des_weight > 0 and height > 0 and age > 0):
            raise exceptions.ValidationError({'detail': 'data is bad'})

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
            raise exceptions.ValidationError({'detail': 'field with gender does not valid'})

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
            raise exceptions.ValidationError({'detail': 'field with activity does not valid'})

        return activity_data[activity]

    @staticmethod
    def get_user(token):
        """Получение пользователя по JWT"""
        decode_jwt = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])

        user = CustomUser.objects.get(pk=decode_jwt['user_id'])

        return user
