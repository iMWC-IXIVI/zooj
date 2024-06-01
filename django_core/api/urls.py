from django.urls import path
from .views import TestView, LoginViewAPI, ConfirmationViewAPI, AuthorizationView

urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test'),
    path('login/', LoginViewAPI.as_view(), name='login'),
    path('confirmation/', ConfirmationViewAPI.as_view(), name='confirmation'),
    path('authorization/', AuthorizationView.as_view(), name='authorization')
]
