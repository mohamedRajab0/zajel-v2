from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication

#from .forms import ProfileForm
from django.contrib.auth.views import redirect_to_login
from .models import *
from django.urls import reverse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ProfileSerializer, UserSerializer
from  .models import Profile

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import os



class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.getenv('CALLBACK_URL_YOU_SET_ON_GOOGLE')
    client_class = OAuth2Client
