from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Service(models.Model):
    name = models.CharField("Nome", max_length=120)
    slug = models.SlugField("Identificador", unique=True)
    short_description = models.CharField("Descrição curta", max_length=220)
    description = models.TextField("Descrição", blank=True)
    image = models.ImageField("Imagem", upload_to="services/", blank=True, null=True)
    alt_text = models.CharField("Texto alternativo da imagem", max_length=180, blank=True)
    sort_order = models.PositiveIntegerField("Ordem", default=0)
    is_published = models.BooleanField("Publicado", default=True)
    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    updated_at = models.DateTimeField("Atualizado em", auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Serviço"
        verbose_name_plural = "Serviços"

    def __str__(self):
        return self.name

class PortfolioItem(models.Model):
    title = models.CharField("Título", max_length=140)
    slug = models.SlugField("Identificador", unique=True)
    service = models.ForeignKey(Service, verbose_name="Serviço relacionado", on_delete=models.SET_NULL, blank=True, null=True, related_name="portfolio_items")
    description = models.TextField("Descrição", blank=True)
    before_image = models.ImageField("Foto de antes", upload_to="portfolio/", blank=True, null=True)
    after_image = models.ImageField("Foto de depois", upload_to="portfolio/", blank=True, null=True)
    cover_image = models.ImageField("Imagem principal", upload_to="portfolio/", blank=True, null=True)
    image_alt = models.CharField("Texto alternativo", max_length=180, blank=True)
    sort_order = models.PositiveIntegerField("Ordem", default=0)
    is_published = models.BooleanField("Publicado", default=True)
    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    updated_at = models.DateTimeField("Atualizado em", auto_now=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]
        verbose_name = "Trabalho realizado"
        verbose_name_plural = "Trabalhos realizados"

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    customer_name = models.CharField("Nome/identificação autorizada", max_length=100)
    text = models.TextField("Depoimento")
    rating = models.PositiveSmallIntegerField("Avaliação (opcional)", blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    source = models.CharField("Origem (opcional)", max_length=120, blank=True)
    is_published = models.BooleanField("Publicado", default=False)
    created_at = models.DateTimeField("Criado em", auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Depoimento"
        verbose_name_plural = "Depoimentos"

    def __str__(self):
        return f"{self.customer_name} — depoimento"

class SiteSettings(models.Model):
    business_name = models.CharField("Nome da empresa", max_length=100, default="LavSofá")
    whatsapp_number = models.CharField("WhatsApp (somente dígitos com código do país)", max_length=20, default="5521966069772")
    instagram_url = models.URLField("Instagram", default="https://www.instagram.com/lavsofa.rj/")
    facebook_url = models.URLField("Facebook", blank=True, default="")
    hero_title = models.CharField("Título principal", max_length=180, default="Seu estofado merece cuidado.")
    hero_subtitle = models.CharField("Subtítulo principal", max_length=260, default="Higienização e impermeabilização de estofados em Niterói, São Gonçalo e regiões próximas.")
    hero_image = models.ImageField("Imagem principal", upload_to="site/", blank=True, null=True)
    hero_image_alt = models.CharField("Texto alternativo da imagem principal", max_length=180, blank=True)
    about_text = models.TextField("Texto institucional", blank=True)
    service_areas = models.CharField("Regiões atendidas", max_length=250, default="Niterói, São Gonçalo e regiões próximas")
    meta_title = models.CharField("Título SEO", max_length=180, default="LavSofá | Higienização e impermeabilização de estofados")
    meta_description = models.CharField("Descrição SEO", max_length=260, default="Conheça os serviços da LavSofá e solicite um orçamento pelo WhatsApp em Niterói, São Gonçalo e regiões próximas.")
    updated_at = models.DateTimeField("Atualizado em", auto_now=True)

    class Meta:
        verbose_name = "Configurações do site"
        verbose_name_plural = "Configurações do site"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Configurações da LavSofá"
