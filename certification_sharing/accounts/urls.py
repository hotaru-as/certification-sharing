from django.urls import path
from django.conf.urls import include
from .views import CreateUserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('auth/', include('djoser.urls.jwt'))
]
