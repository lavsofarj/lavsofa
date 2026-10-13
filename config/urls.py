from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from sitecontent.views import home, robots_txt

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
    path("robots.txt", robots_txt, name="robots_txt"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
