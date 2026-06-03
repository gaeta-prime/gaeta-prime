/* ═══════════════════════════════════════════════════════
   GAETA Prime — Efeitos globais
   cursor cobre · barra de progresso · nav interna · stagger reveal · word reveal
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Cursor cobre ──────────────────────────────────────
  if (window.innerWidth >= 1024) {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;

      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
      });

      document.addEventListener('mousedown', () => dot.classList.add('click'));
      document.addEventListener('mouseup',   () => dot.classList.remove('click'));

      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(loop);
      })();

      document.querySelectorAll('a, button, [role=button], .cor-op, .storage-btn, .family-tab, .modelo-btn').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.classList.add('hover'); dot.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { ring.classList.remove('hover'); dot.classList.remove('hover'); });
      });
    }
  }

  // ── Barra de progresso de scroll ─────────────────────
  const bar = document.getElementById('scroll-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Nav interna: sombra sutil ao scrollar ─────────────
  const nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('dark')) {
    function updateNavInternal() {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 1px 0 rgba(0,0,0,.06)'
        : '';
    }
    window.addEventListener('scroll', updateNavInternal, { passive: true });
    updateNavInternal();
  }

  // ── Stagger reveal nos grids de produto ──────────────
  const cardGrids = document.querySelectorAll('.prod-grid, .family-grid, .outros-grid');
  if (cardGrids.length) {
    const gridIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cards = entry.target.querySelectorAll('.prod-card, .outro-card');
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = `opacity .55s cubic-bezier(0,0,.2,1) ${i * 0.07}s, transform .55s cubic-bezier(0,0,.2,1) ${i * 0.07}s`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        });
        gridIO.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    cardGrids.forEach(g => gridIO.observe(g));
  }

  // ── Word-by-word reveal (Apple-style) ─────────────────
  // phraseIO declarado antes para ser acessível em initGwPhrases
  const phraseIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const inners = entry.target.querySelectorAll('.gw-word-inner');
      inners.forEach((w, i) => {
        w.style.transitionDelay = `${i * 0.045}s`;
        w.classList.add('gw-word-inner--visible');
      });
      phraseIO.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  function buildGwPhrase(el) {
    if (el.classList.contains('gw-phrase--ready')) return;
    const text  = el.textContent;
    const words = text.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="gw-word"><span class="gw-word-inner">${w}</span></span>`
    ).join(' ');
    el.classList.add('gw-phrase--ready');
    phraseIO.observe(el);
  }

  // Init nas frases já presentes no DOM
  document.querySelectorAll('.gw-phrase').forEach(buildGwPhrase);

  // Exposto globalmente para páginas com conteúdo dinâmico (produto.html)
  window.initGwPhrases = function (root) {
    (root || document).querySelectorAll('.gw-phrase').forEach(buildGwPhrase);
  };

})();
