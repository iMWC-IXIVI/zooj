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
    target = serializers.CharField()
    allergen = serializers.CharField()

    def create(self, validated_data):
        return Information.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.age = validated_data.get('age', instance.age)
        instance.
