from urllib.parse import quote
from django.conf import settings
from .models import SiteSettings

def site_settings(request):
    try:
        config = SiteSettings.load()
        whatsapp = config.whatsapp_number
        instagram = config.instagram_url
    except Exception:
        config = None
        whatsapp = settings.WHATSAPP_NUMBER
        instagram = settings.INSTAGRAM_URL
    message = "Olá! Conheci a LavSofá pelo site e gostaria de solicitar um orçamento. Poderiam me orientar?"
    whatsapp_url = f"https://wa.me/{whatsapp}?text={quote(message)}"
    return {
        "site_config": config,
        "whatsapp_number": whatsapp,
        "whatsapp_url": whatsapp_url,
        "instagram_url": instagram,
    }
