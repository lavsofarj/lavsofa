from django.db import migrations

SERVICES = [
    {
        "name": "Higienização de Cadeiras",
        "slug": "higienizacao-de-cadeiras",
        "short_description": "Limpeza cuidadosa de cadeiras estofadas para renovar a aparência e o conforto.",
        "description": "A higienização de cadeiras estofadas ajuda a remover sujeiras acumuladas, marcas do uso diário e odores indesejados. Utilizamos um processo de limpeza cuidadoso, adequado ao tipo de tecido, para revitalizar a aparência das cadeiras e deixar o ambiente mais agradável. Ideal para cadeiras de sala de jantar, escritório e outros espaços da casa ou do trabalho.",
        "alt_text": "Ilustração de cadeira estofada representando o serviço de higienização de cadeiras.",
        "sort_order": 1,
    },
    {
        "name": "Higienização de Poltronas",
        "slug": "higienizacao-de-poltronas",
        "short_description": "Cuidado especializado para limpar e renovar a aparência da sua poltrona.",
        "description": "A poltrona faz parte dos momentos de descanso e merece atenção especial. A higienização profissional auxilia na remoção de poeira, sujeiras e odores acumulados nas fibras do tecido, contribuindo para uma aparência renovada e mais conforto no dia a dia. O procedimento é realizado com cuidado e considera as características do estofado.",
        "alt_text": "Ilustração de poltrona estofada representando o serviço de higienização de poltronas.",
        "sort_order": 2,
    },
    {
        "name": "Higienização de Colchões",
        "slug": "higienizacao-de-colchoes",
        "short_description": "Limpeza especializada para cuidar do colchão e do ambiente de descanso.",
        "description": "O colchão acumula resíduos e sujeiras ao longo do tempo. A higienização profissional ajuda a cuidar da superfície do colchão, reduzindo sujeiras e odores e contribuindo para um ambiente de descanso mais agradável. O método de limpeza é escolhido de acordo com as características do material, com atenção ao cuidado do tecido e à secagem adequada.",
        "alt_text": "Ilustração de colchão representando o serviço de higienização de colchões.",
        "sort_order": 3,
    },
    {
        "name": "Impermeabilização de Estofados",
        "slug": "impermeabilizacao-de-estofados",
        "short_description": "Proteção adicional para ajudar a evitar que líquidos sejam absorvidos rapidamente pelo tecido.",
        "description": "A impermeabilização cria uma camada protetora que ajuda a dificultar a penetração de líquidos no tecido, dando mais tempo para agir em pequenos acidentes do dia a dia. É uma solução para quem deseja complementar os cuidados com sofás, poltronas, cadeiras estofadas e outros estofados compatíveis. A eficácia e a durabilidade dependem do tecido, do produto aplicado e dos cuidados após o serviço. A impermeabilização não torna o estofado à prova de qualquer líquido ou mancha.",
        "alt_text": "Ilustração de estofado com gotas de água representando o serviço de impermeabilização.",
        "sort_order": 4,
    },
]


def seed_services(apps, schema_editor):
    Service = apps.get_model("sitecontent", "Service")
    for data in SERVICES:
        Service.objects.get_or_create(slug=data["slug"], defaults=data)


def unseed_services(apps, schema_editor):
    Service = apps.get_model("sitecontent", "Service")
    Service.objects.filter(slug__in=[item["slug"] for item in SERVICES]).delete()


class Migration(migrations.Migration):
    dependencies = [("sitecontent", "0001_initial")]
    operations = [migrations.RunPython(seed_services, unseed_services)]
