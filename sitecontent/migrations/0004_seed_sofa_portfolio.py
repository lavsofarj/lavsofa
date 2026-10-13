from django.db import migrations


def create_sofa_portfolio_item(apps, schema_editor):
    PortfolioItem = apps.get_model("sitecontent", "PortfolioItem")
    Service = apps.get_model("sitecontent", "Service")

    service = Service.objects.filter(slug="higienizacao-de-sofas").first()
    PortfolioItem.objects.get_or_create(
        slug="higienizacao-sofa-tecido-bege",
        defaults={
            "title": "Higienização de sofá de tecido bege",
            "service": service,
            "description": (
                "Higienização de sofá de tecido bege com limpeza cuidadosa dos assentos, "
                "encostos e braços. O trabalho busca remover a sujeira acumulada no uso "
                "diário e devolver ao estofado um aspecto mais limpo e uniforme. O resultado "
                "pode variar conforme o tecido, o tempo das manchas e o estado de conservação."
            ),
            "image_alt": "Sofá de tecido bege antes e depois da higienização profissional",
            "sort_order": 1,
            # O item fica oculto até as duas fotografias serem enviadas no admin.
            "is_published": False,
        },
    )


def remove_sofa_portfolio_item(apps, schema_editor):
    PortfolioItem = apps.get_model("sitecontent", "PortfolioItem")
    PortfolioItem.objects.filter(slug="higienizacao-sofa-tecido-bege").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("sitecontent", "0003_recreate_sofa_service"),
    ]

    operations = [
        migrations.RunPython(create_sofa_portfolio_item, remove_sofa_portfolio_item),
    ]
