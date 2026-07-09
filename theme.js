// Wenn diese Seite in einem Modal-iframe steckt: nur Inhalt zeigen (Kopf/Fuß aus)
try { if (window.self !== window.top) document.documentElement.classList.add('embed'); }
catch (e) { document.documentElement.classList.add('embed'); }

// Hell-/Dunkel-Modus für MikaTec — Start ist IMMER Dunkel. Umschalten auf Hell bleibt
// für die laufende Sitzung erhalten (auch über Seitenwechsel/Neuladen) via sessionStorage;
// bei einem Neustart (Tab/Browser neu geöffnet) beginnt es wieder dunkel.
(function () {
  var KEY = 'mt-theme';
  // Im Modal-iframe wird das Thema per URL-Hash mitgegeben (Maske soll zum Elternthema passen)
  var hash = (location.hash || '');
  var saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (hash.indexOf('mt=light') !== -1) document.documentElement.setAttribute('data-theme', 'light');
  else if (hash.indexOf('mt=dark') !== -1) document.documentElement.removeAttribute('data-theme');
  else if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
  // sonst: nichts setzen → Dunkelmodus als Start-Standard

  var SUN = '<svg class="ic" viewBox="0 0 24 24" width="17" height="17"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg class="ic" viewBox="0 0 24 24" width="17" height="17"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function isLight() { return document.documentElement.getAttribute('data-theme') === 'light'; }
  function icon() { return isLight() ? SUN : MOON; }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Hell-/Dunkelmodus umschalten');
    btn.title = 'Hell / Dunkel';
    btn.innerHTML = icon();
    // Interne Seiten-Links tragen das aktuelle Thema in der Adresse mit (#mt=light),
    // damit die Wahl über Seitenwechsel hält – auch wenn Safari den Speicher blockiert.
    function tagLinks() {
      var light = isLight();
      var as = document.getElementsByTagName('a');
      for (var i = 0; i < as.length; i++) {
        var href = as[i].getAttribute('href');
        if (!href) continue;
        if (/^(mailto:|tel:|https?:\/\/|#)/i.test(href)) continue; // extern/mail/tel/reiner Anker
        var base = href.replace(/#mt=(light|dark)$/i, '');
        as[i].setAttribute('href', light ? base + '#mt=light' : base);
      }
    }
    function setTheme(light) {
      if (light) document.documentElement.setAttribute('data-theme', 'light');
      else document.documentElement.removeAttribute('data-theme');
      try { sessionStorage.setItem(KEY, light ? 'light' : 'dark'); } catch (e) {}
      // aktuelle Adresse merkt die Wahl (überlebt Neuladen, ganz ohne Speicher)
      try { history.replaceState(null, '', location.pathname + location.search + (light ? '#mt=light' : '')); }
      catch (e) { try { location.hash = light ? 'mt=light' : ''; } catch (e2) {} }
      tagLinks();
      btn.innerHTML = icon();
    }
    btn.addEventListener('click', function () { setTheme(!isLight()); });
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
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      io.observe(el);
    });
  });
})();

