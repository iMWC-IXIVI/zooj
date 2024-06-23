import jwt

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.db import transaction

from rest_framework import views, response, status, exceptions

from inform.models import AnonInformation, Information
from inform.serializers import AnonInfoSerializer, InformationSerializer
from .models import CustomUser, Code
from .serializers import UserSerializer, CodeSerializer
from .utils import registration_token

'''Предствление для отправки кода на почту'''


class SendMailAPI(views.APIView):
    @transaction.atomic
    def post(self, request):

        try:
            request.headers['anonymous-uuid']
        except:
            raise exceptions.AuthenticationFailed({'detail': 'user does\'t uuid'})

        try:
            email = request.data['email']
        except:
            raise exceptions.ValidationError({'detail': 'field email does\'t found'})

        check_data = Code.objects.filter(email=email)

        if check_data.exists():
            check_data.delete()

        request.data['token'] = token = registration_token()

        serializer = CodeSerializer(data=request.data)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer.save()

        html_content = ('<h1>Здравствуйте!</h1>'
                        f'<p>Мы получили запрос на отправку разового кода для авторизпции Вашего аккаунта,</p>'
                        f'<p></p>'
                        f'Ваш код для авторизации: {token}</p>'
                        f'<p>Если вы не запрашивали данный код, можете просто проигнорировать это сообщение.'
                        f'<p></p>'
                        f'Возможно Вашу электронную почту кто-то ввел по ошибке</p>')

        msg = EmailMultiAlternatives(subject='Разовый код',
                                     to=[email, ])
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
            data_user = Code.objects.get(token=request.data['code'])
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authorization error'})

        if not CustomUser.objects.filter(email=data_user.email).exists():
            user = CustomUser.objects.create_user(email=data_user.email)
        else:
            user = CustomUser.objects.get(email=data_user.email)

        data_user.delete()

        self.create_information(user, user_uuid)

        access_token = jwt.encode(payload={'user_id': user.pk},
                                  key=settings.SECRET_KEY,
                                  algorithm="HS256")

        return response.Response(data={'token': access_token},
                                 status=status.HTTP_201_CREATED)

    @staticmethod
    @transaction.atomic
    def create_information(user, user_uuid):

        anon_data = AnonInformation.objects.filter(anonim_uuid=user_uuid)
        instance = Information.objects.filter(user_id=user.pk)

        if not anon_data.exists():
            return None

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

        return None


class ProfileView(views.APIView):
    def get(self, request):

        user = self.get_user(request)

        information = Information.objects.filter(user_id=user.pk)

        if not information.exists():
            serializer_information = None
        else:
            serializer_information = InformationSerializer(information.first()).data

        serializer_user = UserSerializer(user).data

        return response.Response(data={'user': serializer_user,
                                       'anketa': serializer_information})

    def put(self, request):

        user = self.get_user(request)

        if not request.data:
            raise exceptions.ValidationError({'detail': 'no data to change'})

        if request.data.get('id'):
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer = UserSerializer(data=request.data,
                                    instance=user,
                                    partial=True)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'data is bad'})

        serializer.save()

        return response.Response(data={'message': 'success'})

    def delete(self, request):

        self.get_user(request).delete()

        return response.Response(data={'message': 'success'})

    @staticmethod
    def get_user(request):
        """Получение пользователя по JWT"""
        try:
            token = request.headers['Authorization']
            token_decode = jwt.decode(jwt=token,
                                      key=settings.SECRET_KEY,
                                      algorithms=['HS256', ])
            user = CustomUser.objects.get(id=token_decode['user_id'])
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authorization error'})

        return user
