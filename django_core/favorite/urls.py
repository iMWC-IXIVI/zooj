from django.urls import path

from .views import FavoriteAPI


urlpatterns = [
    path('favorite/', FavoriteAPI.as_view(), name='favorite')
]
