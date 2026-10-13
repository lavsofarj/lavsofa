# LavSofá

Site institucional responsivo da LavSofá, preparado para publicação como site estático com **HTML, CSS e JavaScript**.

## Versão estática (GitHub Pages)

O ponto de entrada do site é `index.html` na raiz do repositório. Não é necessário executar Python, Django ou banco de dados para servir essa página.

- `index.html`: estrutura das seções e conteúdo principal.
- `static/css/site.css`: estilos e layout responsivo.
- `static/js/site-data.js`: conteúdo editável do site (serviços, WhatsApp, regiões, portfólio e avaliações).
- `static/js/static-site.js`: comportamento do menu, links de WhatsApp e renderização dos cartões.
- `static/img/`: logotipo e ilustrações locais usadas pelo site.

### Editar o conteúdo

Abra `static/js/site-data.js` e altere os valores:

- `whatsappNumber`: número no formato internacional, somente dígitos.
- `instagramUrl`: perfil do Instagram.
- `serviceAreas`: regiões atendidas.
- `heroTitle`, `heroSubtitle` e `heroImage`: apresentação principal.
- `services`: serviços mostrados na página.
- `portfolio`: trabalhos reais, com `title`, `description`, `service` e caminhos de imagem. Para antes/depois, use `beforeImage` e `afterImage`.
- `testimonials`: depoimentos reais autorizados, com `customerName`, `text`, `rating` e `source`.

Exemplo de trabalho no portfólio:

```js
{
  title: "Higienização de sofá",
  service: "Higienização de sofás",
  description: "Descrição do trabalho realizado.",
  beforeImage: "static/img/portfolio/sofa-antes.jpg",
  afterImage: "static/img/portfolio/sofa-depois.jpg",
  imageAlt: "Sofá antes e depois da higienização"
}
```

Exemplo de avaliação:

```js
{
  customerName: "Nome autorizado",
  text: "Texto real do depoimento.",
  rating: 5,
  source: "Google"
}
```

As seções de portfólio e avaliações ficam ocultas enquanto suas listas estiverem vazias. Isso evita publicar trabalhos ou avaliações fictícias.

**Importante sobre os dados antigos:** os serviços incluídos em `site-data.js` são uma base estática inicial. Os registros exatos do banco Django, as fotos que foram enviadas pelo painel e os depoimentos/itens de portfólio não são armazenados nos arquivos de código que conseguimos consultar no GitHub. Para migrar esses dados sem perda, será necessário exportá-los do banco e copiar as imagens de mídia para `static/img/`, atualizando depois os caminhos em `site-data.js`.

### Testar no computador

Como o site carrega arquivos locais, a melhor forma de testar é abrir um servidor estático na pasta raiz. Com Python instalado, execute:

```powershell
python -m http.server 8000
```

Depois acesse http://localhost:8000. Esse comando serve os arquivos estáticos; não executa Django nem acessa banco de dados. Também é possível usar a extensão Live Server do VS Code.

### Publicar no GitHub Pages

1. Confirme que `index.html` está na raiz do branch `main`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Selecione o branch `main` e a pasta `/(root)`; salve.
5. Aguarde o GitHub concluir a publicação e teste o endereço exibido na página Pages.

O repositório está privado no momento. A disponibilidade de GitHub Pages para repositórios privados depende do plano da conta. Se o GitHub não permitir a publicação gratuita nesse repositório, mantenha o código privado e publique os arquivos estáticos por um serviço gratuito compatível, como Cloudflare Pages, ou torne público somente se estiver confortável em expor o código.

### Domínio próprio

Depois de testar o endereço temporário, configure `lavsofarj.com.br` em **Settings → Pages → Custom domain** e siga os registros DNS que o GitHub indicar. Ative/aguarde o HTTPS antes de divulgar o endereço. Não altere os DNS do Registro.br antes de ter os registros exatos exibidos pelo provedor.

## Estrutura Django antiga

Os arquivos do Django ainda estão no repositório como cópia de segurança durante a migração. A página estática não depende deles. **Não remova o projeto Django nem seus dados até confirmar que todo o conteúdo e todas as imagens necessárias foram migrados e que o site estático está funcionando.**
