(() => {
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

  const number = document.body.dataset.whatsapp || "5521966069772";
  document.querySelectorAll("[data-service], [data-portfolio]").forEach(link => {
    const service = link.dataset.service;
    const portfolio = link.dataset.portfolio;
    let message = "Olá! Conheci a LavSofá pelo site e gostaria de solicitar um orçamento.";
    if (service) message = `Olá! Gostaria de solicitar um orçamento para ${service}. Poderiam me orientar?`;
    if (portfolio) message = `Olá! Vi o trabalho "${portfolio}" no site da LavSofá e gostaria de solicitar um orçamento.`;
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  });

  // Carrossel acessível de depoimentos: três cards no desktop, um por vez no celular.
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
    const visibleCount = () => window.matchMedia("(max-width: 640px)").matches ? 1 : window.matchMedia("(max-width: 980px)").matches ? 2 : 3;
    const maxIndex = () => Math.max(0, cards.length - visibleCount());
    const stepSize = () => cards.length < 2 ? cards[0].getBoundingClientRect().width : cards[1].offsetLeft - cards[0].offsetLeft;
    let dots = [];
    const buildDots = () => {
      dotsContainer.replaceChildren();
      dots = [];
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement("button");
        dot.type = "button"; dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ir para o grupo de depoimentos ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.append(dot); dots.push(dot);
      }
    };
    const render = () => {
      activeIndex = Math.min(activeIndex, maxIndex());
      prev.disabled = activeIndex <= 0; next.disabled = activeIndex >= maxIndex();
      dots.forEach((dot, i) => i === activeIndex ? dot.setAttribute("aria-current", "true") : dot.removeAttribute("aria-current"));
    };
    const goTo = index => {
      activeIndex = Math.max(0, Math.min(index, maxIndex()));
      viewport.scrollTo({left: activeIndex * stepSize(), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
      render();
    };
    prev.addEventListener("click", () => goTo(activeIndex - 1));
    next.addEventListener("click", () => goTo(activeIndex + 1));
    let scrollTimer;
    viewport.addEventListener("scroll", () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {activeIndex = Math.max(0, Math.min(maxIndex(), Math.round(viewport.scrollLeft / Math.max(1, stepSize()))));render();}, 70);
    }, {passive:true});
    let resizeTimer;
    window.addEventListener("resize", () => {window.clearTimeout(resizeTimer);resizeTimer = window.setTimeout(() => {buildDots();goTo(activeIndex);}, 120);});
    buildDots(); render();
  });


  // Adiciona "Ler mais" aos comentários que ultrapassam quatro linhas.
  const prepareTestimonialReadMore = container => {
    if (!container) return;

    container.querySelectorAll(".testimonial-card blockquote").forEach((quote, index) => {
      if (quote.dataset.readMoreInitialized === "true") return;
      quote.dataset.readMoreInitialized = "true";

      // Define o estado visual explicitamente para não depender de CSS em cache.
      const setExpanded = expanded => {
        quote.classList.toggle("is-expanded", expanded);
        quote.style.display = expanded ? "block" : "-webkit-box";
        quote.style.webkitBoxOrient = expanded ? "initial" : "vertical";
        quote.style.webkitLineClamp = expanded ? "unset" : "4";
        quote.style.overflow = expanded ? "visible" : "hidden";
      };

      setExpanded(false);
      const collapsedHeight = quote.getBoundingClientRect().height;
      setExpanded(true);
      const expandedHeight = quote.getBoundingClientRect().height;
      setExpanded(false);

      if (expandedHeight <= collapsedHeight + 2) return;

      if (!quote.id) quote.id = `testimonial-text-${index + 1}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "testimonial-read-more";
      button.textContent = "Ler mais";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", quote.id);

      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") !== "true";
        setExpanded(expanded);
        button.textContent = expanded ? "Ler menos" : "Ler mais";
        button.setAttribute("aria-expanded", String(expanded));
      });

      quote.insertAdjacentElement("afterend", button);
    });
  };

  prepareTestimonialReadMore(document.querySelector(".testimonials-section"));


})();