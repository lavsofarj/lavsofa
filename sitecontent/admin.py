from django.contrib import admin
from .models import Service, PortfolioItem, Testimonial, SiteSettings

admin.site.site_header = "LavSofá — Painel administrativo"
admin.site.site_title = "Administração LavSofá"
admin.site.index_title = "Gerencie o conteúdo do site"

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "sort_order", "is_published", "updated_at")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("name", "short_description", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("sort_order", "name")
    fieldsets = (
        ("Conteúdo", {"fields": ("name", "slug", "short_description", "description", "image", "alt_text")}),
        ("Exibição", {"fields": ("sort_order", "is_published")}),
    )

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ("title", "service", "sort_order", "is_published", "updated_at")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published", "service")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        ("Trabalho realizado", {"fields": ("title", "slug", "service", "description", "cover_image", "before_image", "after_image", "image_alt")}),
        ("Exibição", {"fields": ("sort_order", "is_published")}),
    )

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "rating", "is_published", "created_at")
    list_editable = ("is_published",)
    list_filter = ("is_published", "rating")
    search_fields = ("customer_name", "text")
    fieldsets = (
        ("Depoimento", {"fields": ("customer_name", "text", "rating", "source")}),
        ("Publicação", {"fields": ("is_published",)}),
    )

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Contato", {"fields": ("business_name", "whatsapp_number", "instagram_url", "facebook_url", "service_areas")}),
        ("Seção principal", {"fields": ("hero_title", "hero_subtitle", "hero_image", "hero_image_alt")}),
        ("Conteúdo institucional", {"fields": ("about_text",)}),
        ("SEO", {"fields": ("meta_title", "meta_description")}),
    )
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()
    def has_delete_permission(self, request, obj=None):
        return False
