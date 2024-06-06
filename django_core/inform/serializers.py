from rest_framework import serializers

from api.models import CustomUser
from .models import Information, AnonInformation


class AnonInfoSerializer(serializers.Serializer):

    anonim_uuid = serializers.UUIDField()

    gender = serializers.CharField(max_length=1)
    age = serializers.IntegerField()
    weight = serializers.IntegerField()
    des_weight = serializers.IntegerField()
    height = serializers.IntegerField()
    activity = serializers.IntegerField()
    calorie = serializers.FloatField()
    protein = serializers.FloatField()
    fats = serializers.FloatField()
    carbohydrates = serializers.FloatField()

    def create(self, validated_data):
        return AnonInformation.objects.create(**validated_data)


class InformationSerializer(serializers.Serializer):

    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    gender = serializers.CharField(max_length=1)
    age = serializers.IntegerField()
    weight = serializers.IntegerField()
    des_weight = serializers.IntegerField()
    height = serializers.IntegerField()
    activity = serializers.IntegerField()
    calorie = serializers.FloatField()
    protein = serializers.FloatField()
    fats = serializers.FloatField()
    carbohydrates = serializers.FloatField()

    def create(self, validated_data):
        return Information.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.age = validated_data.get('age', instance.age)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.height = validated_data.get('height', instance.height)
        instance.activity = validated_data.get('activity', instance.activity)
        instance.calorie = validated_data.get('calorie', instance.calorie)
        instance.protein = validated_data.get('protein', instance.protein)
        instance.fats = validated_data.get('fats', instance.fats)
        instance.carbohydrates = validated_data.get('carbohydrates', instance.carbohydrates)

        instance.save()

        return instance

