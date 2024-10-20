from rest_framework.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import FriendList, FriendRequest
from .serializers import FriendRequestSerializer, FriendListSerializer


# ViewSet for Friend Requests
class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def perform_create(self, serializer):
        sender = self.request.user
        if not sender.is_authenticated:
            raise ValidationError({"error": "Authentication required"}, code=status.HTTP_401_UNAUTHORIZED)
        serializer.save(sender=sender)
