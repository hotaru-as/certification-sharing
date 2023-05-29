from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from .models import UserProfile

class UpdateUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    # queryset = UserProfile.objects.all()

    def get_queryset(self):
        print(self.request.user, self.request.user.id)
        return UserProfile.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(UpdateUserProfileView, self).get_permissions()
    
class CreateUserProfileView(generics.CreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)
    def create(self, request, *args, **kwargs):
        if (str(request.data['user_id']) != str(self.request.user.id)):
            http_status = status.HTTP_401_UNAUTHORIZED
            return Response(status=http_status)

        return super().create(request, *args, **kwargs)
