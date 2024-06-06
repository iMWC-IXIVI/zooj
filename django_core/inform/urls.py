from django.urls import path
from .views import InformationView, AnonInformationAPI, get_anon_information


urlpatterns = [
    path('info/', InformationView.as_view(), name='info'),
    path('anon-info/', AnonInformationAPI.as_view(), name='anon_info'),
    path('get-anon-info/', get_anon_information, name='get_anon_info')
]
