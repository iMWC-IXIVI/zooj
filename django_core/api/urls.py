from django.urls import path
from .views import SendMailAPI, RegistrationViewAPI, ProfileView, get_user


urlpatterns = [
    path('send-mail/', SendMailAPI.as_view(), name='send_mail'),
    path('registration/', RegistrationViewAPI.as_view(), name='registration'),
    path('get-user/', get_user, name='get_user'),
    path('profile/', ProfileView.as_view(), name='profile')
]
