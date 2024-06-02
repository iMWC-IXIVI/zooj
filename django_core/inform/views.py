from rest_framework import views, response, status, exceptions, decorators

from .serializers import InformationSerializer, AnonInfoSerializer
from .models import Information, AnonInformation

from api.models import CustomUser
from api.serializers import UserSerializer


class AnonInformationAPI(views.APIView):
    def post(self, request):

        serializer_response = response.Response()

        weight = int(request.data['weight'])
        des_weight = int(request.data['des_weight'])
        height = int(request.data['height'])
        age = int(request.data['age'])
        gender = self.get_gender(request.data['gender'])
        activity = self.get_activity(request.data['activity'])

        calorie = (weight * 10 + height * 6.25 - age * 5 + gender) * activity
        calorie = self.get_calorie(calorie, des_weight, weight)

        request.data['calorie'] = calorie
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = AnonInfoSerializer(data=request.data)

        if not serializer.is_valid():
            raise exceptions.ValidationError(detail='Data is not valid')

        serializer.save()

        info = AnonInformation.objects.last()

        serializer_response.set_cookie(key='anonim_uuid', value=info.anonim_uuid, httponly=True)

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


@decorators.api_view(['GET', ])
def get_anon_information(request):
    anonim_uuid = request.COOKIES['anonim_uuid']

    anon_user = AnonInformation.objects.get(anonim_uuid=anonim_uuid)

    return response.Response({'Anonymous': AnonInfoSerializer(anon_user).data})


class InformationView(views.APIView):
    def post(self, request):
        # TODO: на защите поменять!!!
        # request.data['user'] = request.user.pk
        request.data['user'] = 1

        request.data['calorie'] = calorie = self.get_calorie()
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        serializer = InformationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return response.Response(data={'Success': 'Information created',
                                       'Data': serializer.data},
                                 status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):

        request.data['calorie'] = calorie = self.get_calorie()
        request.data['protein'] = self.get_protein(calorie)
        request.data['fats'] = self.get_fats(calorie)
        request.data['carbohydrates'] = self.get_carbohydrates(calorie)

        instance = Information.objects.get(pk=request.data['id'])

        serializer = InformationSerializer(data=request.data, instance=instance, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(data={'Success': 'Information changed',
                                       'Data': serializer.data},
                                 status=status.HTTP_201_CREATED)

    def get_calorie(self):
        gender = self.get_gender(self.request.data['gender'])
        age = self.request.data['age']
        weight = self.request.data['weight']
        height = self.request.data['height']
        activity = self.get_activity(self.request.data['activity'])
        target = self.request.data['target']
        calorie = (gender - int(age) * 5 + int(weight) * 10 + int(height) * 6.25) * activity

        if target == 'Похудеть':
            calorie -= ((gender - int(age) * 5 + int(weight) * 10 + int(height) * 6.25) * activity) * 0.1
        elif target == 'Набор веса':
            calorie += ((gender - int(age) * 5 + int(weight) * 10 + int(height) * 6.25) * activity) * 0.1
        elif target == 'Сохранение веса':
            return calorie

        return calorie

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
            'Минимальная': 1.2,
            'Низкая': 1.375,
            'Средняя': 1.55,
            'Высокая': 1.725,
            'Предельная': 1.9
        }

        return activity_data[activity]

    @staticmethod
    def get_protein(data):
        return round((data * 0.3) / 4, 2)

    @staticmethod
    def get_fats(data):
        return round((data * 0.3) / 9, 2)

    @staticmethod
    def get_carbohydrates(data):
        return round((data * 0.4) / 4, 2)


class GetDataView(views.APIView):
    def get(self, request):
        user_data = CustomUser.objects.filter().first()
        user_serializer = UserSerializer(user_data).data

        information_data = Information.objects.filter().first()
        information_serializer = InformationSerializer(information_data).data
        return response.Response({'user': user_serializer,
                                  'anketa': information_serializer})
