from rest_framework import serializers
from api.models import CustomUser
from .models import Information


class InformationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)

    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    gender = serializers.CharField()
    age = serializers.IntegerField()
    weight = serializers.IntegerField()
    height = serializers.IntegerField()
    activity = serializers.CharField()
    calorie = serializers.FloatField()
    squirrels = serializers.FloatField()
    fats = serializers.FloatField()
    carbohydrates = serializers.FloatField()
    target = serializers.CharField()
    allergen = serializers.CharField()

    def create(self, validated_data):
        return Information.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.age = validated_data.get('age', instance.age)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.height = validated_data.get('height', instance.height)
        instance.activity = validated_data.get('activity', instance.activity)
        instance.calorie = validated_data.get('calorie', instance.calorie)
        instance.target = validated_data.get('target', instance.target)
        instance.allergen = validated_data.get('allergen', instance.allergen)
        instance.squirrels = validated_data.get('squirrels', instance.squirrels)
        instance.fats = validated_data.get('fats', instance.fats)
        instance.carbohydrates = validated_data.get('carbohydrates', instance.carbohydrates)

        instance.save()

        return instance

