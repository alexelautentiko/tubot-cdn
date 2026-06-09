/* ============================================================
   TUBOT landing — interacciones
   ============================================================ */
(function () {
  'use strict';

  const ticks = '<span class="tick">✓✓</span>';

  /* ---------- Datos de conversación ---------- */
  const CHATS = {
    clientes: {
      name: 'Lara Fernández',
      avatar: 'woman',
      messages: [
        { kind: 'in', text: 'Hola, ¿podéis hacerme un presupuesto?', time: '22:47' },
        { kind: 'in', photo: 'baño a reformar', img: 'https://alexelautentiko.github.io/tubot-cdn/assets/bano-reformar.webp', time: '22:47' },
        { kind: 'out', text: 'Claro. Por la foto, te queda entre 2.400 y 3.200&euro; según acabados. ¿Te agendo visita gratuita esta semana?', time: '22:48', tick: true },
        { kind: 'in', text: 'Sí, el jueves por la tarde si puede ser', time: '22:49' },
        { kind: 'out', text: 'Hecho: jueves a las 17:30. Te aviso 30 min antes', time: '22:49', tick: true }
      ]
    }
  };

  /* ---------- Avatares humanos (ilustración plana) ---------- */
  const AVATARS = {
    woman: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#3B2C57"/><path d="M7 40c0-7.2 5.8-12 13-12s13 4.8 13 12z" fill="#E5179B"/><path d="M16.5 25h7v5h-7z" fill="#E6A877"/><circle cx="20" cy="17.5" r="8.2" fill="#F3C49B"/><path d="M11.4 18.5C11 12 15 8 20 8s9 4 8.6 10.5c-.2-3-1.4-4.8-1.4-4.8-2 1.3-9.5 2.4-13 .2 0 0-1.2 1.6-1.8 4.6z" fill="#2A1E16"/><path d="M11.8 16c-1.2 4.5-1 9.4.2 13.8l3.2-1c-1.1-4-1.2-7.8-.4-11.6z" fill="#2A1E16"/><path d="M28.2 16c1.2 4.5 1 9.4-.2 13.8l-3.2-1c1.1-4 1.2-7.8.4-11.6z" fill="#2A1E16"/><circle cx="17" cy="18" r="1" fill="#2A2A2A"/><circle cx="23" cy="18" r="1" fill="#2A2A2A"/><path d="M17.5 21.2c1.5 1.3 3.5 1.3 5 0" stroke="#C2725A" stroke-width="1.1" stroke-linecap="round" fill="none"/></svg>',
    man: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#143B4D"/><path d="M7 40c0-7.2 5.8-12 13-12s13 4.8 13 12z" fill="#16ABF0"/><path d="M16.5 25h7v5h-7z" fill="#D69B6C"/><circle cx="20" cy="17.5" r="8.2" fill="#E8B98C"/><path d="M11.6 16.8C11.8 10.5 15.5 8 20 8s8.2 2.5 8.4 8.8c0 0-1.6-4.2-8.4-4.2s-8.4 4.2-8.4 4.2z" fill="#241910"/><circle cx="17" cy="18" r="1" fill="#2A2A2A"/><circle cx="23" cy="18" r="1" fill="#2A2A2A"/><path d="M17.5 21.4c1.5 1.2 3.5 1.2 5 0" stroke="#9C6A4A" stroke-width="1.1" stroke-linecap="round" fill="none"/></svg>'
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  /* ---------- Render de una burbuja ---------- */
  function bubbleHTML(m) {
    let inner = '';
    if (m.photo) {
      const bg = m.img ? ' style="background-image:url(' + m.img + ')"' : '';
      const cls = m.img ? 'photo has-img' : 'photo';
      inner += '<div class="' + cls + '"' + bg + '><span class="tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' + m.photo + '</span></div>';
    }
    if (m.audio) {
      inner += '<div class="audio"><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span class="wave"></span><span class="dur">' + m.audio + '</span></div>';
    }
    if (m.text) inner += m.text;
    inner += '<span class="time">' + m.time + (m.tick ? ' ' + ticks : '') + '</span>';
    return inner;
  }

  /* ---------- Reproductor de chat ---------- */
  function makePlayer(bodyEl) {
    let token = 0;

    async function play(key) {
      const myToken = ++token;
      const data = CHATS[key];
      bodyEl.innerHTML = '';

      // typing indicator element (reusable)
      const typing = document.createElement('div');
      typing.className = 'typing';
      typing.innerHTML = '<span></span><span></span><span></span>';

      let badgeShown = false;
      await sleep(400);

      for (const m of data.messages) {
        if (myToken !== token) return;

        if (m.kind === 'out') {
          if (!badgeShown) {
            const badge = document.createElement('div');
            badge.className = 'ia-badge';
            badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21 8 13.9 2 9.4h7.6z"/></svg> Respondiendo con IA';
            bodyEl.appendChild(badge);
            requestAnimationFrame(() => badge.classList.add('show'));
            badgeShown = true;
            await sleep(500);
            if (myToken !== token) return;
          }
          // typing…
          bodyEl.appendChild(typing);
          typing.classList.add('show');
          bodyEl.scrollTop = bodyEl.scrollHeight;
          await sleep(1150);
          if (myToken !== token) return;
          typing.classList.remove('show');
          if (typing.parentNode) typing.parentNode.removeChild(typing);
        }

        const el = document.createElement('div');
        el.className = 'msg ' + (m.kind === 'out' ? 'out' : 'in');
        el.innerHTML = bubbleHTML(m);
        bodyEl.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        bodyEl.scrollTop = bodyEl.scrollHeight;

        await sleep(m.kind === 'out' ? 950 : 750);
      }

      // Bucle: al terminar la conversación, espera y se reinicia sola
      if (myToken === token) {
        await sleep(3200);
        if (myToken === token) play(key);
      }
    }

    return { play, stop: () => { token++; } };
  }

  /* ---------- Hero phone (autoplay al cargar) ---------- */
  const heroBody = document.querySelector('#heroPhone .wa-body');
  if (heroBody) {
    const heroPlayer = makePlayer(heroBody);
    const heroAva = document.querySelector('#heroPhone .ava');
    const heroNm = document.querySelector('#heroPhone .nm');
    if (heroAva) heroAva.innerHTML = '<img src="https://alexelautentiko.github.io/tubot-cdn/assets/face-lara.webp" alt="Lara Fernández">';
    if (heroNm) heroNm.textContent = CHATS.clientes.name;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          heroPlayer.play('clientes');
        }
      });
    }, { threshold: 0.3 });
    io.observe(heroBody);
  }

  /* ---------- Entrada del hero (dispara las transiciones) ---------- */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero-copy, .hero-phone-wrap').forEach(el => el.classList.add('in'));
    });
  });

  /* ---------- Demo multimodal (entrada → salida): tabs ---------- */
  const ioTabs = document.querySelectorAll('.io-tab');
  if (ioTabs.length) {
    ioTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.io;
        ioTabs.forEach(t => {
          const on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        document.querySelectorAll('.io-panel').forEach(p => {
          p.classList.toggle('active', p.dataset.ioPanel === key);
        });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

  /* ---------- Sticky CTA (aparece al pasar el hero) ---------- */
  const sticky = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if (sticky && hero) {
    const heroIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        sticky.classList.toggle('show', !e.isIntersecting);
      });
    }, { threshold: 0 });
    heroIO.observe(hero);
  }

  /* ---------- Count-up de las cifras ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const group = el.dataset.group === '1';
    const fmt = (v) => {
      let n = Math.round(v);
      let s = group ? n.toLocaleString('es-ES') : String(n);
      return prefix + s + suffix;
    };
    const dur = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('.stat .n[data-count]');
  if (counters.length && !reduceMotion) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---------- Carrusel de logos de modelos ---------- */
  const LOGOS = [
    { name: 'OpenAI', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-openai.webp', inv: true },
    { name: 'Anthropic', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-anthropic.webp', inv: true },
    { name: 'Gemini', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-gemini.svg' },
    { name: 'Meta', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-meta.svg' },
    { name: 'xAI', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-xai.webp', inv: true },
    { name: 'ElevenLabs', src: 'https://alexelautentiko.github.io/tubot-cdn/assets/logo-elevenlabs.png', inv: true }
  ];
  const track = document.getElementById('logoTrack');
  const carousel = document.getElementById('logoCarousel');
  if (track && carousel) {
    const itemHTML = (l, dup) => '<div class="logo-item' + (l.inv ? ' inv' : '') + '"' + (dup ? ' aria-hidden="true"' : '') + '>' +
      '<img src="' + l.src + '" alt="' + l.name + '" loading="lazy"></div>';
    track.innerHTML = LOGOS.map(l => itemHTML(l, false)).join('') + LOGOS.map(l => itemHTML(l, true)).join('');

    // auto-scroll continuo
    let paused = false, half = 0, speed = 0.6;
    const measure = () => {
      // distancia exacta de un ciclo: del primer logo a su copia (set + gap),
      // asi el bucle reposiciona en un punto pixel-identico y no se ve el salto.
      const first = track.children[0];
      const firstDup = track.children[LOGOS.length];
      if (first && firstDup) half = firstDup.offsetLeft - first.offsetLeft;
      speed = window.innerWidth <= 600 ? 1.1 : 0.6; // mas rapido en movil
    };
    measure();
    window.addEventListener('resize', measure);
    // re-medir cuando carguen las imagenes lazy (al inicio el ancho es erroneo)
    window.addEventListener('load', measure);
    track.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });
    function autoStep() {
      if (!paused && !reduceMotion) {
        carousel.scrollLeft += speed;
        if (carousel.scrollLeft >= half) carousel.scrollLeft -= half;
      }
      requestAnimationFrame(autoStep);
    }
    requestAnimationFrame(autoStep);

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { if (!down) paused = false; });

    // arrastre / swipe
    let down = false, startX = 0, startScroll = 0;
    carousel.addEventListener('pointerdown', (e) => {
      down = true; paused = true; startX = e.clientX; startScroll = carousel.scrollLeft;
      carousel.classList.add('dragging'); carousel.setPointerCapture(e.pointerId);
    });
    carousel.addEventListener('pointermove', (e) => {
      if (!down) return;
      carousel.scrollLeft = startScroll - (e.clientX - startX);
    });
    const release = () => {
      if (!down) return;
      down = false; paused = false; carousel.classList.remove('dragging');
      // mantener el bucle dentro de rango
      if (carousel.scrollLeft >= half) carousel.scrollLeft -= half;
      if (carousel.scrollLeft < 0) carousel.scrollLeft += half;
    };
    carousel.addEventListener('pointerup', release);
    carousel.addEventListener('pointercancel', release);
  }

  /* ---------- Roadmap: la banderita baja con el scroll ---------- */
  (function () {
    const roadmap = document.querySelector('.roadmap');
    if (!roadmap) return;
    const runner = roadmap.querySelector('.road-runner');
    const fill = roadmap.querySelector('.rail-fill');
    const firstPin = roadmap.querySelector('.stop:first-child .pin');
    const destPin = roadmap.querySelector('.stop.dest .pin');
    if (!runner || !fill || !firstPin || !destPin) return;
    let startY = 0, endY = 0;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    function measure() {
      startY = firstPin.offsetTop + firstPin.offsetHeight / 2;
      endY = destPin.offsetTop + destPin.offsetHeight / 2;
      fill.style.top = startY + 'px';
    }
    function update() {
      const rect = roadmap.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.62 - rect.top) / rect.height, 0, 1);
      const y = startY + (endY - startY) * p;
      runner.style.top = y + 'px';
      fill.style.height = (y - startY) + 'px';
      // Al llegar a la meta, el cohete se desvanece y deja ver la bandera plantada
      runner.style.opacity = clamp((0.97 - p) / 0.07, 0, 1);
    }
    measure(); update();
    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', () => { measure(); update(); });
    setTimeout(() => { measure(); update(); }, 600);
  })();

  /* ---------- Tracking: evento click_whatsapp (dataLayer + gtag + Bing UET) ---------- */
  (function () {
    function ctaLocation(a) {
      if (a.getAttribute('data-cta')) return a.getAttribute('data-cta');
      if (a.classList.contains('wa-float')) return 'Float';
      if (a.closest('.site-header')) return 'Header';
      if (a.closest('.sticky-cta')) return 'Sticky';
      if (a.closest('.site-footer')) return 'Footer';
      const sec = a.closest('[data-screen-label]');
      if (sec) return sec.getAttribute('data-screen-label');
      return 'Otro';
    }
    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (!a) return;
      const loc = ctaLocation(a);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'click_whatsapp', cta_location: loc, link_url: a.href });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', { cta_location: loc, transport_type: 'beacon' });
      }
      window.uetq = window.uetq || [];
      window.uetq.push('event', 'click_whatsapp', { event_category: 'cta', event_label: loc });
    }, true);
  })();

  /* ---------- Tracking: reserva en Calendly (postMessage del widget) ---------- */
  (function () {
    window.addEventListener('message', function (e) {
      if (e.origin.indexOf('https://calendly.com') !== 0) return;
      if (!e.data || e.data.event !== 'calendly.event_scheduled') return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'calendly_booked' });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'calendly_booked', { transport_type: 'beacon' });
      }
      window.uetq = window.uetq || [];
      window.uetq.push('event', 'calendly_booked', { event_category: 'cta' });
    });
  })();

  /* ---------- Rotador de procesos en el titular ---------- */
  (function () {
    const rot = document.querySelector('.hero h1 .rotator');
    if (!rot) return;
    const wordEl = rot.querySelector('.rotator-word');
    const words = (rot.getAttribute('data-words') || '').split('|').map(s => s.trim()).filter(Boolean);
    if (!wordEl || words.length < 2) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;

    function next() {
      i = (i + 1) % words.length;
      if (reduce) { wordEl.textContent = words[i]; return; }
      wordEl.classList.add('out');
      setTimeout(() => {
        wordEl.textContent = words[i];
        void wordEl.offsetWidth; // reinicia la transición
        wordEl.classList.remove('out');
      }, 250);
    }

    setInterval(next, 1700);
  })();

})();
