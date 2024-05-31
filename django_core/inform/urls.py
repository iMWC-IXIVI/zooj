from django.urls import path
from .views import InformationView, GetDataView


urlpatterns = [
    path('information', InformationView.as_view(), name='information'),
    path('get-data', GetDataView.as_view(), name='get_user_data')
]
