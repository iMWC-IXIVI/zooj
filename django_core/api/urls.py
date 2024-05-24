from django.urls import path
from .views import TestView


urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test')
]
