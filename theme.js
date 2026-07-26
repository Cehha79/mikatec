// Wenn diese Seite in einem Modal-iframe steckt: nur Inhalt zeigen (Kopf/Fuß aus)
try { if (window.self !== window.top) document.documentElement.classList.add('embed'); }
catch (e) { document.documentElement.classList.add('embed'); }

// Hell-/Dunkel-Modus für MikaTec — Start ist IMMER Hell. Umschalten auf Dunkel bleibt
// für die laufende Sitzung erhalten (auch über Seitenwechsel/Neuladen) via sessionStorage;
// bei einem Neustart (Tab/Browser neu geöffnet) beginnt es wieder hell.
(function () {
  var KEY = 'mt-theme';
  // Im Modal-iframe wird das Thema per URL-Hash mitgegeben (Maske soll zum Elternthema passen)
  var hash = (location.hash || '');
  var saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (hash.indexOf('mt=dark') !== -1) document.documentElement.setAttribute('data-theme', 'dark');
  else if (hash.indexOf('mt=light') !== -1) document.documentElement.removeAttribute('data-theme');
  else if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  // sonst: nichts setzen → Hellmodus als Start-Standard

  var SUN = '<svg class="ic" viewBox="0 0 24 24" width="17" height="17"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg class="ic" viewBox="0 0 24 24" width="17" height="17"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function icon() { return isDark() ? SUN : MOON; }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Hell-/Dunkelmodus umschalten');
    btn.title = 'Hell / Dunkel';
    btn.innerHTML = icon();
    // Interne Seiten-Links tragen das aktuelle Thema in der Adresse mit (#mt=dark),
    // damit die Wahl über Seitenwechsel hält – auch wenn Safari den Speicher blockiert.
    function tagLinks() {
      var dark = isDark();
      var as = document.getElementsByTagName('a');
      for (var i = 0; i < as.length; i++) {
        var href = as[i].getAttribute('href');
        if (!href) continue;
        if (/^(mailto:|tel:|https?:\/\/|#)/i.test(href)) continue; // extern/mail/tel/reiner Anker
        var base = href.replace(/#mt=(light|dark)$/i, '');
        as[i].setAttribute('href', dark ? base + '#mt=dark' : base);
      }
    }
    function setTheme(dark) {
      if (dark) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      try { sessionStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) {}
      // aktuelle Adresse merkt die Wahl (überlebt Neuladen, ganz ohne Speicher)
      try { history.replaceState(null, '', location.pathname + location.search + (dark ? '#mt=dark' : '')); }
      catch (e) { try { location.hash = dark ? 'mt=dark' : ''; } catch (e2) {} }
      tagLinks();
      btn.innerHTML = icon();
    }
    btn.addEventListener('click', function () { setTheme(!isDark()); });
    links.appendChild(btn);
    tagLinks();

    // Sanfte Einblend-Animation beim Scrollen
    var targets = document.querySelectorAll('.card, .step, .tl-item, .faq details');
    if (!('IntersectionObserver' in window) || !targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  });
})();

// Spotlight-Hover: Kartenrahmen leuchtet dezent an der Mausposition (Touch: ohne Wirkung)
(function () {
  function init() {
    var cards = document.querySelectorAll('.card, .pk');
    if (!cards.length || !window.matchMedia || !matchMedia('(hover: hover)').matches) return;
    cards.forEach(function (el) {
      el.classList.add('spot');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', (e.clientX - r.left) + 'px');
        el.style.setProperty('--spot-y', (e.clientY - r.top) + 'px');
        el.style.setProperty('--spot-o', 1);
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--spot-o', 0); });
    });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();

// Zahlen-Band: Werte zählen beim ersten Sichtbarwerden hoch (dezent, mit Ausklang)
(function () {
  function init() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fmt = new Intl.NumberFormat('de-DE');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.textContent = fmt.format(+el.getAttribute('data-count')); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = +el.getAttribute('data-count'), t0 = performance.now();
        function step(t) {
          var p = Math.min((t - t0) / 1100, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt.format(Math.round(end * e));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();

// Logo-Maske: Klick auf das Emblem öffnet es groß in hoher Auflösung
(function () {
  function init() {
    var mark = document.querySelector('.logo img.mark');
    if (!mark) return;
    var box = null;

    function open() {
      if (box) return;
      box = document.createElement('div');
      box.className = 'logo-mask';
      box.innerHTML =
        '<img src="logos/mikatec-mt-full.png" alt="MikaTec-Logo" class="logo-mask-img">' +
        '<button class="logo-mask-x" type="button" aria-label="Schließen">&times;</button>';
      document.body.appendChild(box);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { box.classList.add('an'); });
      box.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
    }
    function close() {
      if (!box) return;
      box.classList.remove('an');
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      var b = box; box = null;
      setTimeout(function () { if (b && b.parentNode) b.parentNode.removeChild(b); }, 220);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    mark.addEventListener('click', function (e) {
      e.preventDefault();      // nicht zur Startseite navigieren
      e.stopPropagation();
      open();
    });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();

// Rechtliches (Impressum/Datenschutz): Footer-Link öffnet Modal statt Seite.
// Ohne JS / bei fetch-Fehler bleibt der normale Link zur Seite als Fallback.
(function () {
  function init() {
    var links = document.querySelectorAll('footer a[href$="impressum.html"], footer a[href$="datenschutz.html"]');
    if (!links.length) return;
    var box = null;

    function close() {
      if (!box) return;
      box.classList.remove('an');
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      var b = box; box = null;
      setTimeout(function () { if (b && b.parentNode) b.parentNode.removeChild(b); }, 220);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    function open(href, label) {
      var clean = String(href).replace(/#mt=(light|dark)$/i, '');
      box = document.createElement('div');
      box.className = 'legal-modal';
      box.innerHTML =
        '<div class="legal-modal-box" role="dialog" aria-modal="true">' +
          '<button class="legal-modal-x" type="button" aria-label="Schließen">&times;</button>' +
          '<iframe class="legal-modal-frame" title="' + (label || 'Rechtliches') + '" src="' + clean + (document.documentElement.getAttribute('data-theme') === 'dark' ? '#mt=dark' : '#mt=light') + '"></iframe>' +
        '</div>';
      document.body.appendChild(box);
      // Thema des Iframes an die Seite angleichen (sonst falsche Farben im Dunkelmodus)
      var frame = box.querySelector('.legal-modal-frame');
      function syncTheme() {
        try {
          var doc = frame.contentDocument;
          if (!doc) return;
          if (document.documentElement.getAttribute('data-theme') === 'dark')
            doc.documentElement.setAttribute('data-theme', 'dark');
          else
            doc.documentElement.removeAttribute('data-theme');
        } catch (e) {}
      }
      frame.addEventListener('load', syncTheme);
      syncTheme();
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { box.classList.add('an'); });
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.legal-modal-x')) close();
      });
      document.addEventListener('keydown', onKey);
    }

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        open(a.getAttribute('href'), a.textContent);
      });
    });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
