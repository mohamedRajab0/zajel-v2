from rest_framework import serializers
from .models import ZajelMessage, ZajelGroup

class ZajelMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZajelMessage
        fields = '__all__'  # Or specify the fields you want to include in your API.

    def update(self, instance, validated_data):
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
        return instance

class ZajelGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZajelGroup
        fields = '__all__'  # Or specify the fields you want to include in your API.
    def update(self, instance, validated_data):
        instance.group_name = validated_data.get('group_name', instance.group_name)
        instance.save()
        return instance
    def delete(self, instance):
        instance.delete()
        return instance