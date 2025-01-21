from django.core.management.base import BaseCommand
from datetime import time, timedelta, datetime, date
from bs.models import TimeSlot  # Замените 'app' на имя вашего приложения


class Command(BaseCommand):
    help = "Generate time slots from 00:00 to 23:30 with 30-minute intervals"

    def handle(self, *args, **kwargs):
        # Удаляем старые слоты, если нужно
        TimeSlot.objects.all().delete()

        start_time = time(0, 0)
        end_time = time(23, 30)
        interval = timedelta(minutes=30)

        # Генерация временных интервалов
        current_time = start_time
        slots_created = 0
        while current_time <= end_time:
            TimeSlot.objects.get_or_create(start_time=current_time)
            current_time = (datetime.combine(datetime.today(), current_time) + interval).time()
            slots_created += 1

        self.stdout.write(self.style.SUCCESS(f"{slots_created} time slots successfully generated!"))
