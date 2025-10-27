// main.js - Funções modernas e minimalistas para o site DJISAN PRO

// Mobile nav toggle com transição suave
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav ul');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      nav.style.opacity = isOpen ? '0' : '1';
      nav.style.transform = isOpen ? 'translateY(-10px)' : 'translateY(0)';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  }
}

// Scroll reveal com easing suave
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Parallax hero com requestAnimationFrame para suavidade
function initParallax() {
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    let lastScrollY = window.scrollY;
    function updateParallax() {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      hero.style.transform = `translateY(${y * -0.12}px)`;
      lastScrollY = y;
      requestAnimationFrame(updateParallax);
    }
    updateParallax();
  }
}

// Contact form com validação simples e WhatsApp
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      const name = encodeURIComponent(form.name.value.trim());
      const email = encodeURIComponent(form.email.value.trim());
      const msg = encodeURIComponent(form.message.value.trim());
      const text = `Olá, sou ${name}%0AEmail: ${email}%0A%0A${msg}`;
      const url = `https://wa.me/258877676995?text=${text}`;
      window.open(url, '_blank');
      form.reset(); // Limpa o form após envio
    });
  }
}

// Smooth scroll com easing nativo
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Lazy loading com observador para performance
function initLazyLoading() {
  document.querySelectorAll('.tile img').forEach(img => {
    img.loading = 'lazy';
    img.alt = img.alt || 'Imagem do portfólio'; // Melhora acessibilidade
  });
}

// Theme toggle com persistência via localStorage
function initThemeToggle() {
  const themeKey = 'djisanpro-theme';
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) document.body.classList.add(savedTheme);

  const toggleThemeBtn = document.createElement('button');
  toggleThemeBtn.textContent = 'Alternar Tema';
  toggleThemeBtn.style.position = 'fixed';
  toggleThemeBtn.style.bottom = '20px';
  toggleThemeBtn.style.right = '20px';
  toggleThemeBtn.style.padding = '8px 12px';
  toggleThemeBtn.style.background = 'var(--prim)';
  toggleThemeBtn.style.color = '#fff';
  toggleThemeBtn.style.border = 'none';
  toggleThemeBtn.style.borderRadius = '20px'; // Mais arredondado, estilo Apple
  toggleThemeBtn.style.cursor = 'pointer';
  toggleThemeBtn.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
  toggleThemeBtn.style.opacity = '0.9';
  toggleThemeBtn.addEventListener('mouseenter', () => toggleThemeBtn.style.opacity = '1');
  toggleThemeBtn.addEventListener('mouseleave', () => toggleThemeBtn.style.opacity = '0.9');
  document.body.appendChild(toggleThemeBtn);

  toggleThemeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem(themeKey, isLight ? 'light-theme' : '');
  });
}

// Nova função: Botão "back to top" minimalista e suave
function initBackToTop() {
  const btn = document.createElement('button');
  btn.textContent = '↑';
  btn.style.position = 'fixed';
  btn.style.bottom = '70px'; // Acima do theme toggle
  btn.style.right = '20px';
  btn.style.padding = '10px';
  btn.style.background = 'var(--prim)';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '50%';
  btn.style.cursor = 'pointer';
  btn.style.opacity = '0';
  btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 300 ? '0.9' : '0';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
}

// Nova função: Modal simples para imagens da galeria (interatividade clean)
function initGalleryModal() {
  const tiles = document.querySelectorAll('.tile img');
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.background = 'rgba(0, 0, 0, 0.8)';
  modal.style.display = 'none';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  modal.style.transition = 'opacity 0.3s ease';
  const modalImg = document.createElement('img');
  modalImg.style.maxWidth = '90%';
  modalImg.style.maxHeight = '90%';
  modalImg.style.borderRadius = '8px';
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  tiles.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
      modal.style.opacity = '1';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
  });
}

// Inicializar todas as funções ao carregar
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initParallax();
  initContactForm();
  initSmoothScroll();
  initLazyLoading();
  initThemeToggle();
  initBackToTop();
  initGalleryModal();
});