from django.urls import path
from .views import TestView


urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test')
]

# TODO: Сделать отдельный эндпоинт для получения токена user'a
