from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth.models import AbstractUser


#class CustomUser(AbstractUser):

    #def __str__(self):
        #return self.username


#class Group(models.Model):
    # Fields and methods for your Group model
    # Define a related_name for the user_set relationship
    #users = models.ManyToManyField(CustomUser, related_name='custom_groups')

#class Permission(models.Model):
    # Fields and methods for your Permission model
    # Define a related_name for the user_set relationship
    #users = models.ManyToManyField(CustomUser, related_name='custom_permissions')