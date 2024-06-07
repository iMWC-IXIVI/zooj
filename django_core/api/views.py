import jwt, datetime

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.db import transaction

from rest_framework import views, response, status, decorators

from inform.models import AnonInformation, Information
from inform.serializers import AnonInfoSerializer, InformationSerializer
from .models import CustomUser, RegistrToken
from .serializers import UserSerializer
from .utils import registration_token


class SendMailAPI(views.APIView):
    @transaction.atomic
    def post(self, request):

        email = request.data['email']

        token = registration_token()

        RegistrToken.objects.create(token=token, email=email)

        html_content = ('<h1>Здравствуйте!</h1>'
                        f'<p>Ваш код для авторизации: {token}</p>')
        msg = EmailMultiAlternatives(to=[email, ])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()
        return response.Response({"message": "success"})


class RegistrationViewAPI(views.APIView):
    @transaction.atomic
    def post(self, request):

        user_uuid = request.headers['anonymous_uuid']

        code = request.data['code']

        try:
            data_user = RegistrToken.objects.get(token=code)
        except:
            return response.Response(data={"error": "code not found"}, status=status.HTTP_400_BAD_REQUEST)

        if not CustomUser.objects.filter(email=data_user.email).exists():
            user = CustomUser.objects.create_user(email=data_user.email)
            data_user.delete()
        else:
            user = CustomUser.objects.get(email=data_user.email)
            data_user.delete()

        if user_uuid:
            response_token = self.create_information(user, user_uuid)
        else:
            response_token = response.Response()

        payload = {
            "user_id": user.pk
        }
        access_token = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm="HS256")

        response_token.data = {'token': access_token}
        response_token.status_code = status.HTTP_201_CREATED

        return response_token

    @staticmethod
    @transaction.atomic
    def create_information(user, user_uuid):

        anon_data = AnonInformation.objects.filter(pk=user_uuid)

        if not anon_data.exists():
            return response.Response()

        serializer_anon = AnonInfoSerializer(anon_data.first()).data
        serializer_anon['user'] = user.pk

        serializer = InformationSerializer(data=serializer_anon)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        anon_data.delete()

        response_user = response.Response()

        return response_user


@decorators.api_view(['GET', ])
def login(request):

    try:
        token = request.headers['Authorization']
    except KeyError:
        return response.Response({"error": "token not found"})

    token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])
    user_id = token_decode['user_id']
    user = CustomUser.objects.get(id=user_id)
    serializer = UserSerializer(user)

    return response.Response({'user': serializer.data})


@decorators.api_view(['POST', ])
def logout(request):
    """Под вопросом"""
    response_token = response.Response()
    response_token.delete_cookie(key='token')
    response_token.data = {"message": "success"}
    response_token.status_code = status.HTTP_200_OK

    return response_token


@decorators.api_view(['GET', ])
def get_user(request):
    token = request.headers['Authorization']

    token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])

    user = CustomUser.objects.get(pk=token_decode['user_id'])
    information = Information.objects.filter(user_id=user.pk)

    if not information.exists():
        serializer_information = None
    else:
        serializer_information = InformationSerializer(information.first()).data

    serializer_user = UserSerializer(user).data

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
