// Hell-/Dunkel-Modus für MikaTec — gespeicherte Wahl sofort anwenden (kein Flackern)
(function () {
  var KEY = 'mt-theme';
  var saved = localStorage.getItem(KEY);
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

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
    btn.addEventListener('click', function () {
      if (isLight()) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(KEY, 'light');
      }
      btn.innerHTML = icon();
    });
    links.appendChild(btn);

    // Sanfte Einblend-Animation beim Scrollen
    var targets = document.querySelectorAll('.card, .step, .tl-item, .faq details, .case, .proj-list li, .hero-shot, .term');
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
