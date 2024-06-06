import jwt, datetime

from django.core.mail import EmailMultiAlternatives
from django.conf import settings

from rest_framework import views, response, status, decorators

from inform.models import AnonInformation, Information
from inform.serializers import AnonInfoSerializer, InformationSerializer
from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from .utils import registration_token


class SendMailAPI(views.APIView):
    def post(self, request):

        email = request.data['email']

        token = registration_token()

        RegistrToken.objects.create(token=token, email=email)

        html_content = ('<h1>Здравствуйте!</h1>'
                        f'<p>Ваш код для авторизации: {token}</p>')
        msg = EmailMultiAlternatives(to=[email, ])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()
        return response.Response({"Код отправлен": "Успешно"})


class RegistrationViewAPI(views.APIView):
    def post(self, request):

        user_uuid = request.COOKIES.get('anonim_uuid')

        code = request.data['code']

        try:
            data_user = RegistrToken.objects.get(token=code)
        except:
            return response.Response(data={"error": "code not found"}, status=status.HTTP_400_BAD_REQUEST)

        if not CustomUser.objects.filter(email=data_user.email).exists():
            user = CustomUser.objects.create_user(email=data_user.email)
            Profile.objects.create(user_id=user.id,
                                   email=user.email)
            data_user.delete()
        else:
            user = CustomUser.objects.get(email=data_user.email)
            data_user.delete()

        if user_uuid:
            response_token = self.create_information(user, user_uuid)
        else:
            response_token = response.Response()

        time_life = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=60)

        payload = {
            "user_id": user.pk,
            "time_life": time_life.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "time": datetime.datetime.now(tz=datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        access_token = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm="HS256")

        response_token.set_cookie("token", access_token)
        response_token.data = UserSerializer(user).data
        response_token.status_code = status.HTTP_201_CREATED

        return response_token

    @staticmethod
    def create_information(user, user_uuid):

        anon_data = AnonInformation.objects.get(pk=user_uuid)
        serializer_anon = AnonInfoSerializer(anon_data).data
        serializer_anon['user'] = user.pk

        serializer = InformationSerializer(data=serializer_anon)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        anon_data.delete()

        response_user = response.Response()
        response_user.delete_cookie('anonim_uuid')

        return response_user


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
# TOdO: в случае, если токен не найден, нужно повторно отправить пост запрос с почтой

@decorators.api_view(['POST', ])
def logout(request):
    response_token = response.Response()
    response_token.delete_cookie(key='token')
    response_token.data = {"message": "success"}
    response_token.status_code = status.HTTP_200_OK

    return response_token


@decorators.api_view(['GET', ])
def get_user(request):
    token = request.COOKIES['token']

    token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])

    user = CustomUser.objects.get(pk=token_decode['user_id'])
    information = Information.objects.get(user_id=user.pk)

    serializer_user = UserSerializer(user).data
    serializer_information = InformationSerializer(information).data

    return response.Response(data={'user': serializer_user,
                                   'anketa': serializer_information},
                             status=status.HTTP_200_OK)


# class ProfileView(views.APIView):
#     def get(self, *args, **kwargs):
#         print(kwargs)
#         pk = kwargs.get('pk')
#         print(pk)
#         profile = Profile.objects.get(pk=pk)
#         serializer = UserSerializer(profile).data
#         avatar_serializer = ProfileSerializer(profile).data
#
#         return response.Response({"profile": serializer,
#                                   "avatar": avatar_serializer})