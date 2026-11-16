// ==========================================================================
// MANUAL DO FÍGADO MAGRO — SCRIPT OFICIAL DE ALTA CONVERSÃO
// ==========================================================================

// 1) Cole aqui o link direto do seu checkout (Kiwify, Hotmart, Eduzz, Braip, etc.).
// Os botões da oferta passam a apontar diretamente para ele:
const CHECKOUT_URL = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar links de checkout
  if (CHECKOUT_URL) {
    document.querySelectorAll('a[href="#checkout"]').forEach((a) => {
      a.href = CHECKOUT_URL;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  // 2. FAQ Accordion (Abre uma pergunta por vez, com rotação suave do ícone)
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      items.forEach((other) => {
        const otherBtn = other.querySelector('.faq-q');
        const otherAns = other.querySelector('.faq-a');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.hidden = true;
        }
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        ans.hidden = false;
      }
    });
  });

  // 3. Slider Interativo Antes & Depois (Fígado Gorduroso vs. Fígado Regenerado)
  initBeforeAfterSlider();

  // 4. Barra Fixa Mobile Flutuante (Sticky Bar)
  initStickyBar();

  // 5. Rolagem Suave
  initSmoothScroll();

  // 6. Carrossel de Prints de Conversas (WhatsApp)
  initPrintsCarousel();

  // 7. Lightbox para ampliar conversa
  initLightbox();
});

/* --------------------------------------------------------------------------
   SLIDER INTERATIVO ANTES & DEPOIS (MOUSE & TOUCH)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.slider-container');
  const handle = document.querySelector('.slider-handle');
  const afterImg = document.querySelector('.slider-img.after');

  if (!container || !handle || !afterImg) return;

  let isDragging = false;

  const setSliderPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    // Limites de 4% a 96%
    if (offsetX < rect.width * 0.04) offsetX = rect.width * 0.04;
    if (offsetX > rect.width * 0.96) offsetX = rect.width * 0.96;

    const percentage = (offsetX / rect.width) * 100;
    handle.style.left = `${percentage}%`;
    afterImg.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  };

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  container.addEventListener('click', (e) => {
    setSliderPosition(e.clientX);
  });

  // Touch Events (Mobile)
  const onTouchStart = (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    setSliderPosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  handle.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
}

/* --------------------------------------------------------------------------
   BARRA FIXA FLUTUANTE (STICKY BAR)
   -------------------------------------------------------------------------- */
function initStickyBar() {
  const stickyBar = document.querySelector('.sticky-bar');
  const offerSection = document.getElementById('oferta');
  if (!stickyBar) return;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Surge após rolar 400px
    if (scrollY > 400) {
      if (offerSection) {
        const rect = offerSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25) {
          stickyBar.classList.remove('visible');
          return;
        }
      }
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   ROLAGEM SUAVE
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#checkout' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   CARROSSEL DE PRINTS DE CONVERSAS (WHATSAPP)
   -------------------------------------------------------------------------- */
function initPrintsCarousel() {
  document.querySelectorAll('.carousel').forEach((car) => {
    const track = car.querySelector('.car-track');
    if (!track) return;
    const slides = [...track.children];
    if (!slides.length) return;
    const prev = car.querySelector('.car-prev');
    const next = car.querySelector('.car-next');
    const count = car.querySelector('.car-count');

    const getStep = () => slides[0].offsetWidth + 20;

    if (prev) {
      prev.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
      });
    }

    const update = () => {
      const step = getStep();
      const i = Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
      if (count) count.textContent = `${i + 1} de ${slides.length}`;
      if (prev) prev.disabled = track.scrollLeft < 8;
      if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // Autoplay opcional
    const delay = Number(car.dataset.autoplay) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (delay && !reduceMotion) {
      let paused = false;
      let visible = false;
      const tick = () => {
        if (paused || !visible || document.hidden) return;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
        if (atEnd) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: getStep(), behavior: 'smooth' });
        }
      };
      setInterval(tick, delay);
      const pause = () => { paused = true; };
      const resume = () => { paused = false; };
      car.addEventListener('mouseenter', pause);
      car.addEventListener('mouseleave', resume);
      car.addEventListener('touchstart', pause, { passive: true });
      car.addEventListener('touchend', () => setTimeout(resume, 4000), { passive: true });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 }).observe(car);
      } else {
        visible = true;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   LIGHTBOX PARA AMPLIAR PRINTS DE CONVERSAS
   -------------------------------------------------------------------------- */
function initLightbox() {
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.innerHTML = `
    <div class="lb-card">
      <button type="button" class="lb-close" aria-label="Fechar conversa">&times;</button>
      <img class="lb-img" alt="" src="" />
    </div>
  `;
  document.body.appendChild(box);

  const lbImg = box.querySelector('.lb-img');
  const lbClose = box.querySelector('.lb-close');

  const openLb = (src, alt) => {
    if (!src) return;
    lbImg.src = src;
    lbImg.alt = alt || 'Conversa ampliada';
    box.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  const closeLb = () => {
    box.close();
    document.documentElement.style.overflow = '';
  };

  lbClose.addEventListener('click', closeLb);
  box.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });
  box.addEventListener('click', (e) => {
    if (e.target !== lbImg) closeLb();
  });

  // Gatilhos: clique no botão 'Ampliar conversa' ou na própria imagem do print
  document.querySelectorAll('a.s181, img.s175').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const card = el.closest('.s174');
      const img = card ? card.querySelector('.s175') : el;
      const src = el.tagName === 'A' ? el.getAttribute('href') : el.getAttribute('src');
      openLb(src || img?.src, img?.alt);
    });
  });
}