// Knoten-Netz-Effekt in Tafeln — ein Renderloop für alle, weiche Glow-Punkte, feine Linien
(function () {
  function init() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hosts = Array.prototype.slice.call(document.querySelectorAll('.contact-box, .card.pillar, .step, .page-hero'));
    if (!hosts.length) return;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var LINK = 140, LINK2 = LINK * LINK, fields = [], raf = 0;

    hosts.forEach(function (host) {
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.style.overflow = 'hidden';
      var cv = document.createElement('canvas');
      cv.className = 'fx-net'; cv.setAttribute('aria-hidden', 'true');
      host.insertBefore(cv, host.firstChild);
      fields.push({ host: host, cv: cv, ctx: cv.getContext('2d'), pts: [], pulses: [], W: 0, H: 0, vis: true });
    });

    function sizeField(f) {
      var r = f.host.getBoundingClientRect();
      f.W = r.width; f.H = r.height;
      f.cv.width = Math.max(1, Math.round(f.W * DPR));
      f.cv.height = Math.max(1, Math.round(f.H * DPR));
      f.ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var n = Math.max(10, Math.min(60, Math.round((f.W * f.H) / 5400)));
      f.pts = [];
      for (var i = 0; i < n; i++) f.pts.push({
        x: Math.random() * f.W, y: Math.random() * f.H,
        vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
        r: Math.random() * 1.5 + .8, gold: Math.random() < .16
      });
      f.pulses = [];
    }
    function palette() {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      return light
        ? { line: '18,120,110', node: '18,120,110', gold: '150,110,35', glowT: 'rgba(42,163,156,.16)', glowG: 'rgba(160,125,36,.18)', pulse: '150,110,35', head: 'rgba(120,88,28,.98)', lineMax: .44 }
        : { line: '53,194,185', node: '130,205,200', gold: '227,193,120', glowT: 'rgba(90,190,182,.15)', glowG: 'rgba(227,193,120,.18)', pulse: '227,193,120', head: 'rgba(246,228,176,.95)', lineMax: .4 };
    }
    function renderField(f, P) {
      var ctx = f.ctx, pts = f.pts, i, j; ctx.clearRect(0, 0, f.W, f.H);
      for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) {
        var a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK2) { var o = (1 - Math.sqrt(d2) / LINK) * P.lineMax; if (o > 0) { ctx.strokeStyle = 'rgba(' + P.line + ',' + o + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      }
      for (var q = 0; q < f.pulses.length; q++) {
        var pu = f.pulses[q], A = pts[pu.a], B = pts[pu.b]; if (!A || !B) continue;
        var t = pu.t, t0 = t - 0.2; if (t0 < 0) t0 = 0;
        var hx = A.x + (B.x - A.x) * t, hy = A.y + (B.y - A.y) * t, sx = A.x + (B.x - A.x) * t0, sy = A.y + (B.y - A.y) * t0;
        var g = ctx.createLinearGradient(sx, sy, hx, hy); g.addColorStop(0, 'rgba(' + P.pulse + ',0)'); g.addColorStop(1, 'rgba(' + P.pulse + ',.5)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.beginPath(); ctx.arc(hx, hy, 2, 0, 6.2832); ctx.fillStyle = P.head; ctx.fill();
      }
      for (var k = 0; k < pts.length; k++) {
        var p = pts[k], gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.6);
        gl.addColorStop(0, p.gold ? P.glowG : P.glowT); gl.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4.6, 0, 6.2832); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fillStyle = 'rgba(' + (p.gold ? P.gold : P.node) + ',.9)'; ctx.fill();
      }
    }
    function stepField(f) {
      var pts = f.pts, k;
      for (var i = 0; i < pts.length; i++) { var p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > f.W) p.vx *= -1; if (p.y < 0 || p.y > f.H) p.vy *= -1; }
      for (var q = f.pulses.length - 1; q >= 0; q--) { f.pulses[q].t += f.pulses[q].sp; if (f.pulses[q].t > 1) f.pulses.splice(q, 1); }
      if (f.pulses.length < 2 && Math.random() < 0.011 && pts.length > 2) {
        var a = (Math.random() * pts.length) | 0, cand = [];
        for (k = 0; k < pts.length; k++) { if (k === a) continue; var dx = pts[k].x - pts[a].x, dy = pts[k].y - pts[a].y; if (dx * dx + dy * dy < LINK2) cand.push(k); }
        if (cand.length) f.pulses.push({ a: a, b: cand[(Math.random() * cand.length) | 0], t: 0, sp: 0.004 + Math.random() * 0.003 });
      }
    }
    function frame() { var P = palette(); for (var i = 0; i < fields.length; i++) { var f = fields[i]; if (!f.vis) continue; stepField(f); renderField(f, P); } raf = requestAnimationFrame(frame); }

    fields.forEach(sizeField);
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (es) { es.forEach(function (e) { for (var i = 0; i < fields.length; i++) if (fields[i].host === e.target) fields[i].vis = e.isIntersecting; }); }, { rootMargin: '140px' });
      fields.forEach(function (f) { vio.observe(f.host); });
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { DPR = Math.min(window.devicePixelRatio || 1, 2); fields.forEach(sizeField); }, 200); });
    if (reduce) { var P = palette(); fields.forEach(function (f) { renderField(f, P); }); } else frame();
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
          '<iframe class="legal-modal-frame" title="' + (label || 'Rechtliches') + '" src="' + clean + (document.documentElement.getAttribute('data-theme') === 'light' ? '#mt=light' : '#mt=dark') + '"></iframe>' +
        '</div>';
      document.body.appendChild(box);
      // Thema des Iframes an die Seite angleichen (sonst helle Schrift auf weißem Grund im Hellmodus)
      var frame = box.querySelector('.legal-modal-frame');
      function syncTheme() {
        try {
          var doc = frame.contentDocument;
          if (!doc) return;
          if (document.documentElement.getAttribute('data-theme') === 'light')
            doc.documentElement.setAttribute('data-theme', 'light');
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
