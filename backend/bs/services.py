from bs.models import Seat, Booking
from datetime import datetime
from django.db import transaction

from .utils.tasks import delete_record
class BookingService:
    @staticmethod
    def get_seats_by_name(name):
        """Получение мест по имени или всех мест."""
        if name:
            return Seat.objects.filter(name=name)
        return Seat.objects.all()

    @staticmethod
    def validate_booking_data(seat_ids, start_time, end_time):
        if not seat_ids or not start_time or not end_time:
            raise ValueError("Не переданы необходимые данные.")
        if start_time >= end_time:
            raise ValueError("Время окончания должно быть позже времени начала.")

    @staticmethod
    def create_multiple_bookings(user_id, seat_ids, start_time, end_time):
        """Создание нескольких бронирований."""
        if isinstance(seat_ids, int):
            seat_ids = [seat_ids]
        BookingService.validate_booking_data(seat_ids, start_time, end_time)

        with transaction.atomic():
            success_ids = []
            for seat_id in seat_ids:
                booking = BookingService.create_booking(
                    user_id=user_id,
                    seat_id=seat_id,
                    start_time=start_time,
                    end_time=end_time,
                )
                success_ids.append(booking.id)
        return success_ids

    @staticmethod
    def create_booking(user_id, seat_id, start_time, end_time):
        seat = BookingService.get_seat(seat_id)
        BookingService.validate_availability(seat, start_time, end_time)
        with transaction.atomic():
            booking = Booking.objects.create(
                seat=seat,
                user_id=user_id,
                start_time=start_time,
                end_time=end_time)
            # try:
            #     delete_record.apply_async((booking.id,), countdown=60)
            # except Exception as e:
            #     raise ValueError(f"Ошибка при запуске задачи Celery: {e}")

            return booking

    @staticmethod
    def validate_availability(seat, start_time, end_time):
        start_time = datetime.strptime(start_time, "%H:%M").time()
        end_time = datetime.strptime(end_time, "%H:%M").time()

        bookings = Booking.objects.filter(seat=seat)
        for booking in bookings:
            if not (end_time <= booking.start_time or start_time >= booking.end_time):
                raise ValueError(
                    f"Место {booking.seat.name} занято с {booking.start_time} до {booking.end_time}."
                )

    @staticmethod
    def get_seat(seat_id):
        try:
            return Seat.objects.get(id=seat_id)
        except Seat.DoesNotExist:
            raise ValueError("Место не существует.")
