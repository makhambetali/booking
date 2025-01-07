from django.urls import path
from bs import views

urlpatterns = [
    path('api/v1/seat/', views.SeatAPIList.as_view(), name='seat-list'),
    path('api/v1/seat/<str:name>', views.SeatAPIList.as_view(), name='seat-detail'),
    path('api/v1/booking/', views.BookingAPIList.as_view(), name='booking-list'),
    path('api/v1/booking/<int:pk>/', views.BookingAPIDetail.as_view(), name='booking-detail'),
    path('', views.HomePageView.as_view())
]
