/* ============================================
   GAETA Prime — Interações Premium
   ============================================ */

// ─── NÚMERO WHATSAPP — altere APENAS aqui ───
// Formato: código do país + DDD + número (sem espaços ou símbolos)
// Exemplo: '5511912345678'
var GAETA_WPP = '5511999999999';

// ─── Reescreve todos os links wa.me da página ─
// Preserva ?text= existentes, substitui só o número
(function () {
  document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
    a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + GAETA_WPP);
  });
})();

// ─── HERO: texto palavra por palavra ────────
(function () {
  const el = document.getElementById('hero-title');
  if (!el) return;
  const text = 'O melhor da Apple. Ao seu alcance.';
  const words = text.split(' ');
  el.innerHTML = words.map((w, i) =>
    `<span class="word" style="animation-delay:${.6 + i * .08}s">${w}&nbsp;</span>`
  ).join('');
})();

// ─── NAV: scroll transition ──────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const isDark = nav.classList.contains('dark');
  function update() {
    if (!isDark) return;
    nav.classList.toggle('dark', window.scrollY < 80);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ─── REVEAL on scroll ───────────────────────
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

// ─── PARALLAX ───────────────────────────────
(function () {
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length || window.innerWidth < 768) return;

  function onScroll() {
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const rect  = el.parentElement?.getBoundingClientRect() || el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── CURSOR GLOW ────────────────────────────
(function () {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.innerWidth < 1024) { glow?.remove(); return; }

  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    cx += (mx - cx) * .08;
    cy += (my - cy) * .08;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

// ─── MAGNETIC BUTTONS ───────────────────────
(function () {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      btn.style.transform = `translate(${x * .18}px, ${y * .18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ─── FAMILY TABS (iphone.html) ───────────────
(function () {
  function switchFamily(id) {
    document.querySelectorAll('.family-section').forEach(s => s.classList.remove('ativo'));
    document.querySelectorAll('.family-tab').forEach(t => t.classList.remove('ativo'));
    const sec = document.getElementById(id);
    const tab = document.querySelector(`[data-family="${id}"]`);
    if (!sec) return;
    sec.classList.add('ativo');
    tab?.classList.add('ativo');
    // scroll tab into view
    tab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  document.querySelectorAll('.family-tab').forEach(btn => {
    btn.addEventListener('click', () => switchFamily(btn.dataset.family));
  });

  window.switchFamily = switchFamily;

  const params = new URLSearchParams(window.location.search);
  const fam = params.get('family');
  if (fam) switchFamily(fam);
})();

// ─── FILTROS catálogo ────────────────────────
(function () {
  const btns  = document.querySelectorAll('.filtro-btn');
  const cards = document.querySelectorAll('.prod-card[data-cat]');
  if (!btns.length) return;

  const params = new URLSearchParams(window.location.search);
  const catURL = params.get('cat') || 'todos';

  function filter(cat) {
    btns.forEach(b => b.classList.toggle('ativo', b.dataset.filtro === cat));
    cards.forEach(c => {
      const show = cat === 'todos' || c.dataset.cat === cat;
      c.style.display = show ? 'flex' : 'none';
    });
  }

  btns.forEach(btn => btn.addEventListener('click', () => filter(btn.dataset.filtro)));
  filter(catURL);
})();

// ─── GALERIA produto ─────────────────────────
(function () {
  const mainImg = document.querySelector('.prod-main-img');
  const thumbs  = document.querySelectorAll('.prod-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('ativo'));
      thumb.classList.add('ativo');
      mainImg.classList.add('fade');
      setTimeout(() => {
        mainImg.src = thumb.dataset.full || thumb.src;
        mainImg.classList.remove('fade');
      }, 200);
    });
  });
})();

// ─── SELETORES produto com WhatsApp dinâmico ──
(function () {
  function buildWppMsg() {
    const titulo   = document.querySelector('.prod-titulo')?.textContent.trim() || '';
    const corAtiva = document.querySelector('.cor-btn.ativo .cor-nome')?.textContent.trim() || '';
    const storAtivo = document.querySelector('.storage-btn.ativo')?.textContent.trim() || '';
    let msg = `Olá! Tenho interesse no ${titulo}`;
    if (corAtiva)  msg += ` na cor ${corAtiva}`;
    if (storAtivo) msg += `, ${storAtivo}`;
    msg += '. Pode me ajudar?';
    return encodeURIComponent(msg);
  }

  function updateWppLinks() {
    document.querySelectorAll('[href*="wa.me"]').forEach(a => {
      a.href = `https://wa.me/${GAETA_WPP}?text=${buildWppMsg()}`;
    });
  }

  // Modelos
  document.querySelectorAll('.modelo-card').forEach(card => {
    card.addEventListener('click', () => {
      card.closest('.modelo-cards')
          .querySelectorAll('.modelo-card')
          .forEach(c => c.classList.remove('ativo'));
      card.classList.add('ativo');
      const preco = card.dataset.preco;
      const el    = document.querySelector('.preco-val');
      if (preco && el) el.textContent = preco;
      updateWppLinks();
    });
  });

  // Cores
  document.querySelectorAll('.cor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.cor-grid')
         .querySelectorAll('.cor-btn')
         .forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      const img     = btn.dataset.img;
      const mainImg = document.querySelector('.prod-main-img');
      if (img && mainImg) {
        mainImg.classList.add('fade');
        setTimeout(() => { mainImg.src = img; mainImg.classList.remove('fade'); }, 200);
      }
      const label = document.querySelector('[data-cor-label]');
      if (label) label.textContent = btn.querySelector('.cor-nome')?.textContent || '';
      updateWppLinks();
    });
  });

  // Storage
  document.querySelectorAll('.storage-btn').forEach(btn => {
    // Bloquear visualmente os esgotados
    if (btn.dataset.esgotado === 'true') {
      btn.disabled = true;
      btn.style.opacity = '0.35';
      btn.style.cursor = 'not-allowed';
      btn.style.textDecoration = 'line-through';
      btn.title = 'Indisponível no momento';
    }

    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.closest('.storage-grid')
         .querySelectorAll('.storage-btn')
         .forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      const preco = btn.dataset.preco;
      const el    = document.querySelector('.preco-val');
      if (preco && el) el.textContent = preco;

      // Atualiza label de condição se existir
      const condicaoLabel = document.querySelector('[data-condicao-label]');
      if (condicaoLabel) {
        const label = btn.textContent.trim();
        if (label.includes('Vitrine')) condicaoLabel.textContent = 'VITRINE · SEMINOVO';
        else if (label.includes('Lacrado')) condicaoLabel.textContent = 'LACRADO · NOVO';
        else condicaoLabel.textContent = '';
      }

      updateWppLinks();
    });
  });

  // Seleciona automaticamente o primeiro storage disponível
  const primeiroDisponivel = document.querySelector('.storage-btn:not([disabled])');
  if (primeiroDisponivel) primeiroDisponivel.click();

  // Init na carga
  if (document.querySelector('.prod-titulo')) updateWppLinks();
})();

