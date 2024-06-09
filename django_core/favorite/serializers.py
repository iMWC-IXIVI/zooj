from rest_framework import serializers

from .models import Favorite


class FavoriteSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Favorite.objects.all())
    dishes = serializers.IntegerField()

    def create(self, validated_data):
        return Favorite.objects.create(**validated_data)
