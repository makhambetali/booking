from celery import shared_task
from .models import Booking

@shared_task
def delete_record(record_id):
    try:
        record = Booking.objects.get(id=record_id)
        # record.seat.release()
        record.delete()

        print(f"Record with ID {record_id} deleted, seat {record.seat.name} is now available<3.")
    except Booking.DoesNotExist:
        print(f"Record with ID {record_id} does not exist.")
