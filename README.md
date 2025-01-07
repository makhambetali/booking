"""
GET    /api/v1/seat/ - Get all seats from database
GET    /api/v1/seat/<seat_name> - Get <seat_name> from database


GET    /api/v1/booking/ - gets all bookings from database
GET    /api/v1/booking/<booking_id> - gets booking detail from database
POST    /api/v1/booking/ - Creates new booking 
{
    "seat_id": <seat_id>,
    "duration": <duration: 3 or 5>
}

"""