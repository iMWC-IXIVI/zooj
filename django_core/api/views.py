# TODO: ИЗУЧИТЬ MIDDLEWARE ПОПЫТАТЬСЯ ДОБАВИТЬ ЕГО В ПРОЕКТ
# TODO: ПЕРЕДЕЛАТЬ ПРИВЕТСТВЕННОЕ ПИСЬМО В КЛАССЕ SendMailAPI

import jwt

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.db import transaction

from rest_framework import views, response, status, decorators

from inform.models import AnonInformation, Information
from inform.serializers import AnonInfoSerializer, InformationSerializer
from .models import CustomUser, RegistrToken
from .serializers import UserSerializer, RegistrTokenSerializer
from .utils import registration_token


class SendMailAPI(views.APIView):
    @transaction.atomic
    def post(self, request):

        if request.headers.get('anonymous-uuid') is None:
            return response.Response(data={'error': 'user does\'t uuid'},
                                     status=status.HTTP_400_BAD_REQUEST)

        try:
            email = request.data['email']
        except:
            return response.Response(data={'error': 'field email does\'t found'},
                                     status=status.HTTP_400_BAD_REQUEST)

        check_data = RegistrToken.objects.filter(email=email)

        if check_data.exists():
            check_data.delete()

        request.data['token'] = token = registration_token()

        serializer = RegistrTokenSerializer(data=request.data)

        if not serializer.is_valid():
            return response.Response(data={'error': 'bad request'},
                                     status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        html_content = ('<h1>Здравствуйте!</h1>'
                        f'<p>Ваш код для авторизации: {token}</p>')

        msg = EmailMultiAlternatives(to=[email, ])
        msg.attach_alternative(content=html_content,
                               mimetype='text/html')
        msg.send()

        return response.Response(data={"message": "success"},
                                 status=status.HTTP_201_CREATED)


class RegistrationViewAPI(views.APIView):
    @transaction.atomic
    def post(self, request):

        try:
            user_uuid = request.headers['anonymous-uuid']
            code = request.data['code']
        except:
            return response.Response(data={'error': 'authorization error'},
                                     status=status.HTTP_400_BAD_REQUEST)

        try:
            data_user = RegistrToken.objects.get(token=code)
        except:
            return response.Response(data={"error": "code not found"},
                                     status=status.HTTP_400_BAD_REQUEST)

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

        anon_data = AnonInformation.objects.filter(anonim_uuid=user_uuid)
        instance = Information.objects.filter(user_id=user.pk)

        if not anon_data.exists():
            return response.Response()

        serializer_anon = AnonInfoSerializer(anon_data.first()).data
        serializer_anon['user'] = user.pk

        if instance.exists():
            serializer = InformationSerializer(data=serializer_anon, instance=instance.first())
            serializer.is_valid()
            serializer.save()
        else:
            serializer = InformationSerializer(data=serializer_anon)
            serializer.is_valid()
            serializer.save()

        anon_data.delete()

        response_user = response.Response()

        return response_user


# @decorators.api_view(['GET', ])
# def login(request):
#     """Не нужен с таким названием, можно взять основу для ПРОФИЛЯ"""
#     try:
#         token = request.headers['Authorization']
#     except KeyError:
#         return response.Response({"error": "token not found"})
#
#     token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])
#     user_id = token_decode['user_id']
#     user = CustomUser.objects.get(id=user_id)
#     serializer = UserSerializer(user)
#
#     return response.Response({'user': serializer.data})


@decorators.api_view(['GET', ])
def get_user(request):

    try:
        token = request.headers['Authorization']
    except:
        return response.Response(data={'error': 'authorization error'},
                                 status=status.HTTP_400_BAD_REQUEST)

    token_decode = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256', ])

    try:
        user = CustomUser.objects.get(pk=token_decode['user_id'])
    except:
        return response.Response(data={'error': 'user does\'t found'})

    information = Information.objects.filter(user_id=user.pk)

    if not information.exists():
        serializer_information = None
    else:
        serializer_information = InformationSerializer(information.first()).data

    serializer_user = UserSerializer(user).data

    return response.Response(data={'user': serializer_user,
                                   'anketa': serializer_information},
                             status=status.HTTP_200_OK)


class ProfileView(views.APIView):
    def get(self, request):
        try:
            token = request.headers['Authorization']
        except:
            return response.Response({'error': 'token not found'})

        token_decode = jwt.decode(token, key=settings.SECRET_KEY, algorithms=['HS256', ])
        user_id = token_decode['user_id']
        user = CustomUser.objects.get(id=user_id)
        serializer = UserSerializer(user).data

        return response.Response(serializer)

