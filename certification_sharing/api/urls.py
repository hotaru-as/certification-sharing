from django.urls import path
from django.conf.urls import include
from .views import UpdateUserProfileView, CreateUserProfileView

urlpatterns = [
    path('users/<str:pk>/profile/', UpdateUserProfileView.as_view(), name='profile'),
    path('users/profile/', CreateUserProfileView.as_view(), name='create_profile'),
]
