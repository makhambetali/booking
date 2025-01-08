from django.urls import path, include
from bs import views
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version="v1",
        description="Описание API",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'seat', views.SeatViewSet, basename='seat')

urlpatterns = [
     # Swagger UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    # ReDoc
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    path('api/v1/', include(router.urls)),
    path('api/v1/booking/', views.BookingAPIList.as_view(), name='booking-list'),
    path('api/v1/booking/<int:pk>/', views.BookingAPIDetail.as_view(), name='booking-detail'),
    path('', views.HomePageView.as_view())
]
