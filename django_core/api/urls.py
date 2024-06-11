from django.urls import path
from .views import SendMailAPI, RegistrationViewAPI, ProfileView


urlpatterns = [
    path('send-mail/', SendMailAPI.as_view(), name='send_mail'),
    path('registration/', RegistrationViewAPI.as_view(), name='registration'),
    path('get-user/', ProfileView.as_view(), name='get_user')
]
