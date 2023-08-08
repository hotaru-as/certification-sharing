from django.db import models
from accounts.models import CustomUser

class UserProfile(models.Model):
    user_id = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    introduction = models.TextField(verbose_name='自己紹介', max_length=1000, null=True, blank=True)
    birth_day = models.DateField(verbose_name='誕生日', null=True, blank=True)
    icon_img = models.ImageField(verbose_name='アイコン画像', null=True, blank=True)

class Follower(models.Model):
    follow_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='follow_user')
    followed_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followed_user')
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)

class RecordCategory(models.Model):
    name = models.CharField(verbose_name='記録項目', max_length=20)

class Certification(models.Model):
    name = models.CharField(verbose_name='資格名', max_length=50)
    detail = models.TextField(verbose_name='資格詳細', max_length=500, null=True, blank=True)

class CertificationRecord(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    certification = models.ForeignKey(Certification, on_delete=models.CASCADE)
    result = models.BooleanField(verbose_name='結果', null=True, blank=True)
    exam_date = models.DateField(verbose_name='受験日')
    comment = models.TextField(verbose_name='コメント', max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)

class TargetStatus(models.Model):
    name = models.CharField(verbose_name='目標ステータス', max_length=200)

class TargetRecord(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    target = models.CharField(verbose_name='目標', max_length=100)
    target_deadline = models.DateField(verbose_name='目標期限', null=True, blank=True)
    status = models.ForeignKey(TargetStatus, on_delete=models.CASCADE)
    comment = models.TextField(verbose_name='コメント', max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    modified_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

class StudyRecord(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField(verbose_name='勉強内容', max_length=500)
    study_time = models.DurationField(verbose_name='勉強時間')
    comment = models.TextField(verbose_name='コメント', max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
