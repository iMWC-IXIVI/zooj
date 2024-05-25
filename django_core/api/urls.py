from django.urls import path
from .views import TestView, RegistrationsAPIView


urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test'),
    path('registration/', RegistrationsAPIView.as_view()),
]

# TODO: Сделать отдельный эндпоинт для получения токена user'a
