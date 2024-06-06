from django.urls import path
from .views import SendMailAPI, RegistrationViewAPI, login, logout, get_user


urlpatterns = [
    path('send-mail/', SendMailAPI.as_view(), name='send_mail'),
    path('registration/', RegistrationViewAPI.as_view(), name='registration'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('get-user/', get_user, name='get_user')
]
