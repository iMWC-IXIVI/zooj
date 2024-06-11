from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email):

        if not email:
            return ValueError('User must have an email!!!')

        email = self.normalize_email(email)

        user = self.model(email=email)
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(unique=True, max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(null=True, blank=True)
    birthday = models.CharField(null=True, blank=True)

    password = None
    last_login = None
    is_superuser = None
    date_update = None

    REQUIRED_FIELDS = []
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def __str__(self):
        if self.username:
            return self.username
        return self.email


class Code(models.Model):
    token = models.CharField(max_length=50)
    email = models.EmailField(max_length=255)
