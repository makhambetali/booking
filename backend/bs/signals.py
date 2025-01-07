from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Seat
from .qr_code_generator import generate_qr_code

@receiver(post_save, sender=Seat)
def generate_qr_code_on_create(sender, instance, created, **kwargs):
    if created and not instance.qr_code:
        qr_code_content = generate_qr_code(instance.id, instance.name, instance.is_vip)
        instance.qr_code.save(f"seat_{instance.id}.png", qr_code_content, save=False)
        instance.save(update_fields=['qr_code'])

