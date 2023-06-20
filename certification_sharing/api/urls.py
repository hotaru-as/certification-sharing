from django.urls import path
from django.conf.urls import include
from .views import *

urlpatterns = [
    path('users/<str:pk>/profile/', UpdateUserProfileView.as_view(), name='profile'),
    path('users/profile/', CreateUserProfileView.as_view(), name='create_profile'),

    path('target-status/', ListTargetStatusView.as_view(), name='target_status'),
    path('targets/', ListUserTargetView.as_view(), name='targets'),
    path('targets/<str:pk>/', UpdateUserTargetView.as_view(), name='target'),

    path('followers/', ListFollowerView.as_view(), name='followers'),
    path('followers/<str:pk>/', DeleteFollowerView.as_view(), name='follower'),

    path('studies/', ListUserStudyView.as_view(), name='studies'),
    path('studies/<str:pk>/', UpdateUserStudyView.as_view(), name='study'),

    path('certification-category/', ListCertificationView.as_view(), name='certification_category'),
    path('certifications/', ListUserCertificationView.as_view(), name='certifications'),
    path('certifications/<str:pk>/', UpdateUserCertificationView.as_view(), name='certification'),
]
