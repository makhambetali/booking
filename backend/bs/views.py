from rest_framework import generics, status
from rest_framework.response import Response
from bs.serializers import SeatSerializer, BookingSerializer
from bs.services import BookingService
from bs.models import Booking
from django.views.generic import TemplateView


class SeatAPIList(generics.ListCreateAPIView):
    serializer_class = SeatSerializer

    def get_queryset(self):
        name = self.kwargs.get('name', None)
        return BookingService.get_seats_by_name(name)


class BookingAPIList(generics.ListCreateAPIView):
    serializer_class = BookingSerializer

    def post(self, request):
        try:
            data = request.data
            user_id = request.user.id
            booking_ids = BookingService.create_multiple_bookings(
                user_id=user_id,
                seat_ids=data.get("seat_id"),
                start_time=data.get("start_time"),
                end_time=data.get("end_time"),
            )
            return Response({"message": "Бронирование успешно создано!", "booking_ids": booking_ids},
                            status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BookingAPIDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class HomePageView(TemplateView):
    template_name = 'index.html'
