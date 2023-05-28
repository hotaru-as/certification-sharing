from django.urls import path
from django.conf.urls import include
from .views import CreateUserView, ListUserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('users/', ListUserView.as_view(), name='users'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt'))
]
