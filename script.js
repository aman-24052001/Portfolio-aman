/* ═══════════════════════════════════════════════════════════
   Portfolio — Aman Kumar
   Vanilla JS — No jQuery, No Bootstrap, No external deps
═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────
   1. CURSOR GLOW (desktop only)
────────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ──────────────────────────────────────
   2. NAVBAR — scroll + active links
────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

function onScroll() {
  // Frosted glass on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 24);

  // Scroll-top button
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    scrollBtn.classList.toggle('visible', window.scrollY > 520);
  }

  // Active nav highlight
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 110) {
      current = sec.id;
    }
  });
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ──────────────────────────────────────
   3. MOBILE NAV TOGGLE
────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openNav()  {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  navOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeNav() : openNav();
});
navOverlay.addEventListener('click', closeNav);
navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));

/* ──────────────────────────────────────
   4. SCROLL-TOP BUTTON
────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ──────────────────────────────────────
   5. REVEAL ON SCROLL (IntersectionObserver)
────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
);

// Stagger siblings inside the same parent
document.querySelectorAll('.reveal').forEach((el) => {
  const parent   = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
  const idx      = siblings.indexOf(el);
  // Cap delay at 320ms so late items don't feel abandoned
  el.style.transitionDelay = Math.min(idx * 90, 320) + 'ms';
  revealObserver.observe(el);
});

/* ──────────────────────────────────────
   6. TYPED ANIMATION (vanilla)
────────────────────────────────────── */
const roles     = ['Machine Learning Engineer', 'AI & MLOps Engineer', 'Software Engineer'];
const typedEl   = document.getElementById('typedText');
let   roleIdx   = 0;
let   charIdx   = 0;
let   deleting  = false;

function runTyped() {
  if (!typedEl) return;

  const word = roles[roleIdx];

  if (deleting) {
    typedEl.textContent = word.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = word.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = deleting ? 38 : 72;

  if (!deleting && charIdx === word.length) {
    delay    = 2200;        // pause at end
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx  = (roleIdx + 1) % roles.length;
    delay    = 380;         // brief gap before next word
  }

  setTimeout(runTyped, delay);
}

runTyped();

/* ──────────────────────────────────────
   8. SMOOTH SCROLL for all anchor links
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
