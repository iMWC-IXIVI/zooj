import jwt

from django.conf import settings
from django.db import transaction

from rest_framework import views, response, status, exceptions, decorators

from .serializers import InformationSerializer, AnonInfoSerializer
from .models import Information, AnonInformation

from api.models import CustomUser


class AnonInformationAPI(views.APIView):
    """Анонимная анкета пользователя"""
    def post(self, request):

        with transaction.atomic():

            serializer_response = response.Response()

            calorie = self.get_calorie()

            request.data['calorie'] = calorie
            request.data['protein'] = self.get_protein(calorie)
            request.data['fats'] = self.get_fats(calorie)
            request.data['carbohydrates'] = self.get_carbohydrates(calorie)
            request.data['anonim_uuid'] = request.headers['anonymous_uuid']

            serializer = AnonInfoSerializer(data=request.data)

            if not serializer.is_valid():
                raise exceptions.ValidationError(detail='Data does not valid')

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
            return response.Response(data={'error': 'field not found'},
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


@decorators.api_view(['GET', ])
def get_anon_information(request):
    """Получение данных об анонимном пользователе"""

    anonim_uuid = request.headers['anonymous_uuid']

    try:
        anon_user = AnonInformation.objects.get(anonim_uuid=anonim_uuid)
    except:
        return response.Response(data={'error': 'bad cookie'}, status=status.HTTP_400_BAD_REQUEST)

    return response.Response({'Anonymous': AnonInfoSerializer(anon_user).data})


# TODO: тут остановился для выявления ошибок в коде
class InformationView(views.APIView):
    def post(self, request):

        serializer_response = response.Response()

        # TODO: проверку на наличие токена
        token = request.headers['Authorization']

        user = self.get_user(token)

        weight = int(request.data['weight'])
        des_weight = int(request.data['des_weight'])
        height = int(request.data['height'])
        age = int(request.data['age'])
        gender = self.get_gender(request.data['gender'])
        activity = self.get_activity(request.data['activity'])

        calorie = (weight * 10 + height * 6.25 - age * 5 + gender) * activity
        calorie = self.get_calorie(calorie, des_weight, weight)

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        serializer_response.data = {
            'message': 'success'
        }
        serializer_response.status_code = status.HTTP_201_CREATED

        return serializer_response

    def put(self, request):
        serializer_response = response.Response()

        # TODO: проверку на наличие токена
        token = request.headers['authorization']

        user = self.get_user(token)

        weight = int(request.data['weight'])
        des_weight = int(request.data['des_weight'])
        height = int(request.data['height'])
        age = int(request.data['age'])
        gender = self.get_gender(request.data['gender'])
        activity = self.get_activity(request.data['activity'])

        calorie = (weight * 10 + height * 6.25 - age * 5 + gender) * activity
        calorie = self.get_calorie(calorie, des_weight, weight)

        request.data['user'] = user.pk
        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        instance = Information.objects.get(user_id=user.pk)

        serializer = InformationSerializer(data=request.data, instance=instance, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        serializer_response.data = {
            'message': 'success'
        }
        serializer_response.status_code = status.HTTP_201_CREATED

        return serializer_response

    @staticmethod
    def get_carbohydrates(calorie):
        return round((calorie * 0.4) / 4, 2)

    @staticmethod
    def get_fats(calorie):
        return round((calorie * 0.3) / 9, 2)

    @staticmethod
    def get_protein(calorie):
        return round((calorie * 0.3) / 4, 2)

    @staticmethod
    def get_calorie(calorie, des_weight, weight):

        target = weight - des_weight

        if target > 0:
            return round(calorie - calorie * 0.1, 2)
        elif target < 0:
            return round(calorie + calorie * 0.1, 2)

        return round(calorie, 2)

    @staticmethod
    def get_gender(gender):

        gender_data = {
            'М': 5,
            'Ж': -161
        }

        return gender_data[gender]

    @staticmethod
    def get_activity(activity):

        activity_data = {
            '1': 1.2,
            '2': 1.375,
            '3': 1.55,
            '4': 1.725,
            '5': 1.9
        }

        return activity_data[activity]

    @staticmethod
    def get_user(token):

        decode_jwt = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])
        # TODO: проверку на наличие нужных полей в токене
        user_id = decode_jwt['user_id']
        # TODO: проверку на пользователя
        user = CustomUser.objects.get(pk=user_id)
        return user
