from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer
from .models import CustomUser

class CreateUserView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)

class ListUserView(generics.ListAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)
    queryset = CustomUser.objects.all()

class RetrieveUserView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)
    queryset = CustomUser.objects.all()
