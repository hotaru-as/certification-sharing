from django.contrib import admin
from .models import UserProfile, Follower, RecordCategory, Certification, CertificationRecord,  TargetStatus, TargetRecord, StudyRecord

admin.site.register(UserProfile)
admin.site.register(Follower)
admin.site.register(RecordCategory)
admin.site.register(Certification)
admin.site.register(CertificationRecord)
admin.site.register(TargetStatus)
admin.site.register(TargetRecord)
admin.site.register(StudyRecord)
