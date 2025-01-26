from rest_framework import generics, mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import *
from .serializers import BarberSerializer, BookingSerializer
from .services import BookingService

class BarberViewSet(viewsets.ModelViewSet):
    queryset = Barber.objects.all()
    serializer_class = BarberSerializer

    @action(methods=['get'], detail=True)
    def schedules(self, request, pk=None):
        slots = BarberTime.objects.filter(barber_id=pk)
        return Response({
            'schedules': [
                {'id': slot.time_slots.id, 'time': slot.time_slots.start_time, 'is_available': slot.is_available} 
                for slot in slots
            ]
        })

class BookingViewSet(viewsets.ModelViewSet):
    queryset = BarberBooking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        barber_id = request.data.get('barber_id')
        time_id = request.data.get('time_id')
        name = request.data.get('name')
        phone_number = request.data.get('phone_number')
        comment = request.data.get('comment', '')

        missing_fields = []
        if not barber_id:
            missing_fields.append("barber_id")
        if not time_id:
            missing_fields.append("time_id")
        if not name:
            missing_fields.append("name")
        if not phone_number:
            missing_fields.append("phone_number")

        if missing_fields:
            return Response(
                {"error": f"The following fields are required: {', '.join(missing_fields)}."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            booking = BookingService.create_booking(
                barber_id=barber_id,
                time_id=time_id,
                name=name,
                phone_number=phone_number,
                comment=comment
            )
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = self.get_serializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        booking_id = kwargs.get('pk')

        try:
            result = BookingService.delete_booking(booking_id=booking_id)
            return Response(result, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
