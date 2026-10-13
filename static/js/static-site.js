(() => {
  "use strict";

  const data = window.LAVSOFA_DATA || {};
  const whatsappNumber = String(data.whatsappNumber || "5521966069772").replace(/\D/g, "");
  const whatsappLink = (message = "Olá! Conheci a LavSofá pelo site e gostaria de solicitar um orçamento.") =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  // Adiciona expansão aos comentários longos após os cards serem renderizados.
  const prepareTestimonialReadMore = container => {
    if (!container) return;

    container.querySelectorAll(".testimonial-card blockquote").forEach((quote, index) => {
      if (quote.dataset.readMoreInitialized === "true") return;
      quote.dataset.readMoreInitialized = "true";

      // Mede o texto com e sem o limite visual de quatro linhas.
      const collapsedHeight = quote.getBoundingClientRect().height;
      quote.classList.add("is-expanded");
      const expandedHeight = quote.getBoundingClientRect().height;
      quote.classList.remove("is-expanded");

      if (expandedHeight <= collapsedHeight + 2) return;

      if (!quote.id) quote.id = `testimonial-text-${index + 1}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "testimonial-read-more";
      button.textContent = "Ler mais";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", quote.id);

      button.addEventListener("click", () => {
        const expanded = quote.classList.toggle("is-expanded");
        button.textContent = expanded ? "Ler menos" : "Ler mais";
        button.setAttribute("aria-expanded", String(expanded));
      });

      quote.insertAdjacentElement("afterend", button);
    });
  };

  document.querySelectorAll("[data-hero-title]").forEach(el => el.textContent = data.heroTitle || "Seu estofado merece cuidado.");
  document.querySelectorAll("[data-hero-subtitle]").forEach(el => el.textContent = data.heroSubtitle || "");
  document.querySelectorAll("[data-service-areas]").forEach(el => el.textContent = data.serviceAreas || "Niterói, São Gonçalo e regiões próximas");
  document.querySelectorAll("[data-whatsapp]").forEach(link => link.href = whatsappLink());

  const heroImage = document.querySelector("[data-hero-image]");
  if (heroImage && data.heroImage) {
    heroImage.src = data.heroImage;
    heroImage.alt = data.heroImageAlt || "Serviço realizado pela LavSofá";
  }

  const serviceGrid = document.querySelector("#service-grid");
  const services = Array.isArray(data.services) ? data.services : [];
  if (serviceGrid) {
    if (services.length) {
      serviceGrid.innerHTML = services.map(service => {
        const message = `Olá! Gostaria de solicitar um orçamento para ${service.name}. Poderiam me orientar?`;
        return `<article class="service-card">
          <img class="card-image" src="${escapeHtml(service.image || "static/img/logo-lavsofa.svg")}" alt="${escapeHtml(service.alt || service.name)}" loading="lazy">
          <div class="service-card-body">
            <h3>${escapeHtml(service.name)}</h3>
            <p>${escapeHtml(service.shortDescription || "")}</p>
            ${service.description ? `<p class="service-detail">${escapeHtml(service.description)}</p>` : ""}
            <a class="text-link" href="${whatsappLink(message)}" target="_blank" rel="noopener noreferrer">Solicitar orçamento <span aria-hidden="true">→</span></a>
          </div>
        </article>`;
      }).join("");
    } else {
      serviceGrid.outerHTML = `<div class="empty-state"><div class="empty-symbol">✦</div><h3>Conheça nossos serviços</h3><p>Estamos preparando esta seção. Entre em contato para saber mais sobre os serviços da LavSofá.</p><a class="button" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a><small>Cadastre os serviços para exibi-los aqui.</small></div>`;
    }
  }

  const portfolio = Array.isArray(data.portfolio) ? data.portfolio : [];
  const portfolioSection = document.querySelector("[data-portfolio-section]");
  const portfolioGrid = document.querySelector("#portfolio-grid");
  if (portfolioSection && portfolioGrid) {
    portfolioSection.hidden = false;
    document.querySelectorAll("[data-nav-portfolio]").forEach(el => el.hidden = false);
    if (portfolio.length) {
      portfolioGrid.innerHTML = portfolio.map(item => {
        const title = escapeHtml(item.title || "Trabalho realizado");
        const alt = escapeHtml(item.imageAlt || item.title || "Trabalho realizado pela LavSofá");
        let imageMarkup = "";
        if (item.beforeImage && item.afterImage) {
          imageMarkup = `<div class="before-after"><figure><img src="${escapeHtml(item.beforeImage)}" alt="Antes: ${alt}" loading="lazy"><figcaption>Antes</figcaption></figure><figure><img src="${escapeHtml(item.afterImage)}" alt="Depois: ${alt}" loading="lazy"><figcaption>Depois</figcaption></figure></div>`;
        } else if (item.coverImage || item.afterImage) {
          imageMarkup = `<img class="portfolio-image" src="${escapeHtml(item.coverImage || item.afterImage)}" alt="${alt}" loading="lazy">`;
        }
        const message = `Olá! Vi o trabalho "${item.title || "da LavSofá"}" no site e gostaria de solicitar um orçamento.`;
        return `<article class="portfolio-card">${imageMarkup}<div class="portfolio-body">${item.service ? `<span class="tag">${escapeHtml(item.service)}</span>` : ""}<h3>${title}</h3>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}<a class="text-link" href="${whatsappLink(message)}" target="_blank" rel="noopener noreferrer">Quero recuperar meu estofado <span aria-hidden="true">→</span></a></div></article>`;
      }).join("");
    } else {
      portfolioGrid.outerHTML = `<div class="empty-state"><div class="empty-symbol">▧</div><h3>Trabalhos realizados</h3><p>Em breve, você poderá conferir aqui mais resultados dos nossos serviços.</p><small>Adicione fotografias próprias para exibi-las aqui.</small></div>`;
    }
  }

  const testimonials = Array.isArray(data.testimonials) ? data.testimonials : [];
  const testimonialsSection = document.querySelector("[data-testimonials-section]");
  const testimonialTrack = document.querySelector("#testimonial-track");
  if (testimonialsSection && testimonialTrack) {
    testimonialsSection.hidden = false;
    document.querySelectorAll("[data-nav-testimonials]").forEach(el => el.hidden = false);
    const count = document.querySelector("#testimonial-count");
    if (count && testimonials.length) count.textContent = `${testimonials.length} ${testimonials.length === 1 ? "avaliação" : "avaliações"}`;
    const carousel = testimonialsSection.querySelector("[data-testimonials-carousel]");
    const carouselFooter = testimonialsSection.querySelector(".carousel-footer");
    if (!testimonials.length) {
      if (carousel) carousel.hidden = true;
      if (carouselFooter) carouselFooter.hidden = true;
    }
    testimonialTrack.innerHTML = testimonials.map(review => {
      const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
      return `<article class="testimonial-card">
        <div class="testimonial-card-top"><div class="testimonial-person"><span class="avatar" aria-hidden="true">${escapeHtml((review.customerName || "C").trim().slice(0, 1).toUpperCase())}</span><div class="testimonial-person-details"><strong>${escapeHtml(review.customerName || "Cliente LavSofá")}</strong><small>${escapeHtml(review.source || "Cliente LavSofá")}</small></div></div><span class="testimonial-check" aria-label="Depoimento publicado">✓</span></div>
        ${rating ? `<div class="testimonial-rating" aria-label="Avaliação de ${rating} de 5 estrelas"><span class="testimonial-stars" aria-hidden="true">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span><span class="rating-number">${rating},0 de 5</span></div>` : ""}
        ${review.text && review.text.trim() ? `<span class="quote-mark" aria-hidden="true">“</span><blockquote>${escapeHtml(review.text)}</blockquote>` : `<p class="testimonial-no-comment">${rating ? `Avaliação de ${rating} estrelas, sem comentário escrito.` : "Cliente não deixou um comentário escrito."}</p>`}
      </article>`;
    }).join("");
    prepareTestimonialReadMore(testimonialTrack);
  }

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }));
  }

  // Mantém uma imagem de reserva caso alguma foto externa deixe de estar disponível.
  document.querySelectorAll(".service-card .card-image").forEach(image => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = "static/img/logo-lavsofa.svg";
      image.alt = "LavSofá";
    }, {once:true});
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Carrossel acessível para depoimentos reais inseridos em site-data.js.
  document.querySelectorAll("[data-testimonials-carousel]").forEach(carousel => {
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.parentElement.querySelector("[data-carousel-dots]");
    if (!viewport || !track || !prev || !next || !dotsContainer) return;
    const cards = Array.from(track.querySelectorAll(".testimonial-card"));
    if (!cards.length) return;
    let activeIndex = 0;
    let dots = [];
    const visibleCount = () => window.matchMedia("(max-width: 640px)").matches ? 1 : window.matchMedia("(max-width: 980px)").matches ? 2 : 3;
    const maxIndex = () => Math.max(0, cards.length - visibleCount());
    const stepSize = () => cards.length < 2 ? cards[0].getBoundingClientRect().width : cards[1].offsetLeft - cards[0].offsetLeft;
    const render = () => {
      activeIndex = Math.min(activeIndex, maxIndex());
      prev.disabled = activeIndex <= 0;
      next.disabled = activeIndex >= maxIndex();
      dots.forEach((dot, i) => i === activeIndex ? dot.setAttribute("aria-current", "true") : dot.removeAttribute("aria-current"));
    };
    const goTo = index => {
      activeIndex = Math.max(0, Math.min(index, maxIndex()));
      viewport.scrollTo({left: activeIndex * stepSize(), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
      render();
    };
    const buildDots = () => {
      dotsContainer.replaceChildren();
      dots = [];
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ir para o grupo de depoimentos ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.append(dot);
        dots.push(dot);
      }
    };
    prev.addEventListener("click", () => goTo(activeIndex - 1));
    next.addEventListener("click", () => goTo(activeIndex + 1));
    let scrollTimer;
    viewport.addEventListener("scroll", () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        activeIndex = Math.max(0, Math.min(maxIndex(), Math.round(viewport.scrollLeft / Math.max(1, stepSize()))));
        render();
      }, 70);
    }, {passive: true});
    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {buildDots(); goTo(activeIndex);}, 120);
    });
    buildDots();
    render();
  });
})();