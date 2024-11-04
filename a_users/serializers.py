from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Profile

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source="profile.image", read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "profile_image")


# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ["user", "image", "displayname", "info"]
