// ==========================================================================
// MANUAL DO FÍGADO MAGRO — SCRIPT OFICIAL (3MOONS DESIGN SYSTEM)
// ==========================================================================

// 1) Cole aqui o link direto do seu checkout (Kiwify, Hotmart, Eduzz, Braip, etc.).
// Os botões da oferta e sticky bar passarão a apontar diretamente para ele:
const CHECKOUT_URL = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar links de checkout
  initCheckoutLinks();

  // 2. FAQ Accordion
  initFaqAccordion();

  // 3. Carrossel de WhatsApp
  initWhatsappCarousel();

  // 4. Lightbox para ampliar conversa
  initLightbox();

  // 5. Barra Fixa Flutuante (Sticky Bar)
  initStickyBar();

  // 6. Rolagem Suave
  initSmoothScroll();

  // 7. Destaque de Navegação Ativa (3Moons Style)
  initActiveNav();
});

/* --------------------------------------------------------------------------
   CHECKOUT LINKS
   -------------------------------------------------------------------------- */
function initCheckoutLinks() {
  if (!CHECKOUT_URL) return;
  document.querySelectorAll('a[href="#checkout"]').forEach((a) => {
    a.href = CHECKOUT_URL;
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Fecha outros itens
      items.forEach((other) => {
        const otherBtn = other.querySelector('.faq-q');
        const otherAns = other.querySelector('.faq-a');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.hidden = true;
        }
      });

      // Alterna estado atual
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        ans.hidden = false;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   SLIDER INTERATIVO ANTES & DEPOIS (MOUSE & TOUCH)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.slider-container');
  const handle = document.querySelector('.slider-handle');
  const afterImg = document.querySelector('.slider-img.after');

  if (!container || !handle || !afterImg) return;

  let isDragging = false;

  const setPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    // Limites de segurança entre 5% e 95%
    if (offsetX < rect.width * 0.05) offsetX = rect.width * 0.05;
    if (offsetX > rect.width * 0.95) offsetX = rect.width * 0.95;

    const percentage = (offsetX / rect.width) * 100;
    handle.style.left = `${percentage}%`;
    afterImg.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  };

  // Mouse
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  container.addEventListener('click', (e) => {
    setPosition(e.clientX);
  });

  // Touch
  const onTouchStart = (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      setPosition(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    if (e.cancelable) e.preventDefault();
    setPosition(e.touches[0].clientX);
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
   CARROSSEL DE WHATSAPP
   -------------------------------------------------------------------------- */
function initWhatsappCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.c-btn.prev-btn');
  const nextBtn = document.querySelector('.c-btn.next-btn');
  const dots = document.querySelectorAll('.c-dot');
  const slides = document.querySelectorAll('.carousel-slide');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  const updateCarousel = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  // Suporte a swipe por toque no mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
    }
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Conversa de WhatsApp ampliada';
    lightbox.hidden = false;
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  };

  triggers.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

/* --------------------------------------------------------------------------
   STICKY BAR FLUTUANTE
   -------------------------------------------------------------------------- */
function initStickyBar() {
  const stickyBar = document.querySelector('.sticky-bar');
  const offerSection = document.getElementById('oferta');
  if (!stickyBar) return;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 450) {
      if (offerSection) {
        const rect = offerSection.getBoundingClientRect();
        // Oculta quando o usuário está visualizando a própria seção de oferta
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
      if (targetId === '#checkout') {
        if (!CHECKOUT_URL) {
          e.preventDefault();
          document.getElementById('oferta')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        return;
      }
      if (targetId === '#' || targetId === '') return;

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
   DESTAQUE DE NAVEGAÇÃO ATIVA NO HEADER (3MOONS STYLE)
   -------------------------------------------------------------------------- */
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) {
      sections.push({ id, link, el });
    }
  });

  if (!sections.length) return;

  const onScrollNav = () => {
    const scrollPosition = window.scrollY + 120;

    let activeLink = null;
    sections.forEach(({ link, el }) => {
      const top = el.offsetTop;
      const height = el.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        activeLink = link;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('on', link === activeLink);
    });
  };

  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();
}
