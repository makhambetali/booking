from django.urls import path, include
from bs import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'seat', views.SeatViewSet, basename='seat')
router.register(r'booking', views.BookingViewSet, basename='booking')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
