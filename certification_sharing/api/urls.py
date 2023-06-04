from django.urls import path
from django.conf.urls import include
from .views import *

urlpatterns = [
    path('users/<str:pk>/profile/', UpdateUserProfileView.as_view(), name='profile'),
    path('users/profile/', CreateUserProfileView.as_view(), name='create_profile'),
    path('target-status/', ListTargetStatusView.as_view(), name='target_status'),
    path('targets/', ListUserTargetView.as_view(), name='targets'),
    path('targets/<str:pk>/', UpdateUserTargetView.as_view(), name='target'),
]
