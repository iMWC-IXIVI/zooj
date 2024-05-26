from rest_framework import views, response, status
from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from django.core.mail import EmailMultiAlternatives
from .utils import registration_token


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return response.Response({'Method GET': 'Hello from GET'})


class RegistrationsAPIView(views.APIView):

    def post(self, request):
        token = f'{registration_token()}'
        RegistrToken.objects.create(token=token,
                                    username=request.data['username'],
                                    email=request.data['email'],
                                    password=request.data['password'],
                                    phone=request.data['phone'])

        data = request.data
        if not (data.get('username') and data.get('password') and data.get('password_confirmation') and data.get(
                'email')):
            return response.Response({'Ошибка', 'все поля обязательны к заполнению'},
                                     status=status.HTTP_400_BAD_REQUEST)
        if data.get('password') == data.get('password_confirmation'):
            del data['password_confirmation']
        else:
            return response.Response({'Ошибка': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response({'Данные сохранены', 'Успешно'}, status=status.HTTP_200_OK)
