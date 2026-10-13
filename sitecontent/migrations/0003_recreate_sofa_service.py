from django.db import migrations

SERVICE = {
    "name": "Higienização de Sofás",
    "slug": "higienizacao-de-sofas",
    "short_description": "Higienização profunda para remover sujeiras acumuladas e renovar a aparência do sofá.",
    "description": "O sofá faz parte da rotina da casa e acumula sujeiras, resíduos e odores com o uso diário. A higienização profissional da LavSofá é realizada com técnicas e produtos adequados às características do estofado, ajudando a limpar o tecido, melhorar sua aparência e deixar o ambiente mais agradável. Cada sofá recebe atenção conforme o tipo de material e as condições apresentadas. O resultado depende do estado do estofado e da natureza das manchas, por isso não é possível garantir a remoção completa de todas elas.",
    "alt_text": "Ilustração de sofá estofado representando o serviço de higienização de sofás.",
    "sort_order": 0,
    "is_published": True,
}


def recreate_sofa_service(apps, schema_editor):
    Service = apps.get_model("sitecontent", "Service")
    # Remove o cadastro antigo de higienização de sofá, mesmo que use um slug diferente.
    old_services = Service.objects.filter(name__icontains="higieniza").filter(name__icontains="sof")
    old_services.delete()
    Service.objects.filter(slug__in=["higienizacao-de-sofa", "higienizacao-sofa", SERVICE["slug"]]).delete()
    Service.objects.create(**SERVICE)


def reverse_recreate(apps, schema_editor):
    Service = apps.get_model("sitecontent", "Service")
    Service.objects.filter(slug=SERVICE["slug"]).delete()


class Migration(migrations.Migration):
    dependencies = [("sitecontent", "0002_seed_services")]
    operations = [migrations.RunPython(recreate_sofa_service, reverse_recreate)]
