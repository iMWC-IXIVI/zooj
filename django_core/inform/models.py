import uuid

from django.db import models
from api.models import CustomUser


class Information(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    gender = models.CharField()
    age = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    des_weight = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    activity = models.CharField()
    calorie = models.FloatField()
    protein = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()


class AnonInformation(models.Model):
    anonim_uuid = models.UUIDField(primary_key=True, editable=False)

    gender = models.CharField(max_length=1)
    age = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    des_weight = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    activity = models.CharField()
    calorie = models.FloatField()
    protein = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()
