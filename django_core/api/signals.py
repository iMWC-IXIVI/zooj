import os
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import post_save
from django.dispatch import receiver
from dotenv import load_dotenv
from .models import RegistrToken, CustomUser

# @receiver(post_save, sender=RegistrToken)
# def my_handler():

