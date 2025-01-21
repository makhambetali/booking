from django.contrib import admin
from .models import Barber, BarberBooking, BarberTime
# Register your models here.
admin.site.register(BarberBooking)
admin.site.register(Barber)
admin.site.register(BarberTime)
