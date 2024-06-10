from rest_framework import serializers
from .models import CustomUser, RegistrToken


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=255, allow_null=True, allow_blank=True)
    phone = serializers.CharField(max_length=50, allow_null=True, allow_blank=True)
    address = serializers.CharField(max_length=255, allow_null=True, allow_blank=True)
    birthday = serializers.CharField(allow_null=True, allow_blank=True)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class RegistrTokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=50)
    email = serializers.EmailField(max_length=255)

    def create(self, validated_data):
        return RegistrToken.objects.create(**validated_data)
