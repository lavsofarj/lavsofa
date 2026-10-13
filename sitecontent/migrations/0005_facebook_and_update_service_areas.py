from django.db import migrations, models


def update_saved_site_settings(apps, schema_editor):
    SiteSettings = apps.get_model("sitecontent", "SiteSettings")
    config = SiteSettings.objects.filter(pk=1).first()
    if not config:
        return

    replacements = (
        ("Niterói, São Gonçalo e Maricá, RJ", "Niterói, São Gonçalo e regiões próximas"),
        ("Niterói, São Gonçalo e Maricá", "Niterói, São Gonçalo e regiões próximas"),
        ("Niteroi, Sao Goncalo e Marica, RJ", "Niterói, São Gonçalo e regiões próximas"),
        ("Niteroi, Sao Goncalo e Marica", "Niterói, São Gonçalo e regiões próximas"),
    )
    for field in ("hero_subtitle", "service_areas", "meta_description"):
        value = getattr(config, field, "") or ""
        for old, new in replacements:
            value = value.replace(old, new)
        setattr(config, field, value)
    config.save()


class Migration(migrations.Migration):
    dependencies = [
        ("sitecontent", "0004_seed_sofa_portfolio"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="facebook_url",
            field=models.URLField(blank=True, default="", verbose_name="Facebook"),
        ),
        migrations.RunPython(update_saved_site_settings, migrations.RunPython.noop),
    ]
