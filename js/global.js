/* ==========================================
   Multietools — Global Scripts v3.0
   Navbar, Dark Mode, Animations
   ========================================== */

(function () {
  'use strict';

  /* ---------- Detect current page ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  const is404 = path === '404.html';
  const isHome = path === 'index.html' || path === 'home.html' || path === '';
  const isTools = path === 'tools.html';
  const isContact = path === 'contact.html';
  const isToolPage = !isHome && !isTools && !isContact && !is404;

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

  /* ---------- Skip-to-Content Link (Accessibility) ---------- */
  function injectSkipLink() {
    var main = document.querySelector('main, .wrap, .shell');
    if (!main) return;
    if (!main.id) main.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + main.id;
    skip.textContent = 'Skip to content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* ---------- Share Button for Tool Pages ---------- */
  function injectShareButton() {
    if (!isToolPage) return;
    var header = document.querySelector('header');
    if (!header) return;

    var btn = document.createElement('button');
    btn.className = 'share-tool-btn';
    btn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    btn.setAttribute('aria-label', 'Share this tool');

    btn.addEventListener('click', function () {
      var shareData = { title: document.title, url: location.href };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else {
        // Fallback: copy link
        navigator.clipboard.writeText(location.href).then(function () {
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(function () {
            btn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
          }, 2000);
        });
      }
    });

    header.appendChild(btn);
  }

  /* ---------- Recent Tools Tracker ---------- */
  function trackRecentTool() {
    if (!isToolPage) return;
    var title = document.title.replace(' - Multietools', '').trim();
    var recent = JSON.parse(localStorage.getItem('mt-recent-tools') || '[]');
    // Remove duplicate if exists
    recent = recent.filter(function(t) { return t.href !== path; });
    // Add to front
    recent.unshift({ href: path, title: title });
    // Keep only last 6
    if (recent.length > 6) recent = recent.slice(0, 6);
    localStorage.setItem('mt-recent-tools', JSON.stringify(recent));
  }

  function injectRecentTools() {
    if (!isTools) return;
    var recent = JSON.parse(localStorage.getItem('mt-recent-tools') || '[]');
    if (recent.length === 0) return;

    var searchSection = document.querySelector('.search-section, .tools-search, #tools-search');
    var insertTarget = searchSection || document.querySelector('main, .page');
    if (!insertTarget) return;

    var div = document.createElement('div');
    div.className = 'recent-tools-bar';
    div.innerHTML = '<span class="recent-label"><i class="fas fa-clock"></i> Recent</span>';
    recent.forEach(function(t) {
      var a = document.createElement('a');
      a.href = t.href;
      a.className = 'recent-chip';
      a.textContent = t.title;
      div.appendChild(a);
    });

    if (searchSection && searchSection.nextSibling) {
      searchSection.parentNode.insertBefore(div, searchSection.nextSibling);
    } else if (insertTarget.firstChild) {
      insertTarget.insertBefore(div, insertTarget.firstChild);
    }
  }

  /* ---------- Breadcrumb Navigation ---------- */
  function injectBreadcrumb() {
    if (!isToolPage) return;
    var title = document.title.replace(' - Multietools', '').replace(' | Multietools', '').trim();
    var header = document.querySelector('header');
    if (!header) return;
    var bc = document.createElement('div');
    bc.className = 'breadcrumb';
    bc.setAttribute('aria-label', 'Breadcrumb');
    bc.innerHTML =
      '<a href="index.html">Home</a>' +
      '<span class="sep"><i class="fas fa-chevron-right"></i></span>' +
      '<a href="tools.html">Tools</a>' +
      '<span class="sep"><i class="fas fa-chevron-right"></i></span>' +
      '<span class="current">' + title + '</span>';
    header.parentNode.insertBefore(bc, header.nextSibling);
  }

  /* ---------- Tool Rating / Feedback ---------- */
  function injectFeedback() {
    if (!isToolPage) return;
    var wrap = document.querySelector('.wrap, .shell, .container, main');
    if (!wrap) return;
    var key = 'mt-feedback-' + path;
    var existing = localStorage.getItem(key);

    var div = document.createElement('div');
    div.className = 'tool-feedback';
    div.innerHTML =
      '<span>Was this tool helpful?</span>' +
      '<button class="feedback-btn" data-vote="up"><i class="fas fa-thumbs-up"></i> Yes</button>' +
      '<button class="feedback-btn" data-vote="down"><i class="fas fa-thumbs-down"></i> No</button>' +
      '<span class="feedback-msg">Thanks for your feedback!</span>';
    wrap.appendChild(div);

    if (existing) {
      div.querySelector('[data-vote="' + existing + '"]').classList.add('active');
      div.querySelector('.feedback-msg').classList.add('show');
    }

    div.querySelectorAll('.feedback-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        div.querySelectorAll('.feedback-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        localStorage.setItem(key, btn.dataset.vote);
        div.querySelector('.feedback-msg').classList.add('show');
        showToast('Thanks for your feedback!', 'success');
      });
    });
  }

  /* ---------- Related Tools ---------- */
  var toolsMap = [
    { name: 'Image Converter', href: 'image-converter.html', icon: 'fa-exchange-alt', cat: 'image' },
    { name: 'Image Compressor', href: 'image-compressor.html', icon: 'fa-compress-arrows-alt', cat: 'image' },
    { name: 'Image Resizer', href: 'image-resizer.html', icon: 'fa-expand-arrows-alt', cat: 'image' },
    { name: 'Image Cropper', href: 'image-cropper.html', icon: 'fa-crop-alt', cat: 'image' },
    { name: 'Image Rotator', href: 'image-rotator-tool.html', icon: 'fa-sync-alt', cat: 'image' },
    { name: 'Image Color Picker', href: 'image-color-picker.html', icon: 'fa-eye-dropper', cat: 'image' },
    { name: 'Image OCR', href: 'image-ocr-tool.html', icon: 'fa-font', cat: 'image' },
    { name: 'Color Picker', href: 'color-picker.html', icon: 'fa-palette', cat: 'color' },
    { name: 'Hex ↔ RGB', href: 'hex-rgb.html', icon: 'fa-hashtag', cat: 'color' },
    { name: 'Gradient Generator', href: 'gradient-generator.html', icon: 'fa-fill-drip', cat: 'color' },
    { name: 'Palette Generator', href: 'palette-generator.html', icon: 'fa-swatchbook', cat: 'color' },
    { name: 'Contrast Checker', href: 'contrast-checker.html', icon: 'fa-adjust', cat: 'color' },
    { name: 'Color Extractor', href: 'color-extractor.html', icon: 'fa-eye-dropper', cat: 'color' },
    { name: 'Blindness Simulator', href: 'blindness-simulator.html', icon: 'fa-low-vision', cat: 'color' },
    { name: 'PDF Merger/Splitter', href: 'pdf-merger-splitter.html', icon: 'fa-file-pdf', cat: 'pdf' },
    { name: 'PDF Compressor', href: 'pdf-compressor-tool.html', icon: 'fa-file-archive', cat: 'pdf' },
    { name: 'PDF Lock/Unlock', href: 'pdf-lock-unlock.html', icon: 'fa-lock', cat: 'pdf' },
    { name: 'PDF to Word', href: 'pdf-to-word.html', icon: 'fa-file-word', cat: 'pdf' },
    { name: 'PDF Converter', href: 'pdf-converter-tool.html', icon: 'fa-file-export', cat: 'pdf' },
    { name: 'eSign PDF', href: 'esign-pdf.html', icon: 'fa-signature', cat: 'pdf' },
    { name: 'Word Counter', href: 'word-counter.html', icon: 'fa-spell-check', cat: 'text' },
    { name: 'Case Converter', href: 'case-converter.html', icon: 'fa-font', cat: 'text' },
    { name: 'Lorem Ipsum', href: 'lorem-ipsum-generator.html', icon: 'fa-paragraph', cat: 'text' },
    { name: 'Text Reverser', href: 'text-reverser.html', icon: 'fa-undo', cat: 'text' },
    { name: 'Remove Duplicate', href: 'remove-duplicate.html', icon: 'fa-clone', cat: 'text' },
    { name: 'Keyword Density', href: 'keyword-density-checker.html', icon: 'fa-key', cat: 'text' },
    { name: 'Text Shorter', href: 'text-shorter.html', icon: 'fa-compress-alt', cat: 'text' },
    { name: 'Markdown to HTML', href: 'markdown-to-html.html', icon: 'fa-code', cat: 'dev' },
    { name: 'JSON Formatter', href: 'JSON-Formatter.html', icon: 'fa-brackets-curly', cat: 'dev' },
    { name: 'Regex Tester', href: 'regex-tester.html', icon: 'fa-asterisk', cat: 'dev' },
    { name: 'Minifier', href: 'Minifier.html', icon: 'fa-compress', cat: 'dev' },
    { name: 'Base Encoder', href: 'Base-Encoder.html', icon: 'fa-lock', cat: 'dev' },
    { name: 'CSV ↔ JSON', href: 'csv-json-converter.html', icon: 'fa-table', cat: 'dev' },
    { name: 'Hash Generator', href: 'hash-generator.html', icon: 'fa-fingerprint', cat: 'dev' },
    { name: 'URL Encoder', href: 'url-encoder.html', icon: 'fa-link', cat: 'dev' },
    { name: 'UUID Generator', href: 'uuid-generator.html', icon: 'fa-id-badge', cat: 'dev' },
    { name: 'Encryptor/Decryptor', href: 'Encryptor-Decryptor.html', icon: 'fa-shield-alt', cat: 'dev' },
    { name: 'Meta Tag Analyzer', href: 'meta-tag-analyzer.html', icon: 'fa-tags', cat: 'dev' },
    { name: 'Password Generator', href: 'password-generator.html', icon: 'fa-key', cat: 'security' },
    { name: 'QR Generator', href: 'qr-barcode-generator.html', icon: 'fa-qrcode', cat: 'utility' },
    { name: 'QR Scanner', href: 'qr-scanner.html', icon: 'fa-camera', cat: 'utility' },
    { name: 'Barcode Scanner', href: 'barcode-scanner.html', icon: 'fa-barcode', cat: 'utility' },
    { name: 'Screenshot Tool', href: 'screenshot-tool.html', icon: 'fa-desktop', cat: 'utility' },
    { name: 'Binary Converter', href: 'binary-converter.html', icon: 'fa-microchip', cat: 'converter' },
    { name: 'Currency Converter', href: 'currency-converter.html', icon: 'fa-dollar-sign', cat: 'converter' },
    { name: 'Unit Converter', href: 'unit-converter.html', icon: 'fa-ruler', cat: 'converter' },
    { name: 'Time Zone Converter', href: 'time-zone-converter.html', icon: 'fa-globe', cat: 'converter' },
    { name: 'Scientific Calculator', href: 'scientific-calculator.html', icon: 'fa-calculator', cat: 'calc' },
    { name: 'BMI Calculator', href: 'bmi-calculator.html', icon: 'fa-weight', cat: 'calc' },
    { name: 'Age Calculator', href: 'age-calculator.html', icon: 'fa-birthday-cake', cat: 'calc' },
    { name: 'Percentage Calculator', href: 'percentage-calculator.html', icon: 'fa-percent', cat: 'calc' },
    { name: 'Loan EMI Calculator', href: 'loan-emi-calculator.html', icon: 'fa-hand-holding-usd', cat: 'calc' },
    { name: 'GST Calculator', href: 'gst-calculator.html', icon: 'fa-receipt', cat: 'calc' },
    { name: 'Stopwatch & Timer', href: 'stopwatch-timer.html', icon: 'fa-stopwatch', cat: 'utility' },
    { name: 'IP Lookup', href: 'ip-lookup.html', icon: 'fa-map-marker-alt', cat: 'utility' },
    { name: 'Text to Speech', href: 'text-to-speech.html', icon: 'fa-volume-up', cat: 'ai' },
    { name: 'Speech to Text', href: 'speech-to-text.html', icon: 'fa-microphone', cat: 'ai' }
  ];

  function injectRelatedTools() {
    if (!isToolPage) return;
    var current = toolsMap.find(function(t) { return t.href === path; });
    if (!current) return;
    var sameCat = toolsMap.filter(function(t) { return t.cat === current.cat && t.href !== path; });
    // If fewer than 4 same-category, fill from other categories
    var others = toolsMap.filter(function(t) { return t.cat !== current.cat; });
    // Shuffle both
    sameCat.sort(function() { return 0.5 - Math.random(); });
    others.sort(function() { return 0.5 - Math.random(); });
    var picks = sameCat.slice(0, 4);
    if (picks.length < 4) picks = picks.concat(others.slice(0, 4 - picks.length));

    var wrap = document.querySelector('.wrap, .shell, .container, main');
    if (!wrap) return;
    var sec = document.createElement('div');
    sec.className = 'related-tools';
    var html = '<h3><i class="fas fa-th-large"></i>&nbsp; You May Also Like</h3><div class="related-grid">';
    picks.forEach(function(t) {
      html += '<a href="' + t.href + '" class="related-card"><i class="fas ' + t.icon + '"></i> ' + t.name + '</a>';
    });
    html += '</div>';
    sec.innerHTML = html;
    wrap.appendChild(sec);
  }

  /* ---------- Back to Top (Global) ---------- */
  function injectBackToTop() {
    // Skip on contact page and pages with their own scroll-top
    if (isContact || document.querySelector('.scroll-top')) return;
    var btn = document.createElement('button');
    btn.className = 'global-back-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
      btn.classList.toggle('show', window.scrollY > 400);
    });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Keyboard Shortcuts ---------- */
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ctrl+K or Cmd+K → Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        var search = document.getElementById('tool-search');
        if (search) { e.preventDefault(); search.focus(); search.select(); }
      }
      // Esc → Clear & blur search
      if (e.key === 'Escape') {
        var search = document.getElementById('tool-search');
        if (search && document.activeElement === search) {
          search.value = '';
          search.dispatchEvent(new Event('input'));
          search.blur();
        }
      }
    });
  }

  /* ---------- Dynamic Tool Count Badge ---------- */
  function injectToolCount() {
    if (!isTools) return;
    var cards = document.querySelectorAll('.tool-card');
    var heroP = document.querySelector('.hero p');
    if (heroP && cards.length) {
      heroP.textContent = cards.length + '+ free tools — convert, calculate, compress, and simplify your everyday tasks.';
    }
  }

  /* ---------- Toast Notification System ---------- */
  var toastContainer;
  function showToast(msg, type, duration) {
    type = type || '';
    duration = duration || 3000;
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    var t = document.createElement('div');
    t.className = 'toast' + (type ? ' ' + type : '');
    t.textContent = msg;
    toastContainer.appendChild(t);
    setTimeout(function() {
      t.classList.add('out');
      t.addEventListener('animationend', function() { t.remove(); });
    }, duration);
  }
  // Expose globally so individual tools can use it
  window.showToast = showToast;

  /* ---------- Cookie Consent Banner ---------- */
  function injectCookieBanner() {
    if (localStorage.getItem('mt-cookie-consent')) return;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p><i class="fas fa-cookie-bite"></i>&nbsp; We use localStorage to save your preferences (theme, recent tools). No tracking cookies.</p>' +
      '<button class="cookie-accept">Got it</button>';
    document.body.appendChild(banner);
    banner.querySelector('.cookie-accept').addEventListener('click', function() {
      localStorage.setItem('mt-cookie-consent', '1');
      banner.style.animation = 'toastOut 0.3s ease forwards';
      banner.addEventListener('animationend', function() { banner.remove(); });
    });
  }

  /* ---------- Initialise ---------- */
  function init() {
    applyTheme(getTheme());
    injectSkipLink();
    injectNavbar();
    bindNavbar();
    injectShareButton();
    injectBreadcrumb();
    trackRecentTool();
    injectRecentTools();
    injectToolCount();
    injectFeedback();
    injectRelatedTools();
    injectBackToTop();
    initKeyboardShortcuts();
    injectCookieBanner();
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
