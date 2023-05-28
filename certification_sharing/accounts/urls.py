from django.urls import path
from django.conf.urls import include
from .views import CreateUserView, ListUserView, RetrieveUserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('users/', ListUserView.as_view(), name='users'),
    path('users/<str:pk>/', RetrieveUserView.as_view(), name='user'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt'))
]
