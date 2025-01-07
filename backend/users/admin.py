from django.contrib import admin
from users.models import User
# Register your models here.

@admin.register(User)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('username', 'balance')
