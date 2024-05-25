from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
