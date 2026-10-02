/* ============================================================
   TUBOT landing "Setter IA" — interacciones propias
   Lo compartido (tracking click_whatsapp / calendly_booked, reveal, sticky CTA,
   rotador del titular, anclas del FAQ) lo aporta tubot-landing.js, que se carga antes.
   ============================================================ */
(function () {
  'use strict';

  const ticks = '<span class="tick">✓✓</span>';
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Conversación del hero (lead de anuncio → cualificado → visita agendada) ---------- */
  // `step` enciende el chip de estado con ese data-step cuando aparece la burbuja.
  const CHAT = [
    { kind: 'in', text: 'Hola, vi vuestro anuncio. ¿Hacéis reformas de baño?', time: '23:12' },
    { kind: 'out', text: '¡Hola! Sí, es justo lo nuestro. ¿Es el baño completo o cambiar bañera por plato de ducha?', time: '23:12', tick: true, step: 1 },
    { kind: 'in', audio: '0:09', time: '23:13' },
    { kind: 'out', text: 'Perfecto: baño completo, unos 5 m², en Getafe. Entra en nuestra zona. ¿Te agendo una visita gratuita esta semana?', time: '23:13', tick: true, step: 2 },
    { kind: 'in', text: 'El jueves por la tarde', time: '23:14' },
    { kind: 'out', text: 'Hecho: jueves a las 17:30. Te aviso 30 min antes.', time: '23:14', tick: true, step: 3 }
  ];
  const LAST_STEP = 4; // el chip del CRM se enciende al cerrar la conversación

  /* ---------- Render de una burbuja ---------- */
  function bubbleHTML(m) {
    let inner = '';
    if (m.audio) {
      inner += '<div class="audio"><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span class="wave"></span><span class="dur">' + m.audio + '</span></div>';
    }
    if (m.text) inner += m.text;
    inner += '<span class="time">' + m.time + (m.tick ? ' ' + ticks : '') + '</span>';
    return inner;
  }

  /* ---------- Hero phone: chat en bucle + chips de estado sincronizados ---------- */
  const body = document.querySelector('#setterPhone .wa-body');
  const stage = document.querySelector('.setter-stage');
  if (body && stage) {
    const chips = stage.querySelectorAll('.stage-chip');
    const light = (step) => chips.forEach(c => {
      if (Number(c.dataset.step) <= step) c.classList.add('on');
    });
    const addMsg = (m) => {
      const el = document.createElement('div');
      el.className = 'msg ' + (m.kind === 'out' ? 'out' : 'in');
      el.innerHTML = bubbleHTML(m);
      body.appendChild(el);
      requestAnimationFrame(() => el.classList.add('show'));
      body.scrollTop = body.scrollHeight;
    };

    async function play() {
      body.innerHTML = '';
      chips.forEach(c => c.classList.remove('on'));

      const typing = document.createElement('div');
      typing.className = 'typing';
      typing.innerHTML = '<span></span><span></span><span></span>';

      let badgeShown = false;
      await sleep(400);

      for (const m of CHAT) {
        if (m.kind === 'out') {
          if (!badgeShown) {
            const badge = document.createElement('div');
            badge.className = 'ia-badge';
            badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21 8 13.9 2 9.4h7.6z"/></svg> Respondiendo con IA';
            body.appendChild(badge);
            requestAnimationFrame(() => badge.classList.add('show'));
            badgeShown = true;
            await sleep(500);
          }
          body.appendChild(typing);
          typing.classList.add('show');
          body.scrollTop = body.scrollHeight;
          await sleep(1150);
          typing.classList.remove('show');
          if (typing.parentNode) typing.parentNode.removeChild(typing);
        }
        addMsg(m);
        if (m.step) light(m.step);
        await sleep(m.kind === 'out' ? 1100 : 800);
      }

      light(LAST_STEP);
      // Bucle: al terminar, espera y se reinicia sola
      await sleep(4200);
      play();
    }

    if (reduceMotion) {
      // sin animación: conversación completa y todos los chips encendidos (sin clase .live)
      CHAT.forEach(addMsg);
    } else {
      stage.classList.add('live');
      let started = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !started) { started = true; play(); }
        });
      }, { threshold: 0.3 });
      io.observe(body);
    }
  }

})();
