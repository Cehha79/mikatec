// Hell-/Dunkel-Modus für MikaTec — gespeicherte Wahl sofort anwenden (kein Flackern)
(function () {
  var KEY = 'mt-theme';
  var saved = localStorage.getItem(KEY);
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  function isLight() { return document.documentElement.getAttribute('data-theme') === 'light'; }
  function icon() { return isLight() ? '☀️' : '🌙'; }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Hell-/Dunkelmodus umschalten');
    btn.title = 'Hell / Dunkel';
    btn.textContent = icon();
    btn.addEventListener('click', function () {
      if (isLight()) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(KEY, 'light');
      }
      btn.textContent = icon();
    });
    links.appendChild(btn);

    // Sanfte Einblend-Animation beim Scrollen
    var targets = document.querySelectorAll('.card, .step, .tl-item, .factbar, .faq details');
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
