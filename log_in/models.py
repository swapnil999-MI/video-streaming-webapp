from django.conf import settings
from django.db import models

class loginmodel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Other fields