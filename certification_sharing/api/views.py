from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import *
from .models import *

class UpdateUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(UpdateUserProfileView, self).get_permissions()
    
class CreateUserProfileView(generics.CreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)
    # parser_classes = (MultiPartParser, FormParser, JSONParser) # imgがnullだからとりあえず設定しなくても問題なし

    def create(self, request, *args, **kwargs):
        # Custom permission 作る？
        if (str(request.data['user_id']) != str(self.request.user.id)):
            http_status = status.HTTP_401_UNAUTHORIZED
            return Response(status=http_status)

        return super().create(request, *args, **kwargs)

class ListTargetStatusView(generics.ListAPIView):
    serializer_class = TargetStatusSerializer
    permission_classes = (AllowAny,)
    queryset = TargetStatus.objects.all()

class ListUserTargetView(generics.ListCreateAPIView):
    serializer_class = TargetRecordSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(ListUserTargetView, self).get_permissions()
    def get_queryset(self):
        return TargetRecord.objects.filter(user=self.request.GET.get('user'))

class UpdateUserTargetView(generics.UpdateAPIView):
    serializer_class = TargetRecordSerializer
    queryset = TargetRecord.objects.all()

class ListFollowerView(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(ListFollowerView, self).get_permissions()
    def get_queryset(self):
        if self.request.GET.get('follow_user') is not None and\
            self.request.GET.get('followed_user') is not None:
            follow = self.request.GET.get('follow_user')
            follower = self.request.GET.get('followed_user')
            return Follower.objects.filter(follow_user=follow, followed_user=follower)
        elif self.request.GET.get('follow_user') is not None:
            follow = self.request.GET.get('follow_user')
            return Follower.objects.filter(follow_user=follow)
        elif self.request.GET.get('followed_user') is not None:
            follower = self.request.GET.get('followed_user')
            return Follower.objects.filter(followed_user=follower)
        return NotFound

class DeleteFollowerView(generics.DestroyAPIView):
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()

class ListUserStudyView(generics.ListCreateAPIView):
    serializer_class = StudyRecordSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(ListUserStudyView, self).get_permissions()
    def get_queryset(self):
        return StudyRecord.objects.filter(user=self.request.GET.get('user'))

class UpdateUserStudyView(generics.UpdateAPIView):
    serializer_class = StudyRecordSerializer
    queryset = StudyRecord.objects.all()

class ListCertificationView(generics.ListAPIView):
    serializer_class = CertificationSerializer
    permission_classes = (AllowAny,)
    queryset = Certification.objects.all()

class ListUserCertificationView(generics.ListCreateAPIView):
    serializer_class = CertificationRecordSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (AllowAny,)
        return super(ListUserCertificationView, self).get_permissions()
    def get_queryset(self):
        return CertificationRecord.objects.filter(user=self.request.GET.get('user'))

class UpdateUserCertificationView(generics.UpdateAPIView):
    serializer_class = CertificationRecordSerializer
    queryset = CertificationRecord.objects.all()
