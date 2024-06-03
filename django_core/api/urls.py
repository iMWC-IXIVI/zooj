from django.urls import path
from .views import TestView, SendMailAPI, RegistrationViewAPI, login, logout

urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test'),
    path('send-mail/', SendMailAPI.as_view(), name='send_mail'),
    path('registration/', RegistrationViewAPI.as_view(), name='registration'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout')
]
