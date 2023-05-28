from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserProfileSerializer
from .models import UserProfile

class UpdateUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    # queryset = UserProfile.objects.all()

    def get_queryset(self):
        print(self.request.user, self.request.user.id)
        return UserProfile.objects.all()
