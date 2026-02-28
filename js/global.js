/* ==========================================
   Multietools — Global Scripts v3.0
   Navbar, Dark Mode, Animations
   ========================================== */

(function () {
  'use strict';

  /* ---------- Detect current page ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  const isHome = path === 'index.html' || path === 'home.html' || path === '';
  const isTools = path === 'tools.html';
  const isContact = path === 'contact.html';
  const isToolPage = !isHome && !isTools && !isContact;

  /* ---------- Dark Mode Management ---------- */
  function getTheme() {
    return localStorage.getItem('mt-theme') || 'light';
  }
  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mt-theme', theme);
    // Update all toggle icons
    document.querySelectorAll('.nav-theme-toggle i, #theme-toggle i').forEach(function(icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
  // Apply saved theme immediately (default: light)
  const savedTheme = getTheme();
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  /* ---------- Inject Navbar ---------- */
  function injectNavbar() {
    // Don't inject if a .global-nav already exists
    if (document.querySelector('.global-nav')) return;

    const activeClass = function(page) {
      if (page === 'home' && isHome) return ' active';
      if (page === 'tools' && isTools) return ' active';
      if (page === 'contact' && isContact) return ' active';
      return '';
    };

    const navHTML = '<nav class="global-nav" id="global-nav">' +
      '<div class="nav-inner">' +
        '<a class="nav-brand" href="index.html"><i class="fas fa-meteor"></i> Multietools</a>' +
        '<div class="nav-right">' +
          '<div class="nav-links" id="global-nav-links">' +
            '<a href="index.html" class="' + activeClass('home').trim() + '">Home</a>' +
            '<a href="tools.html" class="' + activeClass('tools').trim() + '">Tools</a>' +
            '<a href="contact.html" class="' + activeClass('contact').trim() + '">Contact</a>' +
          '</div>' +
          '<button class="nav-theme-toggle" id="global-theme-toggle" aria-label="Toggle dark mode">' +
            '<i class="fas ' + (getTheme() === 'dark' ? 'fa-sun' : 'fa-moon') + '"></i>' +
          '</button>' +
          '<button class="nav-mobile-btn" id="global-menu-btn" aria-label="Menu">' +
            '<i class="fas fa-bars"></i>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</nav>';

    // For tool pages, inject at top of body (before the .wrap/.shell/.container)
    if (isToolPage) {
      document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
  }

  /* ---------- Navbar Event Binding ---------- */
  function bindNavbar() {
    // Header shadow on scroll
    var nav = document.querySelector('.global-nav') || document.getElementById('header');
    if (nav) {
      window.addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', window.scrollY > 10);
      });
    }

    // Theme toggle
    document.querySelectorAll('.nav-theme-toggle, #theme-toggle, #global-theme-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var current = getTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    // Mobile menu
    var menuBtn = document.getElementById('global-menu-btn') || document.getElementById('menu-btn');
    var navLinks = document.getElementById('global-nav-links') || document.getElementById('nav');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', function() {
        var open = navLinks.classList.toggle('open');
        menuBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
      });
      navLinks.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
          navLinks.classList.remove('open');
          if (menuBtn) menuBtn.querySelector('i').className = 'fas fa-bars';
        });
      });
    }
  }

  /* ---------- Scroll-triggered Animations ---------- */
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  function initScrollAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      scrollObserver.observe(el);
    });
  }

  /* ---------- Page Enter Animation ---------- */
  function initPageEnter() {
    const main = document.querySelector('main, .wrap, .shell, .page-enter');
    if (main && !main.style.animation) {
      main.style.animation = 'fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1) both';
    }
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---------- Button Ripple Effect ---------- */
  function initRipple() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('button, .btn, .btn-gradient, .use-tool-btn');
      if (!btn) return;

      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      Object.assign(ripple.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.35)',
        transform: 'scale(0)',
        animation: 'ripple-expand 0.5s ease-out forwards',
        pointerEvents: 'none',
      });

      if (getComputedStyle(btn).position === 'static') {
        btn.style.position = 'relative';
      }
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });

    // Inject ripple keyframe if not present
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = '@keyframes ripple-expand{to{transform:scale(4);opacity:0;}}';
      document.head.appendChild(style);
    }
  }

  /* ---------- Initialise ---------- */
  function init() {
    applyTheme(getTheme());
    injectNavbar();
    bindNavbar();
    initScrollAnimations();
    initPageEnter();
    initSmoothScroll();
    initRipple();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
