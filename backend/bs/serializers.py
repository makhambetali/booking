from .models import Seat, Booking
from rest_framework import serializers

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field = "username", read_only = True)
    seat = serializers.SlugRelatedField(slug_field = "name", read_only = True)
    class Meta:
        model = Booking
        fields = '__all__'

