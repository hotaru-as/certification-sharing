from rest_framework import serializers
from .models import UserProfile, Follower, RecordCategory, Certification, CertificationRecord,  TargetStatus, TargetRecord, StudyRecord

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user_id', 'introduction', 'birth_day', 'icon_img')

class FollowerSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Follower
        fields = ('id', 'follow_user', 'followed_user', 'created_at')

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ('id', 'name', 'detail')

class CertificationRecordSerializer(serializers.ModelSerializer):    
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = CertificationRecord
        fields = ('id', 'user', 'certification', 'result', 'exam_date', 'comment', 'created_at')

class TargetStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetStatus
        fields = ('id', 'name')

class TargetRecordSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    modified_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = TargetRecord
        fields = ('id', 'user', 'target', 'target_deadline', 'status', 'comment', 'created_at', 'modified_at')

class StudyRecordSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = StudyRecord
        fields = ('id', 'user', 'content', 'study_time', 'comment', 'created_at')
