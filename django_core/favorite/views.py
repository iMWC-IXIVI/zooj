import jwt

from django.conf import settings

from rest_framework import views, response, exceptions

from api.models import CustomUser


class FavoriteAPI(views.APIView):
    def get(self, request):
        user = self.get_user(request.headers.get('authorization'))

        return response.Response({'message': 'success'})

    @staticmethod
    def get_user(token):
        """Получение пользователя"""
        try:
            jwt_decode = jwt.decode(jwt=token,
                                    key=settings.SECRET_KEY,
                                    algorithms=['HS256', ])
            user = CustomUser.objects.get(pk=jwt_decode['user_id'])
        except:
            raise exceptions.AuthenticationFailed()

        return user
