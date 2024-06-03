import jwt, datetime, json

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.http import HttpResponse, HttpRequest

from rest_framework import views, response, status, decorators

from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from .utils import registration_token


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return response.Response(
            {'Method GET': f'Hello from GET GET {UserSerializer(CustomUser.objects.filter().first()).data}'})


class SendMailAPI(views.APIView):
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


class RegistrationViewAPI(views.APIView):
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
        access_token = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm="HS256")
        response_token = response.Response()
        response_token.set_cookie("token", access_token)
        response_token.data = {"message": "success"}
        response_token.status_code = status.HTTP_201_CREATED

        return response_token


@decorators.api_view(['GET', ])
def login(request):

    try:
        token = request.COOKIES['token']
    except KeyError:
        return response.Response({"error": "token not found"})

    token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])
    user_id = token_decode['user_id']
    user = CustomUser.objects.get(id=user_id)
    serializer = UserSerializer(user)

    return response.Response(serializer.data)


@decorators.api_view(['POST', ])
def logout(request):

    response_token = response.Response()
    response_token.delete_cookie(key='token')
    response_token.data = {"message": "success"}
    response_token.status_code = status.HTTP_200_OK

    return response_token





