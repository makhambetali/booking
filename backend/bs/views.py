from rest_framework import generics, status, viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from bs.serializers import SeatSerializer, BookingSerializer
from bs.services import BookingService
from bs.models import Booking, Seat


class SeatViewSet(viewsets.ModelViewSet):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()

class BookingViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    ViewSet для работы с бронированиями.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        """
        Обработка POST-запроса для создания бронирования.
        """
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
    
    @action(detail=False, methods=["get"])
    def my_bookings(self, request):
        """
        Пользователь может получить список своих бронирований.
        """
        user_id = request.user.id
        bookings = self.queryset.filter(user_id=user_id)
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

