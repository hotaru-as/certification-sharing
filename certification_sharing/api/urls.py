from django.urls import path
from django.conf.urls import include
from .views import UpdateUserProfileView

urlpatterns = [
    path('users/<str:pk>/profile', UpdateUserProfileView.as_view(), name='profile'),
]
