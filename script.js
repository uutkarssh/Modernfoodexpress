// ===== MODERN FOOD EXPRESS - PREMIUM JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== PAGE LOADER =====
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.menu-overlay');

  function closeMobileMenu() {
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    menuOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    mobileMenu?.classList.toggle('open');
    menuOverlay?.classList.toggle('open');
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  menuOverlay?.addEventListener('click', closeMobileMenu);
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));

  // ===== SCROLL ANIMATIONS =====
  const animElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observer.observe(el));

  // ===== MENU TABS =====
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      menuTabs.forEach(t => t.classList.remove('active'));
      menuSections.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`#${target}`)?.classList.add('active');
    });
  });

  // ===== RESERVATION FORM =====
  const reservationForm = document.querySelector('#reservation-form');
  reservationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = reservationForm.querySelector('.btn-submit');
    btn.textContent = 'Booking...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Book Table';
      btn.disabled = false;
      const msg = document.querySelector('.success-msg');
      if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 5000);
      }
      reservationForm.reset();
    }, 1500);
  });

  // ===== CONTACT FORM =====
  const contactForm = document.querySelector('#contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      const msg = document.querySelector('.success-msg');
      if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 5000);
      }
      contactForm.reset();
    }, 1500);
  });

  // ===== PARTICLES =====
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${5 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${0.1 + Math.random() * 0.4};
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ===== STATS COUNTER =====
  const stats = document.querySelectorAll('.stat-number[data-count]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const steps = 50;
        const increment = target / steps;
        const delay = target > 1000 ? 15 : 30; // faster for large numbers like years
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target + suffix;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current) + suffix;
          }
        }, delay);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(stat => statsObserver.observe(stat));

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== ADD TO CART BUTTON EFFECT =====
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function() {
      const original = this.innerHTML;
      this.innerHTML = '✓';
      this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        this.innerHTML = original;
        this.style.background = '';
      }, 1200);
    });
  });

  // ===== ESCAPE KEY HANDLER =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

});

// ===== PARTICLE ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  @keyframes particle-float {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.2; }
    100% { transform: translateY(-100px) translateX(${Math.random() * 60 - 30}px); opacity: 0; }
  }
`;
document.head.appendChild(style);
