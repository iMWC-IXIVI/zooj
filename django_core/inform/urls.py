from django.urls import path
from .views import InformationView


urlpatterns = [
    path('information', InformationView.as_view(), name='information')
]
