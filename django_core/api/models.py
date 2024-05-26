from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, phone):

        if not email:
            return ValueError('User must have an email!!!')

        if not password:
            raise ValueError('User must have a password!!!')

        if not phone:
            raise ValueError('User must have a phone!!!')

        email = self.normalize_email(email)

        user = self.model(username=username, email=email, phone=phone)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, phone):
        user = self.create_user(username=username, email=email, password=password, phone=phone)

        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255)
    phone = models.CharField(unique=True, max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(null=True, blank=True)

    REQUIRED_FIELDS = ['username', ]
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def __str__(self):
        if self.username:
            return self.username
        return self.email


class RegistrToken(models.Model):
    token = models.CharField(max_length=50)
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    phone = models.CharField(unique=True, max_length=255)


