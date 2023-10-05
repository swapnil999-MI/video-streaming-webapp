from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User
from django.conf import settings


from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    #fname = models.CharField(max_length=30,default='NA')
    middle_name = models.CharField(max_length=30,default='NA')
    #lname = models.CharField(max_length=30,default='NA')
    phone = models.CharField(max_length=15, default=None)
    #mail = models.EmailField(default='NA')
    address = models.CharField(max_length=100,default='NA')
    sex = models.CharField(max_length=6,default='NA')

    # Add other custom fields as needed

    def __str__(self):
        return self.username



