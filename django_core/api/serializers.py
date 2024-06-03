from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=50)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
