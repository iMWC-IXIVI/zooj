from rest_framework import views, response, status

from .serializers import InformationSerializer
from .models import Information


class InformationView(views.APIView):
    def post(self, request):

        request.data['user'] = request.user.pk
        request.data['calorie'] = self.get_calorie()

        serializer = InformationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return response.Response(data={'Success': 'Information created'},
                                 status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        instance = Information.objects.get(pk=request.data['id'])
        serializer = InformationSerializer(data=request.data, instance=instance, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(data={'Success': 'Information changed'},
                                 status=status.HTTP_201_CREATED)

    # TODO: высчитать цель, похудение -10%, набрать +10%

    def get_calorie(self):
        gender = self.get_gender(self.request.data['gender'])
        age = self.request.data['age']
        weight = self.request.data['weight']
        height = self.request.data['height']
        activity = self.get_activity(self.request.data['activity'])
        calorie = (gender + int(age) + int(weight) + int(height)) * activity
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
