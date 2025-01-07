import qrcode
from io import BytesIO
from django.core.files.base import ContentFile

def generate_qr_code(seat_id=None, seat_name=None, is_vip=None):
    data = {"seat_id": seat_id, "seat_name": seat_name, "vip": is_vip}
    qr = qrcode.QRCode(
        version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    
    return ContentFile(buffer.getvalue())
