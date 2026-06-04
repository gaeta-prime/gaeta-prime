/* ═══════════════════════════════════════════════════════
   GAETA Prime — Search Modal (search.js)
   Busca premium via modal fullscreen — sem libs externas
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ─── Catálogo de produtos ─────────────────────────────
  const CATALOG = [
    {
      nome: 'iPhone 16 Pro Max',
      cat:  'iPhone',
      tags: 'iphone 16 pro max titanio a18 pro camera control zoom 5x lacrado',
      img:  'img/iphone-16-pro-max-titanio-deserto-1.webp',
      url:  'produto.html?id=iphone-16-pro-max',
    },
    {
      nome: 'iPhone 16 Pro',
      cat:  'iPhone',
      tags: 'iphone 16 pro titanio a18 pro camera control zoom 5x lacrado',
      img:  'img/iphone-16-pro-titanio-deserto-1.webp',
      url:  'produto.html?id=iphone-16-pro',
    },
    {
      nome: 'iPhone 16',
      cat:  'iPhone',
      tags: 'iphone 16 a18 camera control usb-c ultramarino lacrado',
      img:  'img/iphone-16-ultramarine-1.webp',
      url:  'produto.html?id=iphone-16',
    },
    {
      nome: 'iPhone 15',
      cat:  'iPhone',
      tags: 'iphone 15 dynamic island usb-c a16 vitrine',
      img:  null,
      url:  'produto.html?id=iphone-15',
    },
    {
      nome: 'iPhone 14 Pro',
      cat:  'iPhone',
      tags: 'iphone 14 pro always on display a16 bionic vitrine',
      img:  null,
      url:  'produto.html?id=iphone-14-pro',
    },
    {
      nome: 'MacBook Air 13" M3',
      cat:  'Mac',
      tags: 'macbook air 13 m3 meia-noite liquid retina notebook mac lacrado',
      img:  null,
      url:  'produto.html?id=macbook-air-m3',
    },
    {
      nome: 'MacBook Pro 14" M4',
      cat:  'Mac',
      tags: 'macbook pro 14 m4 preto espacial liquid retina xdr notebook mac lacrado',
      img:  null,
      url:  'produto.html?id=macbook-pro-m4',
    },
    {
      nome: 'Mac mini M4',
      cat:  'Mac',
      tags: 'mac mini m4 thunderbolt desktop lacrado',
      img:  null,
      url:  'produto.html?id=mac-mini-m4',
    },
    {
      nome: 'iPad Pro 13" M4',
      cat:  'iPad',
      tags: 'ipad pro 13 m4 oled ultra retina xdr cinza espacial lacrado',
      img:  'img/ipad-1.webp',
      url:  'produto.html?id=ipad-pro-m4',
    },
    {
      nome: 'iPad Air 11" M2',
      cat:  'iPad',
      tags: 'ipad air 11 m2 liquid retina azul vitrine',
      img:  'img/ipad-2.webp',
      url:  'produto.html?id=ipad-air-m2',
    },
    {
      nome: 'AirPods Pro 2',
      cat:  'AirPods',
      tags: 'airpods pro 2 cancelamento ruido h2 usb-c lacrado',
      img:  null,
      url:  'produto.html?id=airpods-pro',
    },
    {
      nome: 'Apple Watch Ultra 2',
      cat:  'Watch',
      tags: 'apple watch ultra 2 titanio alpine gps cellular lacrado',
      img:  null,
      url:  'produto.html?id=apple-watch-ultra2',
    },
  ];

  // ─── Sugestões rápidas ────────────────────────────────
  const SUGGESTIONS = ['iPhone', 'MacBook', 'iPad', 'AirPods', 'Watch', 'Pro Max'];

  // ─── SVG ─────────────────────────────────────────────
  const SVG_LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>';

  const SVG_APPLE = '<svg viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4C46 790.9 0 663.8 0 541.9 0 333.8 128.8 222.4 250.5 222.4c70.8 0 130.6 46.3 174.5 46.3 42.7 0 109.6-49.8 190.5-49.8 30.3 0 108.2 2.6 168.1 69.7zm-126.5-89.6c-6.4 35.8-19.5 71-39 100.2-22.3 31.7-65.1 57.1-102.2 57.1-4.5 0-9-.6-13.6-1.3-1.3-35.8 9-73.5 29.5-104.9 23.6-36.5 71.2-64.7 125.3-51.1z"/></svg>';

  // ─── CSS ─────────────────────────────────────────────
  const CSS = `
    .gs-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px;
      background: none; border: none; cursor: pointer;
      padding: 4px; flex-shrink: 0;
      color: rgba(255,255,255,.65);
      transition: color .2s;
    }
    .gs-btn:hover { color: #fff; }
    .gs-btn svg { width: 16px; height: 16px; display: block; pointer-events: none; }
    .gs-btn.gs-light       { color: var(--grafite, #1A1A18); }
    .gs-btn.gs-light:hover { color: var(--cobre,   #B8955A); }

    #gs-modal {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(15,15,15,.96);
      backdrop-filter: saturate(160%) blur(28px);
      -webkit-backdrop-filter: saturate(160%) blur(28px);
      display: flex; flex-direction: column; align-items: center;
      padding: 0 24px;
      opacity: 0; pointer-events: none;
      transform: translateY(-14px);
      transition: opacity .26s cubic-bezier(.4,0,.2,1),
                  transform .26s cubic-bezier(.4,0,.2,1);
    }
    #gs-modal.open { opacity: 1; pointer-events: all; transform: translateY(0); }

    .gs-bar {
      width: 100%; max-width: 700px;
      display: flex; align-items: center; gap: 16px;
      padding: 28px 0 20px;
      border-bottom: 0.5px solid rgba(255,255,255,.08);
    }

    .gs-input {
      flex: 1; background: none; border: none; outline: none;
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(22px, 4vw, 32px);
      font-weight: 300; color: #fff;
      letter-spacing: -.5px;
      caret-color: #B8955A;
    }
    .gs-input::placeholder { color: rgba(255,255,255,.2); }

    .gs-close {
      display: flex; align-items: center; justify-content: center;
      min-width: 36px; width: 36px; height: 36px;
      background: rgba(255,255,255,.06);
      border: 0.5px solid rgba(255,255,255,.1);
      border-radius: 50%; cursor: pointer;
      color: rgba(255,255,255,.6);
      font-size: 16px; line-height: 1; font-family: sans-serif;
      transition: background .2s, color .2s;
    }
    .gs-close:hover { background: rgba(255,255,255,.14); color: #fff; }

    .gs-results {
      width: 100%; max-width: 700px;
      flex: 1; overflow-y: auto;
      padding: 8px 0 40px;
    }
    .gs-results::-webkit-scrollbar { width: 0; }

    .gs-empty {
      padding: 48px 0;
      font-size: 11px; letter-spacing: 3px;
      color: rgba(255,255,255,.2);
      text-align: center;
      font-family: 'DM Sans', sans-serif;
    }

    .gs-suggestions { display: flex; flex-wrap: wrap; gap: 10px; padding: 28px 0 0; }
    .gs-suggestion {
      font-size: 11px; letter-spacing: 1px;
      color: rgba(255,255,255,.35);
      padding: 7px 16px;
      border: 0.5px solid rgba(255,255,255,.1);
      border-radius: 999px; cursor: pointer;
      background: none; font-family: 'DM Sans', sans-serif;
      transition: color .2s, border-color .2s;
    }
    .gs-suggestion:hover { color: rgba(255,255,255,.8); border-color: rgba(255,255,255,.28); }

    .gs-item {
      display: flex; align-items: center; gap: 18px;
      padding: 14px 0;
      border-bottom: 0.5px solid rgba(255,255,255,.05);
      text-decoration: none;
    }
    .gs-item:last-child { border-bottom: none; }

    .gs-thumb {
      width: 56px; height: 56px; min-width: 56px;
      border-radius: 6px;
      background: rgba(255,255,255,.04);
      border: 0.5px solid rgba(255,255,255,.07);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .gs-thumb img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .gs-thumb svg { width: 22px; height: 22px; color: rgba(255,255,255,.12); }

    .gs-item-text { flex: 1; min-width: 0; }
    .gs-item-nome {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; font-weight: 300;
      color: rgba(255,255,255,.9); letter-spacing: -.3px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      transition: color .15s;
    }
    .gs-item:hover .gs-item-nome { color: #B8955A; }
    .gs-item-cat {
      font-size: 10px; letter-spacing: 2px;
      color: rgba(255,255,255,.25); margin-top: 4px;
      font-family: 'DM Sans', sans-serif;
    }

    .gs-arrow {
      color: rgba(255,255,255,.18); font-size: 15px; flex-shrink: 0;
      transition: color .15s, transform .15s;
    }
    .gs-item:hover .gs-arrow { color: #B8955A; transform: translateX(4px); }

    @media (max-width: 768px) {
      #gs-modal { padding: 0 20px; }
      .gs-bar   { padding: 20px 0 16px; }
      .gs-input { font-size: 24px; }
    }
  `;

  // ─── Helpers ─────────────────────────────────────────
  function suggestionsHTML() {
    return '<div class="gs-suggestions">' +
      SUGGESTIONS.map(s => `<button class="gs-suggestion">${s}</button>`).join('') +
    '</div>';
  }

  function thumbHTML(p) {
    return p.img
      ? `<div class="gs-thumb"><img src="${p.img}" alt="${p.nome}" loading="lazy"></div>`
      : `<div class="gs-thumb">${SVG_APPLE}</div>`;
  }

  // ─── Busca ───────────────────────────────────────────
  function doSearch(query) {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return CATALOG.filter(p => {
      const hay = `${p.nome} ${p.cat} ${p.tags}`.toLowerCase();
      return terms.every(t => hay.includes(t));
    });
  }

  // ─── Render ──────────────────────────────────────────
  function renderResults(items) {
    const el = document.getElementById('gs-results');
    if (!items.length) {
      el.innerHTML = '<p class="gs-empty">NENHUM RESULTADO</p>';
      return;
    }
    el.innerHTML = items.map(p => `
      <a class="gs-item" href="${p.url}">
        ${thumbHTML(p)}
        <div class="gs-item-text">
          <div class="gs-item-nome">${p.nome}</div>
          <div class="gs-item-cat">${p.cat.toUpperCase()}</div>
        </div>
        <span class="gs-arrow">&#8594;</span>
      </a>`).join('');
  }

  function renderSuggestions() {
    document.getElementById('gs-results').innerHTML = suggestionsHTML();
    bindSuggestions();
  }

  // ─── Open / Close ────────────────────────────────────
  function openModal() {
    document.getElementById('gs-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.getElementById('gs-input').focus()
      )
    );
  }

  function closeModal() {
    document.getElementById('gs-modal').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('gs-input').value = '';
    renderSuggestions();
  }

  // ─── Sugestões ───────────────────────────────────────
  function bindSuggestions() {
    document.querySelectorAll('.gs-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('gs-input');
        input.value = btn.textContent;
        renderResults(doSearch(btn.textContent));
        input.focus();
      });
    });
  }

  // ─── Injeção ─────────────────────────────────────────
  function injectCSS() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function injectButton() {
    const hamburger = document.getElementById('nav-hamburger');
    if (!hamburger) return;

    const isLightNav = Array.from(document.styleSheets).some(ss => {
      try { return ss.href && ss.href.includes('style.css'); }
      catch (_) { return false; }
    });

    const btn = document.createElement('button');
    btn.id        = 'gs-btn';
    btn.className = isLightNav ? 'gs-btn gs-light' : 'gs-btn';
    btn.setAttribute('aria-label', 'Buscar');
    btn.innerHTML = SVG_LUPA;
    hamburger.parentNode.insertBefore(btn, hamburger);
  }

  function injectModal() {
    const modal = document.createElement('div');
    modal.id = 'gs-modal';
    modal.setAttribute('role',       'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Buscar produtos Gaeta Prime');
    modal.innerHTML =
      '<div class="gs-bar">' +
        '<input class="gs-input" id="gs-input" type="search"' +
        ' placeholder="Buscar produtos..."' +
        ' autocomplete="off" autocorrect="off" spellcheck="false">' +
        '<button class="gs-close" id="gs-close" aria-label="Fechar busca">&#x2715;</button>' +
      '</div>' +
      `<div class="gs-results" id="gs-results">${suggestionsHTML()}</div>`;
    document.body.appendChild(modal);
  }

  // ─── Eventos ─────────────────────────────────────────
  function bindEvents() {
    document.getElementById('gs-btn').addEventListener('click', openModal);
    document.getElementById('gs-close').addEventListener('click', closeModal);

    document.getElementById('gs-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('gs-modal')) closeModal();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('gs-modal');
        if (modal && modal.classList.contains('open')) closeModal();
      }
    });

    document.getElementById('gs-input').addEventListener('input', function () {
      if (!this.value.trim()) { renderSuggestions(); return; }
      renderResults(doSearch(this.value));
    });

    bindSuggestions();
  }

  // ─── Init ────────────────────────────────────────────
  function init() {
    injectCSS();
    injectButton();
    injectModal();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
