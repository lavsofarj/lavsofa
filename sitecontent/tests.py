from django.test import TestCase
from django.urls import reverse
from .models import Service

class HomePageTests(TestCase):
    def test_homepage_returns_success(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "LavSofá")

    def test_unpublished_service_is_not_shown(self):
        Service.objects.create(
            name="Serviço de teste", slug="servico-de-teste",
            short_description="Descrição de teste", is_published=False
        )
        response = self.client.get(reverse("home"))
        self.assertNotContains(response, "Serviço de teste")
