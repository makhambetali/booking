from bs.models import Seat, Booking
from bs.tasks import delete_record

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
    def create_booking(seat_id, user_id, duration):
        """Создание брони"""
        seat = BookingService.get_seat(seat_id)
        seat.validate_seat_availability()
        seat.validate_duration(duration=duration)
        cost = seat.calculate_cost(duration)
        user = UserService.get_user(user_id)

        with transaction.atomic(): 
            booking = Booking.objects.create(
                seat=seat,
                user_id=user_id,
                duration=duration,
            )
            try:
                delete_record.apply_async((booking.id,), countdown=60 * duration)
            except Exception as e:
                raise ValueError(f"Ошибка при запуске задачи Celery: {e}")

            seat.reserve()
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