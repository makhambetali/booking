from rest_framework import generics, status
from rest_framework.response import Response
from bs.models import Seat, Booking
from bs.serializers import SeatSerializer, BookingSerializer
from bs.services import BookingService
from django.views.generic import TemplateView
from django.db import transaction

class SeatAPIList(generics.ListCreateAPIView):
    serializer_class = SeatSerializer

    def get_queryset(self):
        name = self.kwargs.get('name', None)
        if name:
            return Seat.objects.filter(name=name)
        return Seat.objects.all()


class BookingAPIList(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def post(self, request):
        user_id = request.user.id
        seat_ids = request.data.get("seat_id")
        duration = request.data.get("duration")

        if not seat_ids or not duration:
            return Response({"error": "Не переданы необходимые данные."}, status=status.HTTP_400_BAD_REQUEST)

        if isinstance(seat_ids, int):
            seat_ids = [seat_ids]

        try:
            with transaction.atomic():
                success_ids = []
                for seat_id in seat_ids:
                    booking = BookingService.create_booking(user_id=user_id, seat_id=seat_id, duration=duration)
                    success_ids.append(booking.id)
                return Response({"message": "Бронирование успешно создано!", "booking_ids": success_ids}, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class BookingAPIDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class HomePageView(TemplateView):
    template_name = 'index.html'
