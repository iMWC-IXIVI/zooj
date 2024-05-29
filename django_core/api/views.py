from rest_framework import views, response, status, decorators
from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from django.core.mail import EmailMultiAlternatives
from .utils import registration_token


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return response.Response({'Method GET': 'Hello from GET'})


class LoginViewAPI(views.APIView):
    def post(self, request):
        email = request.data['email']

        token = f'''{registration_token()}'''
        RegistrToken.objects.create(
            token=token,
            email=request.data['email']
        )
        html_content = f"""<h1>Здравствуйте!</h1>
                <p>Ваш код для авторизации: {token}</p>"""
        msg = EmailMultiAlternatives(to=[request.data['email'], ])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()
        return response.Response({"Код отправлен": "Успешно"})


class ConfirmationViewAPI(views.APIView):
    def post(self, request):
        token = request.data['token']
        if RegistrToken.objects.filter(token=token):
            token = RegistrToken.objects.get(token=token)
            if CustomUser.objects.filter(email=token.email):
                user = CustomUser.objects.filter(email=token.email)
            else:
                user = CustomUser.objects.create_user(email=token.email)
        else:
            return response.Response({"4-х значный код введен неверно": "Ошибка"})

        return response.Response({"Данные введены": "корректно"})
