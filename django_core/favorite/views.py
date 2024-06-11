import jwt

from django.conf import settings

from rest_framework import views, response, exceptions, status

from .serializers import FavoriteSerializer
from .models import Favorite
from api.models import CustomUser


class FavoriteAPI(views.APIView):
    def get(self, request):

        user = self.get_user(request.headers.get('authorization'))

        data = Favorite.objects.filter(user_id=user.pk).values_list('dishes')

        result = []
        for value in data:
            result.append(*value)

        return response.Response(data={'favorite': result})

    def post(self, request):

        user = self.get_user(request.headers.get('authorization'))

        request.data['user'] = user.pk

        if len(request.data) > 2:
            raise exceptions.ValidationError({'detail': 'fields not equal system fields'})

        serializer = FavoriteSerializer(data=request.data)

        if not serializer.is_valid():
            raise exceptions.ValidationError({'detail': 'field dishes not found'})

        serializer.save()

        return response.Response(data={'message': 'success'},
                                 status=status.HTTP_201_CREATED)

    def delete(self, request):

        try:
            data = Favorite.objects.get(dishes=request.data['dishes'])
        except:
            raise exceptions.ValidationError({'detail': 'field a dishes is bad data'})

        data.delete()

        return response.Response(data={'message': 'success'})

    @staticmethod
    def get_user(token):
        """Получение пользователя"""
        try:
            jwt_decode = jwt.decode(jwt=token,
                                    key=settings.SECRET_KEY,
                                    algorithms=['HS256', ])
            user = CustomUser.objects.get(pk=jwt_decode['user_id'])
        except:
            raise exceptions.AuthenticationFailed({'detail': 'authorization error'})

        return user
