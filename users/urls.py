from django.urls import path, include
from users.views import *
from  rest_framework.routers import DefaultRouter
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView, UserDetailsView,
)
from dj_rest_auth.registration.views import RegisterView

app_name = 'users'

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
    path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailsView.as_view(), name='user'),
]