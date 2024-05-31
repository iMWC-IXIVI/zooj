from django.urls import path
from .views import TestView, LoginViewAPI, ConfirmationViewAPI
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('django-test/', TestView.as_view(), name='api-test'),
    path('login/', LoginViewAPI.as_view(), name='login'),
    path('confirmation/', ConfirmationViewAPI.as_view(), name='confirmation'),
    # path('v1/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    # path('v1/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    # path('v1/token/verify/', TokenVerifyView.as_view(), name='token-verify')

]

# TODO: Сделать отдельный эндпоинт для получения токена user'a
