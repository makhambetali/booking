from django.contrib import admin
from django.utils.html import mark_safe
from .models import Seat, Booking
from .qr_code_generator import generate_qr_code  

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('name',  'is_vip', 'qr_code_preview')
    readonly_fields = ('qr_code_preview',)

    def qr_code_preview(self, obj):
        if obj.qr_code:
            return mark_safe(f'<img src="{obj.qr_code.url}" width="100" height="100" />')
        return "QR-код еще не создан"
    qr_code_preview.short_description = "QR-код"

    def save_model(self, request, obj, form, change):
        obj.save()
        
        if not obj.qr_code:
            qr_code = generate_qr_code(obj.id, obj.name, obj.is_vip)
            obj.qr_code.save(f"seat_{obj.id}.png", qr_code, save=False)

        super().save_model(request, obj, form, change)

admin.site.register(Booking)
