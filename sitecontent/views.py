from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from .models import Service, PortfolioItem, Testimonial, SiteSettings

def home(request):
    config = SiteSettings.load()
    services = Service.objects.filter(is_published=True)
    portfolio = PortfolioItem.objects.filter(is_published=True).select_related("service")
    testimonials = Testimonial.objects.filter(is_published=True)
    context = {
        "config": config,
        "services": services,
        "portfolio": portfolio,
        "testimonials": testimonials,
        "whatsapp_number": config.whatsapp_number or settings.WHATSAPP_NUMBER,
        "instagram_url": config.instagram_url or settings.INSTAGRAM_URL,
        "facebook_url": config.facebook_url,
    }
    return render(request, "sitecontent/home.html", context)

def robots_txt(request):
    body = "User-agent: *\nAllow: /\nDisallow: /admin/\n"
    return HttpResponse(body, content_type="text/plain")
