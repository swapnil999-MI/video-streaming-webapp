from django.contrib import admin
from django.urls import path
from log_in import views

urlpatterns = [
    path('log1/',views.log,name='lol'),
    path('log/', views.login_view, name='lo'),
]
