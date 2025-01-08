from django.db import models
from users.models import User


class Seat(models.Model):
    name = models.CharField(max_length=10, db_index=True, unique=True)
    is_vip = models.BooleanField("VIP", default=False)
    qr_code = models.ImageField(upload_to="qr_codes/", blank=True, null=True)


    def calculate_cost(self, duration):
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
