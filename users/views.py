from django.shortcuts import render

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication

from .forms import ProfileForm
from django.contrib.auth.views import redirect_to_login
from .models import *
from django.urls import reverse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ProfileSerializer, UserSerializer
from  .models import Profile

# Create your views here

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializerfrom django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication

from .forms import ProfileForm
from django.contrib.auth.views import redirect_to_login
from .models import *
from django.urls import reverse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ProfileSerializer, UserSerializer
from  .models import Profile


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
