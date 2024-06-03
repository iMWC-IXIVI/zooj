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

    def create_superuser(self, email):
        user = self.create_user(email=email)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(unique=True, max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(null=True, blank=True)

    is_staff = models.BooleanField(default=False)
    password = None

    REQUIRED_FIELDS = []
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def __str__(self):
        if self.username:
            return self.username
        return self.email


class RegistrToken(models.Model):
    token = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=255)


