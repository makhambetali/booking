from bs.models import Seat, Booking
from bs.tasks import delete_record
from datetime import datetime
from users.models import User
from django.db import transaction
class BookingService:

    @staticmethod
    def get_seat(seat_id):
        """Получение места с проверкой на существование."""
        try:
            return Seat.objects.get(id=seat_id)
        except Seat.DoesNotExist:
            raise ValueError("Место не существует.")

    @staticmethod
    def validate_availablility(seat: Seat, start_time, end_time):
        """
        Проверяет доступность места в заданный промежуток времени.
        """
        start_time_formatted = datetime.strptime(start_time, "%H:%M").time()
        end_time_formatted = datetime.strptime(end_time, "%H:%M").time()

        bookings = Booking.objects.filter(seat=seat)

        for booking in bookings:
            existing_start = booking.start_time
            existing_end = booking.end_time

            if not (end_time_formatted <= existing_start or start_time_formatted >= existing_end):
                raise ValueError(
                    f"Место занято в период с {existing_start} по {existing_end}. "
                    f"Вы выбрали с {start_time} по {end_time}."
                )

    @staticmethod
    def create_booking(seat_id, user_id, start_time, end_time):
        """Создание брони"""
        seat = BookingService.get_seat(seat_id)
        if start_time >= end_time:
                raise ValueError("End time must be after start time.")
        BookingService.validate_availablility(seat, start_time, end_time)
        with transaction.atomic(): 
            booking = Booking.objects.create(
                seat=seat,
                user_id=user_id,
                start_time = start_time,
                end_time = end_time
            )
            # try:
            #     delete_record.apply_async((booking.id,), countdown=60 * 2)
            # except Exception as e:
            #     raise ValueError(f"Ошибка при запуске задачи Celery: {e}")

            # seat.reserve()
            # user.charge_account(cost)
        return booking

        
    

class UserService:
    @staticmethod
    def get_user(user_id):
        try:
            user = User.objects.get(id = user_id)
            return user
        except:
            raise ValueError("Пользователь не существует")