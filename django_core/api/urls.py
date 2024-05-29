from django.urls import path
from .views import TestView, RegistrationAPIView, token_reg_func
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test'),
    path('registration/', RegistrationAPIView.as_view()),
    path('<str:token>/', token_reg_func),
    path('v1/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('v1/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('v1/token/verify/', TokenVerifyView.as_view(), name='token-verify')

]

# TODO: Сделать отдельный эндпоинт для получения токена user'a
