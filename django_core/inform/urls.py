from django.urls import path
from .views import InformationView, GetDataView, AnonInformation


urlpatterns = [
    path('an-info', AnonInformation.as_view(), name='anon_information'),
    path('info', InformationView.as_view(), name='information'),
    path('get-data', GetDataView.as_view(), name='get_user_data')
]
