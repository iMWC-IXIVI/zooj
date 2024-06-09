import jwt

from django.conf import settings

from rest_framework import views, response, exceptions, status

from .serializers import FavoriteSerializer
from .models import Favorite
from api.models import CustomUser


class FavoriteAPI(views.APIView):
    def get(self, request):

        user = self.get_user(request.headers.get('authorization'))

        data = Favorite.objects.filter(user_id=user.pk)
        serializer = FavoriteSerializer(data, many=True).data

        return response.Response({'data': serializer})

    def post(self, request):

        user = self.get_user(request.headers.get('authorization'))

        request.data['user'] = user.pk

        serializer = FavoriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return response.Response(data={'message': 'success'},
                                 status=status.HTTP_201_CREATED)

    def delete(self, request):

        data = Favorite.objects.get(dishes=request.data['dishes'])
        data.delete()

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
