/* ==========================================================================
   PROTOCOLO FÍGADO LIMPO - INTERATIVIDADE & CONVERSÃO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initBeforeAfterSlider();
  initFaqAccordion();
  initStickyBar();
  initLiveSalesNotification();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. CONTADOR REGRESSIVO DE ESCASSEZ (15:00)
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const timerDisplay = document.getElementById('countdown-timer');
  if (!timerDisplay) return;

  let totalSeconds = 15 * 60; // 15 minutos

  // Tenta recuperar tempo salvo na sessão
  const savedTime = sessionStorage.getItem('liver_timer_seconds');
  if (savedTime && parseInt(savedTime, 10) > 0) {
    totalSeconds = parseInt(savedTime, 10);
  }

  const updateTimer = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (totalSeconds > 0) {
      totalSeconds--;
      sessionStorage.setItem('liver_timer_seconds', totalSeconds);
    } else {
      // Reinicia sutilmente em 5 minutos quando zera para manter urgência contínua
      totalSeconds = 5 * 60;
    }
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   2. SLIDER INTERATIVO ANTES & DEPOIS (FÍGADO GORDUROSO vs REGENERADO)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.slider-container');
  const handle = document.querySelector('.slider-handle');
  const afterImg = document.querySelector('.slider-img.after');

  if (!container || !handle || !afterImg) return;

  let isDragging = false;

  const setSliderPosition = (xPos) => {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;

    // Limites de 5% a 95%
    if (offsetX < rect.width * 0.05) offsetX = rect.width * 0.05;
    if (offsetX > rect.width * 0.95) offsetX = rect.width * 0.95;

    const percentage = (offsetX / rect.width) * 100;
    handle.style.left = `${percentage}%`;
    afterImg.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  };

  // Mouse Events
  handle.addEventListener('mousedown', () => (isDragging = true));
  window.addEventListener('mouseup', () => (isDragging = false));
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events (Mobile)
  handle.addEventListener('touchstart', () => (isDragging = true), { passive: true });
  window.addEventListener('touchend', () => (isDragging = false));
  container.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Clique direto no container para mover
  container.addEventListener('click', (e) => {
    setSliderPosition(e.clientX);
  });
}

/* --------------------------------------------------------------------------
   3. ACORDEÃO INTERATIVO DE PERGUNTAS FREQUENTES (FAQ)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.faq-item');
      const isActive = parentItem.classList.contains('active');

      // Fecha todos os outros itens
      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Alterna o item clicado
      if (!isActive) {
        parentItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. BARRA FIXA INFERIOR FLUTUANTE (STICKY BAR)
   -------------------------------------------------------------------------- */
function initStickyBar() {
  const stickyBar = document.querySelector('.sticky-bar');
  const offerSection = document.getElementById('oferta');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Aparece após rolar 450px
    if (scrollY > 450) {
      // Esconde se o usuário já estiver olhando direto para a caixa de oferta
      if (offerSection) {
        const rect = offerSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          stickyBar.classList.remove('visible');
          return;
        }
      }
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. POPUP DE PROVA SOCIAL AO VIVO (VENDAS EM TEMPO REAL)
   -------------------------------------------------------------------------- */
function initLiveSalesNotification() {
  const toast = document.querySelector('.live-toast');
  if (!toast) return;

  const buyers = [
    { name: 'Maria C.', city: 'São Paulo - SP', initial: 'M' },
    { name: 'Roberto S.', city: 'Belo Horizonte - MG', initial: 'R' },
    { name: 'Cláudia F.', city: 'Curitiba - PR', initial: 'C' },
    { name: 'Antônio L.', city: 'Porto Alegre - RS', initial: 'A' },
    { name: 'Sandra M.', city: 'Goiânia - GO', initial: 'S' },
    { name: 'José V.', city: 'Campinas - SP', initial: 'J' },
    { name: 'Helena P.', city: 'Brasília - DF', initial: 'H' },
    { name: 'Carlos D.', city: 'Salvador - BA', initial: 'C' }
  ];

  const toastName = toast.querySelector('.toast-name');
  const toastCity = toast.querySelector('.toast-city');
  const toastAvatar = toast.querySelector('.toast-avatar');

  let buyerIndex = 0;

  function showNextNotification() {
    const buyer = buyers[buyerIndex];
    toastName.textContent = buyer.name;
    toastCity.textContent = buyer.city;
    toastAvatar.textContent = buyer.initial;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);

    buyerIndex = (buyerIndex + 1) % buyers.length;
    // Próximo disparo entre 14 e 22 segundos
    const nextInterval = Math.floor(Math.random() * 8000) + 14000;
    setTimeout(showNextNotification, nextInterval);
  }

  // Primeiro disparo após 6 segundos
  setTimeout(showNextNotification, 6000);
}

/* --------------------------------------------------------------------------
   6. ROLAGEM SUAVE PARA OFERTA
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
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
