from django.db import models
from datetime import timedelta

from users.models import User
DURATION_CHOICES = [
        (3, "3 часа"),  # Храним длительность в минутах
        (5, "5 часов"),
    ]
class Seat(models.Model):
    name = models.CharField(max_length=10, db_index=True)
    is_vip = models.BooleanField("VIP", default=False)
    qr_code = models.ImageField(upload_to="qr_codes/", blank=True, null=True)
        
    def calculate_cost(self, duration):
        """Вычисляет стоимость места в зависимости от длительности."""
        base_cost = 2800 if self.is_vip else 1800
        return int(base_cost * 1.5) if duration == 5 else base_cost



    def __str__(self):
        return self.name
    
    

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    


    def __str__(self):
        return f"Booking of {self.seat} by {self.user}"
