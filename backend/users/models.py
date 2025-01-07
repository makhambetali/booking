from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    tel_number = models.CharField(max_length=20, blank=True, null=True)
    balance = models.PositiveIntegerField(default=0)

    def charge_account(self, value):
        if self.balance < value:
            raise ValueError("Недостаточно средств для списания")   
        
        self.balance -= value
        self.save()