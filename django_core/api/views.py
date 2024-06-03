import jwt, datetime, json

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.http import HttpResponse, HttpRequest

from rest_framework import views, response, status

from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from .utils import registration_token


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return response.Response(
            {'Method GET': f'Hello from GET GET {UserSerializer(CustomUser.objects.filter().first()).data}'})


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
        code = request.data['code']

        try:
            data_user = RegistrToken.objects.get(token=code)
        except:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(email=data_user.email)
        # TODO: сделать проверку на наличие пользователя в бд, удалить 4 значный код из бд

        time_life = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=60)

        payload = {
            "user_id": user.pk,
            "time_life": time_life.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "time": datetime.datetime.now(tz=datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        access_token = jwt.encode(payload=payload,
                                  key=settings.SECRET_KEY,
                                  algorithm="HS256")
        response_token = HttpResponse()
        response_token.set_cookie("token", access_token)

        return response.Response({"access_token": access_token})


# class AuthorizationView(views.APIView):
#     def post(self, request: HttpRequest):
#         token = request.COOKIES.get('token')
#         if token is not None:
#             token_decode = jwt.decode(token, algorithms="utf-8")
#             print(token_decode)