// ─── MOBILE NAV HAMBÚRGUER ───────────────────
(function () {
  const btn  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (!btn || !menu) return;

  function toggle() {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', toggle);

  // Fechar ao clicar em link
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fechar ao pressionar Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.classList.contains('open')) toggle();
  });
})();



// ─── COUNT-UP animado (sobre.html) ──────────
(function () {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1200;
      const step   = 16;
      let current  = 0;
      const inc    = target / (dur / step);
      const timer  = setInterval(() => {
        current = Math.min(current + inc, target);
        el.textContent = Math.round(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();

// ─── BUSCA em tempo real (colecao.html) ──────
(function () {
  const input   = document.getElementById('search-input');
  const counter = document.getElementById('search-count');
  if (!input) return;
  input.addEventListener('input', () => {
    const q     = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.prod-card[data-cat]');
    let visible = 0;
    cards.forEach(c => {
      const text = (c.dataset.nome || c.textContent).toLowerCase();
      const show = !q || text.includes(q);
      c.style.display = show ? 'flex' : 'none';
      if (show) visible++;
    });
    if (counter) counter.textContent = q ? `${visible} resultado${visible !== 1 ? 's' : ''}` : '';
  });
})();

// ─── FAQ animado ─────────────────────────────
(function () {
  document.querySelectorAll('details.faq-item').forEach(det => {
    det.addEventListener('toggle', () => {
      const body = det.querySelector('.faq-body');
      if (!body) return;
      if (det.open) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0';
      }
    });
    det.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); det.open = !det.open; }
    });
  });
})();

// ─── SMOOTH SECTION ENTER (scale + fade) ────
(function () {
  const sections = document.querySelectorAll('[data-scroll-section]');
  if (!sections.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const img = e.target.querySelector('.showcase-img');
      const txt = e.target.querySelector('.showcase-text');
      if (e.isIntersecting) {
        if (img) img.style.opacity = '1';
        if (txt) txt.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => {
    const img = s.querySelector('.showcase-img');
    if (img) img.style.opacity = '0';
    io.observe(s);
  });
  // transition on img
  document.querySelectorAll('.showcase-img').forEach(img => {
    img.style.transition = 'opacity .8s ease, transform .1s linear';
  });
})();
