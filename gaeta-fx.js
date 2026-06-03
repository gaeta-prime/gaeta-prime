/* ═══════════════════════════════════════════════════════
   GAETA Prime — Efeitos globais
   cursor cobre · barra de progresso de scroll
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

})();
