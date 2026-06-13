/* ═══════════ AMAN KUMAR — PORTFOLIO JS ═══════════ */

// ── Mobile nav ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function closeNav() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('show');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  navOverlay.classList.toggle('show');
});

navOverlay.addEventListener('click', closeNav);
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ── Scroll reveal (respects reduced motion) ──
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReduced || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const y = window.scrollY + 120;
  let currentId = 'home';
  sections.forEach(sec => {
    if (sec.offsetTop <= y) currentId = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

// ── Scroll-top button ──
const scrollTopBtn = document.getElementById('scrollTop');

function onScroll() {
  scrollTopBtn.classList.toggle('show', window.scrollY > 600);
  setActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
});
