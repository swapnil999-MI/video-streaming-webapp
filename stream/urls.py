from django.contrib import admin
from django.urls import path
from stream import views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('upload_video/', views.upload_video, name='upload_video'),
    path('delete_video/', views.delete_video, name='delete_video'),
    path('stream/<str:video_title>/', views.stream_compressed_video, name='stream_compressed_video'),
    path('show/', views.show, name='show-video'),
    path('video_list/', views.video_list, name='video_list'),
    path('upload_video1/', views.upload_video1, name='upload_video1'),
    path('delete_video1/', views.delete_video1, name='delete_video1'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)