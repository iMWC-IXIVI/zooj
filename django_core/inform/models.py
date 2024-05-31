from django.db import models
from api.models import CustomUser


class Information(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    gender = models.CharField()
    age = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    activity = models.CharField()
    calorie = models.FloatField(blank=True, null=True)
    target = models.CharField()
    squirrels = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()
    allergen = models.CharField()

    def __str__(self):
        return f'{self.user} information'
