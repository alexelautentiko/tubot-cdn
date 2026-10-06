/* ============================================================
   TUBOT · Home "Agente de IA" (index.html) — selector de sector
   Lo compartido (tracking click_whatsapp, formulario de escritorio, reveal, sticky CTA,
   rotador del titular) lo aporta tubot-landing.js, que se carga antes.
   Al elegir un sector (pastillas del hero) cambian la conversación
   del móvil, las acciones en directo, las tarjetas de "Cómo funciona" y las lecturas de
   "Cifras del negocio".
   ============================================================ */
(function () {
  'use strict';

  const ticks = '<span class="tick">✓✓</span>';
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const photo = (src, alt) => '<div class="photo has-img" style="background-image:url(' + src + ')" role="img" aria-label="' + alt + '"></div>';
  const CAL = 'Cita en tu calendario';

  // idioma: el que sirve Webflow en <html lang> (/en/ y /ca/); en local se fuerza con ?lang=en|ca
  const LANG = (function () {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'ca') return q;
    } catch (e) {}
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return (l === 'en' || l === 'ca') ? l : 'es';
  })();

  /* ---------- Datos por sector (español) ---------- */
  // icon: trazo del avatar del móvil · img + alt: foto del chat (va en el mensaje con photo: true)
  // chat: conversación del móvil; `step` enciende la acción con ese data-step
  // sx: textos que sustituyen a los [data-sx] de la página; la clave que falta se queda con
  //     el texto del sector por defecto (plagas), que vive en el HTML y se lee al arrancar.
  const SECTORS = {
    plagas: {
      icon: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1zM9 12l2 2 4-4',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/plaga-avispas.webp', alt: 'Foto de un nido de avispas bajo el alero de una casa',
      chat: [
        { kind: 'in', photo: true, text: 'Hola, tengo un nido de avispas en la fachada', time: '16:32' },
        { kind: 'out', text: 'Hola, soy Paula, la asistente de IA. ¿A qué altura está el nido y en qué municipio estás?', time: '16:32', tick: true },
        { kind: 'in', text: 'En un primer piso, en Torrent', time: '16:33', step: 1 },
        { kind: 'out', text: 'Gracias. Retirar el nido en Torrent son 85 €. ¿Te viene bien mañana por la mañana?', time: '16:33', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, perfecto', time: '16:34' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta en cuanto abran.', time: '16:34', tick: true, step: 3 }
      ]
    },
    clima: {
      icon: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/caldera-f28.webp', alt: 'Foto de la caldera con el código F28 en la pantalla',
      chat: [
        { kind: 'in', photo: true, text: 'Hola, la caldera no enciende y marca F28', time: '22:14' },
        { kind: 'out', text: 'Hola, soy Clara, la asistente de IA. ¿Me dices la marca y en qué municipio estás?', time: '22:14', tick: true },
        { kind: 'in', text: 'Vaillant, en Getafe', time: '22:15', step: 1 },
        { kind: 'out', text: 'Gracias. La visita de diagnóstico en Getafe son 59 €, que se descuentan si haces la reparación. ¿Te viene bien mañana por la mañana?', time: '22:15', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, perfecto', time: '22:16' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta en cuanto abran.', time: '22:16', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de climatización',
        'chip1.t': 'Avería entendida', 'chip1.s': 'Vaillant · F28 · con foto',
        'chip2.t': 'Precio dado', 'chip2.s': 'Visita de diagnóstico · 59 €',
        'chip3.s': 'Lista para tu equipo',
        'how1.day': 'Domingo · 22:14', 'how1.msg': 'La caldera no enciende',
        'how2.h': 'Entiende la avería',
        'how2.k1': 'Marca', 'how2.v1': 'Vaillant',
        'how2.k2': 'Código de error', 'how2.v2': 'F28',
        'how3.k1': 'Visita de diagnóstico', 'how3.v1': '59 €', 'how3.v2': 'Getafe',
        'how4.k3': CAL,
        'how5.alert': 'Urgente: sin calefacción',
        'bi.tag': 'Climatización', 'bi.sub': 'Qué averías se repiten, de qué municipios y cuántas acaban en visita.',
        'bi.n1': '312', 'bi.n2': '188', 'bi.n3': '97',
        'bi.k2': 'precios dados',
        'bi.h1': 'Qué avería se repite',
        'bi.m1': 'Caldera no enciende', 'bi.p1': '38%',
        'bi.m2': 'Aire que no enfría', 'bi.p2': '27%',
        'bi.m3': 'Pérdida de presión', 'bi.p3': '21%',
        'bi.z1': 'Getafe', 'bi.t1': '44 clientes',
        'bi.z2': 'Leganés', 'bi.t2': '31 clientes',
        'bi.t3': '17 clientes'
      }
    },
    limpieza: {
      icon: 'M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z',
      chat: [
        { kind: 'in', audio: '0:12', time: '20:47' },
        { kind: 'out', text: 'Hola, soy Sara, la asistente de IA. Limpieza a fondo de un piso de 90 m² con dos baños, ¿verdad? ¿En qué municipio está?', time: '20:47', tick: true },
        { kind: 'in', text: 'Sí, eso. En Alcobendas', time: '20:48', step: 1 },
        { kind: 'out', text: 'Gracias. Son 180 € con los productos incluidos. ¿Te viene bien el viernes por la mañana?', time: '20:48', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, el viernes', time: '20:49' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta en cuanto abran.', time: '20:49', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de limpieza',
        'chip1.t': 'Encargo entendido', 'chip1.s': 'Piso de 90 m² · audio',
        'chip2.s': 'Limpieza a fondo · 180 €',
        'chip3.t': 'Limpieza apuntada', 'chip3.s': 'Lista para tu equipo',
        'how1.day': 'Sábado · 20:47', 'how1.msg': '¿Cuánto cuesta una limpieza a fondo?',
        'how2.h': 'Entiende el encargo',
        'how2.k1': 'Servicio', 'how2.v1': 'Limpieza a fondo',
        'how2.k2': 'Vivienda', 'how2.v2': '90 m² · 2 baños',
        'how2.k3': 'Audio y dirección', 'how2.v3': 'Recibidos',
        'how3.k1': 'Limpieza a fondo', 'how3.v1': '180 €', 'how3.v2': 'Alcobendas',
        'how4.v1': 'Viernes', 'how4.k3': CAL,
        'how5.alert': 'Pide hablar con una persona',
        'bi.tag': 'Limpieza', 'bi.sub': 'Qué servicios te piden, de qué municipios y cuántos acaban agendados.',
        'bi.n1': '198', 'bi.n2': '142', 'bi.n3': '76',
        'bi.k3': 'limpiezas agendadas',
        'bi.h1': 'Qué servicio te piden más',
        'bi.m1': 'Limpieza a fondo', 'bi.p1': '44%',
        'bi.m2': 'Fin de obra', 'bi.p2': '23%',
        'bi.m3': 'Cristales', 'bi.p3': '14%',
        'bi.z1': 'Alcobendas', 'bi.t1': '36 clientes',
        'bi.z2': 'Tres Cantos', 'bi.t2': '22 clientes',
        'bi.t3': '15 clientes'
      }
    },
    fontaneria: {
      icon: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/fuga-fregadero.webp', alt: 'Foto de una fuga de agua bajo el fregadero',
      chat: [
        { kind: 'in', audio: '0:14', time: '23:42' },
        { kind: 'in', photo: true, text: 'Se me está inundando la cocina', time: '23:42' },
        { kind: 'out', text: 'Hola, soy Nora, la asistente de IA. Cierra la llave de paso general. ¿En qué municipio estás?', time: '23:42', tick: true },
        { kind: 'in', text: 'En Leganés', time: '23:43', step: 1 },
        { kind: 'out', text: 'Es una urgencia: la salida en Leganés son 90 €. Se lo paso ahora mismo al técnico de guardia.', time: '23:43', tick: true, step: 2 },
        { kind: 'in', text: 'Vale, gracias', time: '23:43' },
        { kind: 'out', text: 'Hecho. Ya tiene tu audio y tu dirección, y te llama él directamente.', time: '23:44', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de fontanería',
        'chip1.t': 'Urgencia entendida', 'chip1.s': 'Fuga en cocina · audio',
        'chip2.t': 'Precio dado', 'chip2.s': 'Salida urgente · 90 €',
        'chip3.t': 'Pasado a tu equipo', 'chip3.s': 'Técnico de guardia',
        'how1.day': 'Domingo · 23:42', 'how1.msg': 'Se me inunda la cocina',
        'how2.h': 'Entiende la avería',
        'how2.k1': 'Avería', 'how2.v1': 'Fuga de agua',
        'how2.k2': 'Dónde', 'how2.v2': 'Cocina',
        'how2.k3': 'Audio y foto', 'how2.v3': 'Recibidos',
        'how3.k1': 'Salida urgente', 'how3.v1': '90 €', 'how3.v2': 'Leganés',
        'how4.v1': 'Hoy', 'how4.k3': CAL,
        'how5.alert': 'Urgente: fuga de agua',
        'bi.tag': 'Fontanería', 'bi.sub': 'Qué averías se repiten, de qué municipios y cuántas acaban en visita.',
        'bi.n1': '264', 'bi.n2': '173', 'bi.n3': '92',
        'bi.k2': 'precios dados',
        'bi.h1': 'Qué avería se repite',
        'bi.m1': 'Fugas', 'bi.p1': '39%',
        'bi.m2': 'Atascos', 'bi.p2': '29%',
        'bi.m3': 'Termos', 'bi.p3': '17%',
        'bi.z1': 'Leganés', 'bi.t1': '38 clientes',
        'bi.z2': 'Getafe', 'bi.t2': '27 clientes',
        'bi.t3': '21 clientes'
      }
    },
    electricidad: {
      icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/cuadro-electrico.webp', alt: 'Foto del cuadro eléctrico de una casa',
      chat: [
        { kind: 'in', photo: true, text: 'Buenas, me salta el diferencial cada vez que enciendo el horno', time: '07:40' },
        { kind: 'out', text: 'Hola, soy Elena, la asistente de IA. ¿Te pasa solo con el horno? ¿Y en qué municipio estás?', time: '07:40', tick: true },
        { kind: 'in', text: 'Solo con el horno. En Móstoles', time: '07:41', step: 1 },
        { kind: 'out', text: 'Gracias. La visita de revisión en Móstoles son 49 €. ¿Te viene bien mañana por la tarde?', time: '07:41', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, a partir de las 17', time: '07:42' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta.', time: '07:42', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de electricidad',
        'chip1.t': 'Avería entendida', 'chip1.s': 'Diferencial · con foto',
        'chip2.t': 'Precio dado', 'chip2.s': 'Visita de revisión · 49 €',
        'chip3.s': 'Lista para tu equipo',
        'how1.day': 'Festivo · 07:40', 'how1.msg': 'Me salta el diferencial',
        'how2.h': 'Entiende la avería',
        'how2.k1': 'Avería', 'how2.v1': 'Salta el diferencial',
        'how2.k2': 'Aparato', 'how2.v2': 'Horno',
        'how3.k1': 'Visita de revisión', 'how3.v1': '49 €', 'how3.v2': 'Móstoles',
        'how4.k3': CAL,
        'how5.alert': 'Urgente: sin luz en casa',
        'bi.tag': 'Electricidad', 'bi.sub': 'Qué averías se repiten, de qué municipios y cuántas acaban en visita.',
        'bi.n1': '221', 'bi.n2': '149', 'bi.n3': '81',
        'bi.k2': 'precios dados',
        'bi.h1': 'Qué avería se repite',
        'bi.m1': 'Salta el diferencial', 'bi.p1': '35%',
        'bi.m2': 'Enchufes', 'bi.p2': '26%',
        'bi.m3': 'Cuadro eléctrico', 'bi.p3': '19%',
        'bi.z1': 'Móstoles', 'bi.t1': '33 clientes',
        'bi.z2': 'Alcorcón', 'bi.t2': '25 clientes',
        'bi.t3': '14 clientes'
      }
    },
    tejados: {
      icon: 'M2 18a1 1 0 001 1h18a1 1 0 001-1v-2a1 1 0 00-1-1H3a1 1 0 00-1 1v2zM10 10V5a1 1 0 011-1h2a1 1 0 011 1v5M4 15v-3a6 6 0 016-6M14 6a6 6 0 016 6v3',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/gotera-techo.webp', alt: 'Foto de una mancha de humedad en el techo del salón',
      chat: [
        { kind: 'in', photo: true, text: 'Hola, tengo una gotera en el techo del salón', time: '08:12' },
        { kind: 'out', text: 'Hola, soy Irene, la asistente de IA. ¿Es un piso o una casa? ¿Y en qué municipio estás?', time: '08:12', tick: true },
        { kind: 'in', text: 'Una casa, en Las Rozas', time: '08:13', step: 1 },
        { kind: 'out', text: 'Gracias. La visita de inspección en Las Rozas son 60 €, que se descuentan si haces la reparación. ¿Te viene bien el jueves por la mañana?', time: '08:13', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, el jueves', time: '08:14' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta.', time: '08:14', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de tejados',
        'chip1.t': 'Avería entendida', 'chip1.s': 'Gotera · con foto',
        'chip2.t': 'Precio dado', 'chip2.s': 'Visita de inspección · 60 €',
        'chip3.s': 'Lista para tu equipo',
        'how1.day': 'Domingo · 08:12', 'how1.msg': 'Tengo una gotera en el salón',
        'how2.h': 'Entiende la avería',
        'how2.k1': 'Avería', 'how2.v1': 'Gotera',
        'how2.k2': 'Vivienda', 'how2.v2': 'Casa',
        'how3.k1': 'Visita de inspección', 'how3.v1': '60 €', 'how3.v2': 'Las Rozas',
        'how4.v1': 'Jueves', 'how4.k3': CAL,
        'how5.alert': 'Urgente: entra agua en casa',
        'bi.tag': 'Tejados', 'bi.sub': 'Qué averías se repiten, de qué municipios y cuántas acaban en visita.',
        'bi.n1': '134', 'bi.n2': '96', 'bi.n3': '58',
        'bi.k2': 'precios dados',
        'bi.h1': 'Qué avería se repite',
        'bi.m1': 'Goteras', 'bi.p1': '47%',
        'bi.m2': 'Tejas rotas', 'bi.p2': '22%',
        'bi.m3': 'Canalones', 'bi.p3': '15%',
        'bi.z1': 'Las Rozas', 'bi.t1': '24 clientes',
        'bi.z2': 'Majadahonda', 'bi.t2': '19 clientes',
        'bi.t3': '12 clientes'
      }
    },
    jardineria: {
      icon: 'M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/seto-podar.webp', alt: 'Foto de un seto alto y sin podar en un jardín',
      chat: [
        { kind: 'in', photo: true, text: 'Hola, ¿cuánto me costaría podar este seto?', time: '13:20' },
        { kind: 'out', text: 'Hola, soy Marta, la asistente de IA. ¿Cuántos metros de largo tiene, más o menos? ¿Y en qué municipio estás?', time: '13:20', tick: true },
        { kind: 'in', text: 'Unos 20 metros, en Pozuelo', time: '13:21', step: 1 },
        { kind: 'out', text: 'Gracias. Podar 20 m de seto son 140 €, con la retirada de restos incluida. ¿Te viene bien el martes?', time: '13:21', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, el martes', time: '13:22' },
        { kind: 'out', text: 'Apuntado. El equipo te confirma la hora exacta.', time: '13:22', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu empresa de jardinería',
        'chip1.t': 'Encargo entendido', 'chip1.s': 'Seto de 20 m · con foto',
        'chip2.s': 'Poda de seto · 140 €',
        'chip3.t': 'Trabajo apuntado', 'chip3.s': 'Listo para tu equipo',
        'how1.day': 'Sábado · 13:20', 'how1.msg': '¿Cuánto cuesta podar un seto?',
        'how2.h': 'Entiende el encargo',
        'how2.k1': 'Trabajo', 'how2.v1': 'Poda de seto',
        'how2.k2': 'Largo', 'how2.v2': '20 metros',
        'how3.k1': 'Poda de seto', 'how3.v1': '140 €', 'how3.v2': 'Pozuelo',
        'how4.v1': 'Martes', 'how4.k3': CAL,
        'how5.alert': 'Pide un jardín completo',
        'bi.tag': 'Jardinería', 'bi.sub': 'Qué trabajos te piden, de qué municipios y cuántos acaban agendados.',
        'bi.n1': '176', 'bi.n2': '121', 'bi.n3': '64',
        'bi.k3': 'trabajos agendados',
        'bi.h1': 'Qué trabajo te piden más',
        'bi.m1': 'Poda de setos', 'bi.p1': '36%',
        'bi.m2': 'Mantenimiento', 'bi.p2': '31%',
        'bi.m3': 'Césped', 'bi.p3': '18%',
        'bi.z1': 'Pozuelo', 'bi.t1': '29 clientes',
        'bi.z2': 'Boadilla', 'bi.t2': '21 clientes',
        'bi.t3': '11 clientes'
      }
    },
    cerrajeria: {
      icon: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
      chat: [
        { kind: 'in', text: 'Me he dejado las llaves dentro y no puedo entrar', time: '01:15' },
        { kind: 'out', text: 'Hola, soy Vera, la asistente de IA. ¿La puerta está solo cerrada de golpe o con la llave echada? ¿Y en qué municipio estás?', time: '01:15', tick: true },
        { kind: 'in', text: 'Solo de golpe. En Alcorcón', time: '01:16', step: 1 },
        { kind: 'out', text: 'Gracias. La apertura nocturna en Alcorcón son 80 €. Se lo paso ahora mismo al cerrajero de guardia.', time: '01:16', tick: true, step: 2 },
        { kind: 'in', text: 'Vale, gracias', time: '01:16' },
        { kind: 'out', text: 'Hecho. Ya tiene tu dirección y te llama él directamente.', time: '01:17', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu cerrajería',
        'chip1.t': 'Urgencia entendida', 'chip1.s': 'Puerta cerrada de golpe',
        'chip2.t': 'Precio dado', 'chip2.s': 'Apertura nocturna · 80 €',
        'chip3.t': 'Pasado a tu equipo', 'chip3.s': 'Cerrajero de guardia',
        'how1.day': 'Sábado · 01:15', 'how1.msg': 'Me he dejado las llaves dentro',
        'how2.h': 'Entiende la urgencia',
        'how2.k1': 'Urgencia', 'how2.v1': 'Puerta cerrada',
        'how2.k2': 'Llave echada', 'how2.v2': 'No',
        'how2.k3': 'Dirección', 'how2.v3': 'Recibida',
        'how3.k1': 'Apertura nocturna', 'how3.v1': '80 €', 'how3.v2': 'Alcorcón',
        'how4.v1': 'Hoy', 'how4.k3': CAL,
        'how5.alert': 'Urgente: no puede entrar en casa',
        'bi.tag': 'Cerrajería', 'bi.sub': 'Qué te piden más, de qué municipios y cuántas acaban en salida.',
        'bi.n1': '342', 'bi.n2': '268', 'bi.n3': '187',
        'bi.k2': 'precios dados', 'bi.k3': 'salidas urgentes',
        'bi.h1': 'Qué te piden más',
        'bi.m1': 'Aperturas', 'bi.p1': '52%',
        'bi.m2': 'Cambios de cerradura', 'bi.p2': '23%',
        'bi.m3': 'Puertas blindadas', 'bi.p3': '9%',
        'bi.z1': 'Alcorcón', 'bi.t1': '58 clientes',
        'bi.z2': 'Móstoles', 'bi.t2': '41 clientes',
        'bi.t3': '23 clientes'
      }
    },
    talleres: {
      icon: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2M5 17a2 2 0 104 0 2 2 0 10-4 0M9 17h6M15 17a2 2 0 104 0 2 2 0 10-4 0',
      img: 'https://alexelautentiko.github.io/tubot-cdn/assets/testigo-motor.webp', alt: 'Foto del cuadro del coche con el testigo de avería del motor encendido',
      chat: [
        { kind: 'in', photo: true, text: 'Se me ha encendido esta luz en el coche', time: '18:40' },
        { kind: 'out', text: 'Hola, soy Alba, la asistente de IA. Para verlo bien hay que pasarle la diagnosis. ¿Qué coche es y de qué año?', time: '18:40', tick: true },
        { kind: 'in', text: 'Un Seat León de 2018', time: '18:41', step: 1 },
        { kind: 'out', text: 'Gracias. La diagnosis son 45 €, que se descuentan si haces la reparación. ¿Te viene bien mañana a las 9:00?', time: '18:41', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, mañana a las 9', time: '18:42' },
        { kind: 'out', text: 'Apuntado: mañana a las 9:00. Te esperamos en el taller.', time: '18:42', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu taller',
        'chip1.t': 'Avería entendida', 'chip1.s': 'Testigo de motor · foto',
        'chip2.t': 'Precio dado', 'chip2.s': 'Diagnosis · 45 €',
        'chip3.t': 'Cita apuntada', 'chip3.s': 'Mañana · 9:00',
        'how1.day': 'Domingo · 18:40', 'how1.msg': 'Se me ha encendido una luz del coche',
        'how2.h': 'Entiende la avería',
        'how2.k1': 'Avería', 'how2.v1': 'Testigo de motor',
        'how2.k2': 'Coche', 'how2.v2': 'Seat León · 2018',
        'how2.k3': 'Foto', 'how2.v3': 'Recibida',
        'how3.k1': 'Diagnosis', 'how3.v1': '45 €',
        'how3.k2': 'Si reparas', 'how3.v2': 'Se descuenta',
        'how4.h': 'Agenda la cita', 'how4.v1': 'Mañana 9:00', 'how4.k3': CAL,
        'how5.alert': 'Siniestro con el seguro',
        'bi.tag': 'Talleres', 'bi.sub': 'Qué te piden más, de qué municipios y cuántos acaban con cita.',
        'bi.n1': '238', 'bi.n2': '164', 'bi.n3': '109',
        'bi.k2': 'precios dados', 'bi.k3': 'citas agendadas',
        'bi.h1': 'Qué te piden más',
        'bi.m1': 'Revisiones', 'bi.p1': '37%',
        'bi.m2': 'Frenos', 'bi.p2': '24%',
        'bi.m3': 'Neumáticos', 'bi.p3': '18%',
        'bi.z1': 'Getafe', 'bi.t1': '46 clientes',
        'bi.z2': 'Parla', 'bi.t2': '29 clientes',
        'bi.t3': '12 clientes'
      }
    },
    fincas: {
      icon: 'M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18zM6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4',
      chat: [
        { kind: 'in', audio: '0:14', time: '08:05' },
        { kind: 'out', text: 'Hola, soy Olga, la asistente de IA. Entendido: el ascensor del portal 2 está parado desde ayer. ¿Hay alguien dentro?', time: '08:05', tick: true },
        { kind: 'in', text: 'No, nadie. Solo que no funciona', time: '08:06', step: 1 },
        { kind: 'out', text: 'Gracias. He abierto la incidencia con prioridad alta y se la he pasado al administrador y a la empresa del ascensor.', time: '08:06', tick: true, step: 2 },
        { kind: 'in', text: 'Perfecto, gracias', time: '08:07' },
        { kind: 'out', text: 'Queda registrada. El administrador te confirma cuándo vienen.', time: '08:07', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu administración de fincas',
        'chip1.t': 'Incidencia entendida', 'chip1.s': 'Ascensor parado · audio',
        'chip2.t': 'Incidencia abierta', 'chip2.s': 'Portal 2 · prioridad alta',
        'chip3.t': 'Pasado a tu equipo', 'chip3.s': 'Con el resumen del caso',
        'how1.day': 'Domingo · 08:05', 'how1.msg': 'El ascensor lleva parado desde ayer',
        'how2.h': 'Entiende la incidencia',
        'how2.k1': 'Incidencia', 'how2.v1': 'Ascensor parado',
        'how2.k2': 'Comunidad', 'how2.v2': 'Portal 2 · 3.º B',
        'how2.k3': 'Audio', 'how2.v3': 'Transcrito',
        'how3.h': 'Abre la incidencia',
        'how3.k1': 'Parte', 'how3.v1': 'Creado',
        'how3.k2': 'Prioridad', 'how3.v2': 'Alta',
        'how3.k3': 'Proveedor', 'how3.v3': 'Mantenimiento',
        'how4.h': 'Informa a quien toca',
        'how4.k1': 'Administrador', 'how4.v1': 'Informado',
        'how4.k2': 'Técnico', 'how4.v2': 'Informado',
        'how4.k3': 'Vecino', 'how4.v3': 'Informado',
        'how5.alert': 'Urgente: fuga en zonas comunes',
        'bi.tag': 'Fincas', 'bi.sub': 'Qué incidencias se repiten, en qué comunidades y cuántas pasan a proveedor.',
        'bi.n1': '327', 'bi.n2': '214', 'bi.n3': '96',
        'bi.k2': 'incidencias abiertas', 'bi.k3': 'pasadas a proveedor',
        'bi.h1': 'Qué incidencia se repite',
        'bi.m1': 'Ascensor', 'bi.p1': '34%',
        'bi.m2': 'Portero automático', 'bi.p2': '22%',
        'bi.m3': 'Humedades', 'bi.p3': '17%',
        'bi.h2': 'Qué comunidades escriben más',
        'bi.z1': 'C/ Mayor, 12', 'bi.t1': '41 vecinos',
        'bi.z2': 'Av. del Parque, 8', 'bi.t2': '28 vecinos',
        'bi.z3': 'Pl. de la Fuente, 3', 'bi.t3': '19 vecinos'
      }
    },
    abogados: {
      icon: 'M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2',
      chat: [
        { kind: 'in', text: 'Buenas, me han despedido hoy y no sé qué hacer', time: '21:30' },
        { kind: 'out', text: 'Hola, soy Eva, la asistente de IA. Siento lo que te ha pasado. ¿Te han dado ya la carta de despido?', time: '21:30', tick: true },
        { kind: 'in', text: 'Sí, me la han dado esta tarde', time: '21:31', step: 1 },
        { kind: 'out', text: 'Gracias. Estos casos conviene verlos pronto. La primera consulta son 60 €. ¿Te viene bien mañana a las 10:00?', time: '21:31', tick: true, step: 2 },
        { kind: 'in', text: 'Sí, mañana a las 10', time: '21:32' },
        { kind: 'out', text: 'Apuntado: mañana a las 10:00 con una abogada laboralista. Trae la carta de despido.', time: '21:32', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu despacho',
        'chip1.t': 'Caso entendido', 'chip1.s': 'Despido · laboral',
        'chip2.t': 'Precio dado', 'chip2.s': 'Primera consulta · 60 €',
        'chip3.t': 'Cita apuntada', 'chip3.s': 'Mañana · 10:00',
        'how1.day': 'Jueves · 21:30', 'how1.msg': 'Me han despedido hoy',
        'how2.h': 'Entiende el caso',
        'how2.k1': 'Asunto', 'how2.v1': 'Despido',
        'how2.k2': 'Área', 'how2.v2': 'Laboral',
        'how2.k3': 'Carta de despido', 'how2.v3': 'La tiene',
        'how3.k1': 'Primera consulta', 'how3.v1': '60 €',
        'how3.k2': 'Área', 'how3.v2': 'Laboral',
        'how4.h': 'Agenda la cita', 'how4.v1': 'Mañana 10:00', 'how4.k3': CAL,
        'how5.alert': 'Urgente: plazo esta semana',
        'bi.tag': 'Abogados', 'bi.sub': 'Qué asuntos te consultan, de qué zonas y cuántos acaban con cita.',
        'bi.n1': '152', 'bi.n2': '97', 'bi.n3': '61',
        'bi.k2': 'precios dados', 'bi.k3': 'citas agendadas',
        'bi.h1': 'Qué asunto te consultan más',
        'bi.m1': 'Despidos', 'bi.p1': '33%',
        'bi.m2': 'Herencias', 'bi.p2': '26%',
        'bi.m3': 'Divorcios', 'bi.p3': '21%',
        'bi.z1': 'Chamberí', 'bi.t1': '27 clientes',
        'bi.z2': 'Tetuán', 'bi.t2': '18 clientes',
        'bi.t3': '9 clientes'
      }
    },
    inmobiliarias: {
      icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
      chat: [
        { kind: 'in', text: 'Hola, ¿sigue disponible el piso de la calle Alcalá?', time: '22:05' },
        { kind: 'out', text: 'Hola, soy Carla, la asistente de IA. Sí, sigue disponible: 3 habitaciones, 320.000 €. ¿Lo quieres para vivir? ¿Necesitas hipoteca?', time: '22:05', tick: true },
        { kind: 'in', text: 'Para vivir. Tengo la hipoteca preaprobada', time: '22:06', step: 1 },
        { kind: 'out', text: 'Perfecto. Puedo enseñártelo el sábado a las 11:00 o a las 12:30. ¿Cuál te viene mejor?', time: '22:06', tick: true, step: 2 },
        { kind: 'in', text: 'A las 11', time: '22:07' },
        { kind: 'out', text: 'Apuntado: sábado a las 11:00. Te acompaña un agente de la oficina.', time: '22:07', tick: true, step: 3 }
      ],
      sx: {
        'phone.nm': 'Tu inmobiliaria',
        'chip1.t': 'Cliente cualificado', 'chip1.s': 'Hipoteca preaprobada',
        'chip2.t': 'Hueco propuesto', 'chip2.s': 'Sábado · 11:00 o 12:30',
        'chip3.s': 'Sábado · 11:00',
        'how1.day': 'Viernes · 22:05', 'how1.msg': '¿Sigue disponible el piso?',
        'how2.h': 'Entiende lo que busca',
        'how2.k1': 'Piso', 'how2.v1': 'C/ Alcalá · 3 hab.',
        'how2.k2': 'Para', 'how2.v2': 'Vivir',
        'how2.k3': 'Hipoteca', 'how2.v3': 'Preaprobada',
        'how3.h': 'Cualifica al comprador',
        'how3.k1': 'Precio del piso', 'how3.v1': '320.000 €',
        'how3.k2': 'Financiación', 'how3.v2': 'Preaprobada',
        'how3.k3': 'Encaja', 'how3.v3': 'Sí',
        'how4.v1': 'Sábado 11:00', 'how4.k3': CAL,
        'how5.alert': 'Quiere hacer una oferta',
        'bi.tag': 'Inmobiliarias', 'bi.sub': 'Qué pisos te piden, en qué zonas buscan y cuántos acaban en visita.',
        'bi.n1': '403', 'bi.n2': '126', 'bi.n3': '74',
        'bi.k2': 'compradores cualificados',
        'bi.h1': 'Qué pisos te piden más',
        'bi.m1': '3 habitaciones', 'bi.p1': '42%',
        'bi.m2': '2 habitaciones', 'bi.p2': '31%',
        'bi.m3': 'Áticos', 'bi.p3': '11%',
        'bi.h2': 'Qué zonas buscan',
        'bi.z1': 'Chamberí', 'bi.t1': '52 clientes',
        'bi.z2': 'Retiro', 'bi.t2': '38 clientes',
        'bi.z3': 'Otras zonas', 'bi.t3': '36 clientes'
      }
    }
  };
  const DEFAULT_SECTOR = 'plagas';

  /* ---------- Traducciones (EN/CA) ---------- */
  // Por sector: `sx` (se mezcla sobre el español), `alt` de la foto y los textos del chat en el
  // mismo orden que en SECTORS (null = mensaje sin texto, p. ej. un audio). El sector por defecto
  // no lleva `sx`: sus textos están en el HTML y los traduce tubot-landing.js (claves sx.*).
  const L10N = {
    "en": {
      "badge": "Replying with AI",
      "sectors": {
        "plagas": {
          "alt": "Photo of a wasp nest under the eaves of a house",
          "chat": [
            "Hi, I've got a wasp nest on the front of my house",
            "Hi, I'm Paula, the AI assistant. How high up is the nest and which town are you in?",
            "On the first floor, in Torrent",
            "Thanks. Removing the nest in Torrent is €85. Does tomorrow morning suit you?",
            "Yes, perfect",
            "Noted. The team will confirm the exact time as soon as they open."
          ]
        },
        "clima": {
          "sx": {
            "phone.nm": "Your HVAC company",
            "chip1.t": "Fault understood",
            "chip1.s": "Vaillant · F28 · with photo",
            "chip2.t": "Price given",
            "chip2.s": "Diagnostic visit · €59",
            "chip3.s": "Ready for your team",
            "how1.day": "Sunday · 22:14",
            "how1.msg": "The boiler won't come on",
            "how2.h": "Understands the fault",
            "how2.k1": "Brand",
            "how2.v1": "Vaillant",
            "how2.k2": "Error code",
            "how2.v2": "F28",
            "how3.k1": "Diagnostic visit",
            "how3.v1": "€59",
            "how3.v2": "Getafe",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: no heating",
            "bi.tag": "HVAC",
            "bi.sub": "Which faults keep coming up, from which towns and how many end in a visit.",
            "bi.k2": "prices given",
            "bi.h1": "Which fault keeps coming up",
            "bi.m1": "Boiler won't come on",
            "bi.m2": "Air con not cooling",
            "bi.m3": "Pressure loss",
            "bi.z1": "Getafe",
            "bi.t1": "44 customers",
            "bi.z2": "Leganés",
            "bi.t2": "31 customers",
            "bi.t3": "17 customers"
          },
          "alt": "Photo of the boiler with the F28 code on the display",
          "chat": [
            "Hi, my boiler won't come on and it's showing F28",
            "Hi, I'm Clara, the AI assistant. Can you tell me the brand and which town you're in?",
            "Vaillant, in Getafe",
            "Thanks. The diagnostic visit in Getafe is €59, which comes off the bill if you go ahead with the repair. Does tomorrow morning suit you?",
            "Yes, perfect",
            "Noted. The team will confirm the exact time as soon as they open."
          ]
        },
        "limpieza": {
          "sx": {
            "phone.nm": "Your cleaning company",
            "chip1.t": "Job understood",
            "chip1.s": "90 m² flat · voice note",
            "chip2.s": "Deep clean · €180",
            "chip3.t": "Cleaning logged",
            "chip3.s": "Ready for your team",
            "how1.day": "Saturday · 20:47",
            "how1.msg": "How much is a deep clean?",
            "how2.h": "Understands the job",
            "how2.k1": "Service",
            "how2.v1": "Deep clean",
            "how2.k2": "Property",
            "how2.v2": "90 m² · 2 bathrooms",
            "how2.k3": "Voice note and address",
            "how2.v3": "Received",
            "how3.k1": "Deep clean",
            "how3.v1": "€180",
            "how3.v2": "Alcobendas",
            "how4.v1": "Friday",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Asks to speak to a person",
            "bi.tag": "Cleaning",
            "bi.sub": "Which services people ask for, from which towns and how many end up booked.",
            "bi.k3": "cleans booked",
            "bi.h1": "Most requested service",
            "bi.m1": "Deep clean",
            "bi.m2": "After-builders clean",
            "bi.m3": "Windows",
            "bi.z1": "Alcobendas",
            "bi.t1": "36 customers",
            "bi.z2": "Tres Cantos",
            "bi.t2": "22 customers",
            "bi.t3": "15 customers"
          },
          "chat": [
            null,
            "Hi, I'm Sara, the AI assistant. A deep clean of a 90 m² flat with two bathrooms, right? Which town is it in?",
            "Yes, that's it. In Alcobendas",
            "Thanks. That's €180 with products included. Does Friday morning suit you?",
            "Yes, Friday",
            "Noted. The team will confirm the exact time as soon as they open."
          ]
        },
        "fontaneria": {
          "sx": {
            "phone.nm": "Your plumbing company",
            "chip1.t": "Emergency spotted",
            "chip1.s": "Kitchen leak · voice note",
            "chip2.t": "Price given",
            "chip2.s": "Emergency call-out · €90",
            "chip3.t": "Passed to your team",
            "chip3.s": "On-call plumber",
            "how1.day": "Sunday · 23:42",
            "how1.msg": "My kitchen is flooding",
            "how2.h": "Understands the problem",
            "how2.k1": "Problem",
            "how2.v1": "Water leak",
            "how2.k2": "Where",
            "how2.v2": "Kitchen",
            "how2.k3": "Voice note and photo",
            "how2.v3": "Received",
            "how3.k1": "Emergency call-out",
            "how3.v1": "€90",
            "how3.v2": "Leganés",
            "how4.v1": "Today",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: water leak",
            "bi.tag": "Plumbing",
            "bi.sub": "Which problems keep coming up, from which towns and how many end in a visit.",
            "bi.k2": "prices given",
            "bi.h1": "Which problem keeps coming up",
            "bi.m1": "Leaks",
            "bi.m2": "Blockages",
            "bi.m3": "Water heaters",
            "bi.z1": "Leganés",
            "bi.t1": "38 customers",
            "bi.z2": "Getafe",
            "bi.t2": "27 customers",
            "bi.t3": "21 customers"
          },
          "alt": "Photo of a water leak under the sink",
          "chat": [
            null,
            "My kitchen is flooding",
            "Hi, I'm Nora, the AI assistant. Turn the water off at the mains. Which town are you in?",
            "In Leganés",
            "This is an emergency: the call-out in Leganés is €90. I'm passing it to the on-call plumber right now.",
            "OK, thanks",
            "Done. He's got your voice note and your address, and he'll call you directly."
          ]
        },
        "electricidad": {
          "sx": {
            "phone.nm": "Your electrical company",
            "chip1.t": "Fault understood",
            "chip1.s": "RCD · with photo",
            "chip2.t": "Price given",
            "chip2.s": "Inspection visit · €49",
            "chip3.s": "Ready for your team",
            "how1.day": "Bank holiday · 07:40",
            "how1.msg": "My power keeps tripping",
            "how2.h": "Understands the fault",
            "how2.k1": "Fault",
            "how2.v1": "RCD tripping",
            "how2.k2": "Appliance",
            "how2.v2": "Oven",
            "how3.k1": "Inspection visit",
            "how3.v1": "€49",
            "how3.v2": "Móstoles",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: no power at home",
            "bi.tag": "Electrical",
            "bi.sub": "Which faults keep coming up, from which towns and how many end in a visit.",
            "bi.k2": "prices given",
            "bi.h1": "Which fault keeps coming up",
            "bi.m1": "RCD tripping",
            "bi.m2": "Sockets",
            "bi.m3": "Fuse box",
            "bi.z1": "Móstoles",
            "bi.t1": "33 customers",
            "bi.z2": "Alcorcón",
            "bi.t2": "25 customers",
            "bi.t3": "14 customers"
          },
          "alt": "Photo of a home's fuse box",
          "chat": [
            "Hi, the power trips every time I turn the oven on",
            "Hi, I'm Elena, the AI assistant. Does it only happen with the oven? And which town are you in?",
            "Only with the oven. In Móstoles",
            "Thanks. The inspection visit in Móstoles is €49. Does tomorrow afternoon suit you?",
            "Yes, from 17:00",
            "Noted. The team will confirm the exact time."
          ]
        },
        "tejados": {
          "sx": {
            "phone.nm": "Your roofing company",
            "chip1.t": "Problem understood",
            "chip1.s": "Roof leak · with photo",
            "chip2.t": "Price given",
            "chip2.s": "Inspection visit · €60",
            "chip3.s": "Ready for your team",
            "how1.day": "Sunday · 08:12",
            "how1.msg": "I've got a leak in the living room",
            "how2.h": "Understands the problem",
            "how2.k1": "Problem",
            "how2.v1": "Roof leak",
            "how2.k2": "Property",
            "how2.v2": "House",
            "how3.k1": "Inspection visit",
            "how3.v1": "€60",
            "how3.v2": "Las Rozas",
            "how4.v1": "Thursday",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: water coming in",
            "bi.tag": "Roofing",
            "bi.sub": "Which problems keep coming up, from which towns and how many end in a visit.",
            "bi.k2": "prices given",
            "bi.h1": "Which problem keeps coming up",
            "bi.m1": "Leaks",
            "bi.m2": "Broken tiles",
            "bi.m3": "Gutters",
            "bi.z1": "Las Rozas",
            "bi.t1": "24 customers",
            "bi.z2": "Majadahonda",
            "bi.t2": "19 customers",
            "bi.t3": "12 customers"
          },
          "alt": "Photo of a damp patch on the living room ceiling",
          "chat": [
            "Hi, I've got a leak in the living room ceiling",
            "Hi, I'm Irene, the AI assistant. Is it a flat or a house? And which town are you in?",
            "A house, in Las Rozas",
            "Thanks. The inspection visit in Las Rozas is €60, which comes off the bill if you go ahead with the repair. Does Thursday morning suit you?",
            "Yes, Thursday",
            "Noted. The team will confirm the exact time."
          ]
        },
        "jardineria": {
          "sx": {
            "phone.nm": "Your gardening company",
            "chip1.t": "Job understood",
            "chip1.s": "20 m hedge · with photo",
            "chip2.s": "Hedge trimming · €140",
            "chip3.t": "Job logged",
            "chip3.s": "Ready for your team",
            "how1.day": "Saturday · 13:20",
            "how1.msg": "How much to trim a hedge?",
            "how2.h": "Understands the job",
            "how2.k1": "Job",
            "how2.v1": "Hedge trimming",
            "how2.k2": "Length",
            "how2.v2": "20 metres",
            "how3.k1": "Hedge trimming",
            "how3.v1": "€140",
            "how3.v2": "Pozuelo",
            "how4.v1": "Tuesday",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Asks for a full garden job",
            "bi.tag": "Gardening",
            "bi.sub": "Which jobs people ask for, from which towns and how many end up booked.",
            "bi.k3": "jobs booked",
            "bi.h1": "Most requested job",
            "bi.m1": "Hedge trimming",
            "bi.m2": "Maintenance",
            "bi.m3": "Lawns",
            "bi.z1": "Pozuelo",
            "bi.t1": "29 customers",
            "bi.z2": "Boadilla",
            "bi.t2": "21 customers",
            "bi.t3": "11 customers"
          },
          "alt": "Photo of a tall, overgrown hedge in a garden",
          "chat": [
            "Hi, how much would it cost to trim this hedge?",
            "Hi, I'm Marta, the AI assistant. Roughly how many metres long is it? And which town are you in?",
            "About 20 metres, in Pozuelo",
            "Thanks. Trimming 20 m of hedge is €140, with waste removal included. Does Tuesday suit you?",
            "Yes, Tuesday",
            "Noted. The team will confirm the exact time."
          ]
        },
        "cerrajeria": {
          "sx": {
            "phone.nm": "Your locksmith business",
            "chip1.t": "Emergency spotted",
            "chip1.s": "Door shut on the latch",
            "chip2.t": "Price given",
            "chip2.s": "Night lockout · €80",
            "chip3.t": "Passed to your team",
            "chip3.s": "On-call locksmith",
            "how1.day": "Saturday · 01:15",
            "how1.msg": "I've left my keys inside",
            "how2.h": "Understands the emergency",
            "how2.k1": "Emergency",
            "how2.v1": "Locked out",
            "how2.k2": "Locked with key",
            "how2.v2": "No",
            "how2.k3": "Address",
            "how2.v3": "Received",
            "how3.k1": "Night lockout",
            "how3.v1": "€80",
            "how3.v2": "Alcorcón",
            "how4.v1": "Today",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: locked out of the house",
            "bi.tag": "Locksmiths",
            "bi.sub": "What people ask for most, from which towns and how many end in a call-out.",
            "bi.k2": "prices given",
            "bi.k3": "emergency call-outs",
            "bi.h1": "What people ask for most",
            "bi.m1": "Lockouts",
            "bi.m2": "Lock changes",
            "bi.m3": "Security doors",
            "bi.z1": "Alcorcón",
            "bi.t1": "58 customers",
            "bi.z2": "Móstoles",
            "bi.t2": "41 customers",
            "bi.t3": "23 customers"
          },
          "chat": [
            "I've left my keys inside and I can't get in",
            "Hi, I'm Vera, the AI assistant. Is the door just shut on the latch or locked with the key? And which town are you in?",
            "Just on the latch. In Alcorcón",
            "Thanks. A night lockout in Alcorcón is €80. I'm passing it to the on-call locksmith right now.",
            "OK, thanks",
            "Done. He's got your address and he'll call you directly."
          ]
        },
        "talleres": {
          "sx": {
            "phone.nm": "Your garage",
            "chip1.t": "Fault understood",
            "chip1.s": "Engine light · with photo",
            "chip2.t": "Price given",
            "chip2.s": "Diagnostic check · €45",
            "chip3.t": "Appointment booked",
            "chip3.s": "Tomorrow · 9:00",
            "how1.day": "Sunday · 18:40",
            "how1.msg": "A light has come on in my car",
            "how2.h": "Understands the fault",
            "how2.k1": "Fault",
            "how2.v1": "Engine warning light",
            "how2.k2": "Car",
            "how2.v2": "Seat León · 2018",
            "how2.k3": "Photo",
            "how2.v3": "Received",
            "how3.k1": "Diagnostic check",
            "how3.v1": "€45",
            "how3.k2": "If you go ahead",
            "how3.v2": "Deducted",
            "how4.h": "Books the appointment",
            "how4.v1": "Tomorrow 9:00",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Insurance claim",
            "bi.tag": "Garages",
            "bi.sub": "What people ask for most, from which towns and how many end in an appointment.",
            "bi.k2": "prices given",
            "bi.k3": "appointments booked",
            "bi.h1": "What people ask for most",
            "bi.m1": "Servicing",
            "bi.m2": "Brakes",
            "bi.m3": "Tyres",
            "bi.z1": "Getafe",
            "bi.t1": "46 customers",
            "bi.z2": "Parla",
            "bi.t2": "29 customers",
            "bi.t3": "12 customers"
          },
          "alt": "Photo of the car's dashboard with the engine warning light on",
          "chat": [
            "This light has come on in my car",
            "Hi, I'm Alba, the AI assistant. To check it properly we need to run a diagnostic. What car is it and what year?",
            "A 2018 Seat León",
            "Thanks. The diagnostic check is €45, which comes off the bill if you go ahead with the repair. Does tomorrow at 9:00 suit you?",
            "Yes, tomorrow at 9",
            "Booked: tomorrow at 9:00. See you at the garage."
          ]
        },
        "fincas": {
          "sx": {
            "phone.nm": "Your property managers",
            "chip1.t": "Issue understood",
            "chip1.s": "Broken lift · voice note",
            "chip2.t": "Issue logged",
            "chip2.s": "Block 2 · high priority",
            "chip3.t": "Passed to your team",
            "chip3.s": "With the case summary",
            "how1.day": "Sunday · 08:05",
            "how1.msg": "The lift's been broken since yesterday",
            "how2.h": "Understands the issue",
            "how2.k1": "Issue",
            "how2.v1": "Lift out of order",
            "how2.k2": "Building",
            "how2.v2": "Block 2 · Flat 3B",
            "how2.k3": "Voice note",
            "how2.v3": "Transcribed",
            "how3.h": "Logs the issue",
            "how3.k1": "Work order",
            "how3.v1": "Created",
            "how3.k2": "Priority",
            "how3.v2": "High",
            "how3.k3": "Contractor",
            "how3.v3": "Maintenance",
            "how4.h": "Tells the right people",
            "how4.k1": "Property manager",
            "how4.v1": "Notified",
            "how4.k2": "Engineer",
            "how4.v2": "Notified",
            "how4.k3": "Resident",
            "how4.v3": "Notified",
            "how5.alert": "Urgent: leak in communal areas",
            "bi.tag": "Property mgmt",
            "bi.sub": "Which issues keep coming up, in which buildings and how many go to a contractor.",
            "bi.k2": "issues logged",
            "bi.k3": "passed to contractor",
            "bi.h1": "Which issue keeps coming up",
            "bi.m1": "Lift",
            "bi.m2": "Intercom",
            "bi.m3": "Damp",
            "bi.h2": "Which buildings message most",
            "bi.z1": "C/ Mayor, 12",
            "bi.t1": "41 residents",
            "bi.z2": "Av. del Parque, 8",
            "bi.t2": "28 residents",
            "bi.z3": "Pl. de la Fuente, 3",
            "bi.t3": "19 residents"
          },
          "chat": [
            null,
            "Hi, I'm Olga, the AI assistant. Got it: the lift in block 2 has been out of order since yesterday. Is anyone inside?",
            "No, nobody. It just isn't working",
            "Thanks. I've logged the issue as high priority and passed it to the property manager and the lift company.",
            "Perfect, thanks",
            "It's on record. The property manager will confirm when they're coming."
          ]
        },
        "abogados": {
          "sx": {
            "phone.nm": "Your law firm",
            "chip1.t": "Case understood",
            "chip1.s": "Dismissal · employment",
            "chip2.t": "Price given",
            "chip2.s": "First consultation · €60",
            "chip3.t": "Appointment booked",
            "chip3.s": "Tomorrow · 10:00",
            "how1.day": "Thursday · 21:30",
            "how1.msg": "I was fired today",
            "how2.h": "Understands the case",
            "how2.k1": "Matter",
            "how2.v1": "Dismissal",
            "how2.k2": "Area",
            "how2.v2": "Employment",
            "how2.k3": "Dismissal letter",
            "how2.v3": "Has it",
            "how3.k1": "First consultation",
            "how3.v1": "€60",
            "how3.k2": "Area",
            "how3.v2": "Employment",
            "how4.h": "Books the appointment",
            "how4.v1": "Tomorrow 10:00",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Urgent: deadline this week",
            "bi.tag": "Law firms",
            "bi.sub": "Which matters people ask about, from which areas and how many end in an appointment.",
            "bi.k2": "prices given",
            "bi.k3": "appointments booked",
            "bi.h1": "Which matter comes up most",
            "bi.m1": "Dismissals",
            "bi.m2": "Inheritance",
            "bi.m3": "Divorces",
            "bi.z1": "Chamberí",
            "bi.t1": "27 clients",
            "bi.z2": "Tetuán",
            "bi.t2": "18 clients",
            "bi.t3": "9 clients"
          },
          "chat": [
            "Hi, I was fired today and I don't know what to do",
            "Hi, I'm Eva, the AI assistant. I'm sorry that's happened. Have they given you the dismissal letter yet?",
            "Yes, they gave it to me this afternoon",
            "Thanks. It's best to look at these cases quickly. The first consultation is €60. Does tomorrow at 10:00 suit you?",
            "Yes, tomorrow at 10",
            "Booked: tomorrow at 10:00 with an employment lawyer. Bring the dismissal letter."
          ]
        },
        "inmobiliarias": {
          "sx": {
            "phone.nm": "Your estate agency",
            "chip1.t": "Client qualified",
            "chip1.s": "Mortgage pre-approved",
            "chip2.t": "Slot offered",
            "chip2.s": "Saturday · 11:00 or 12:30",
            "chip3.s": "Saturday · 11:00",
            "how1.day": "Friday · 22:05",
            "how1.msg": "Is the flat still available?",
            "how2.h": "Understands what they want",
            "how2.k1": "Flat",
            "how2.v1": "C/ Alcalá · 3 bed",
            "how2.k2": "For",
            "how2.v2": "Living in",
            "how2.k3": "Mortgage",
            "how2.v3": "Pre-approved",
            "how3.h": "Qualifies the buyer",
            "how3.k1": "Price of the flat",
            "how3.v1": "€320,000",
            "how3.k2": "Financing",
            "how3.v2": "Pre-approved",
            "how3.k3": "Good fit",
            "how3.v3": "Yes",
            "how4.v1": "Saturday 11:00",
            "how4.k3": "Calendar appointment",
            "how5.alert": "Wants to make an offer",
            "bi.tag": "Estate agents",
            "bi.sub": "Which flats people ask about, which areas they look in and how many end in a visit.",
            "bi.k2": "qualified buyers",
            "bi.h1": "Most requested flats",
            "bi.m1": "3 bedrooms",
            "bi.m2": "2 bedrooms",
            "bi.m3": "Penthouses",
            "bi.h2": "Which areas they look in",
            "bi.z1": "Chamberí",
            "bi.t1": "52 clients",
            "bi.z2": "Retiro",
            "bi.t2": "38 clients",
            "bi.z3": "Other areas",
            "bi.t3": "36 clients"
          },
          "chat": [
            "Hi, is the flat on Calle Alcalá still available?",
            "Hi, I'm Carla, the AI assistant. Yes, it's still available: 3 bedrooms, €320,000. Is it to live in? Do you need a mortgage?",
            "To live in. My mortgage is pre-approved",
            "Perfect. I can show it to you on Saturday at 11:00 or 12:30. Which suits you better?",
            "At 11",
            "Booked: Saturday at 11:00. An agent from the office will show you round."
          ]
        }
      }
    },
    "ca": {
      "badge": "Responent amb IA",
      "sectors": {
        "plagas": {
          "alt": "Foto d'un niu de vespes sota el ràfec d'una casa",
          "chat": [
            "Hola, tinc un niu de vespes a la façana",
            "Hola, soc la Paula, l'assistent d'IA. A quina alçada és el niu i a quin municipi ets?",
            "En un primer pis, a Torrent",
            "Gràcies. Retirar el niu a Torrent són 85 €. Et va bé demà al matí?",
            "Sí, perfecte",
            "Apuntat. L'equip et confirma l'hora exacta tan bon punt obrin."
          ]
        },
        "clima": {
          "sx": {
            "phone.nm": "La teva empresa de clima",
            "chip1.t": "Avaria entesa",
            "chip1.s": "Vaillant · F28 · amb foto",
            "chip2.t": "Preu donat",
            "chip2.s": "Visita de diagnòstic · 59 €",
            "chip3.s": "A punt per al teu equip",
            "how1.day": "Diumenge · 22:14",
            "how1.msg": "La caldera no s'encén",
            "how2.h": "Entén l'avaria",
            "how2.k1": "Marca",
            "how2.v1": "Vaillant",
            "how2.k2": "Codi d'error",
            "how2.v2": "F28",
            "how3.k1": "Visita de diagnòstic",
            "how3.v1": "59 €",
            "how3.v2": "Getafe",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: sense calefacció",
            "bi.tag": "Climatització",
            "bi.sub": "Quines avaries es repeteixen, de quins municipis i quantes acaben en visita.",
            "bi.k2": "preus donats",
            "bi.h1": "Quina avaria es repeteix",
            "bi.m1": "Caldera no s'encén",
            "bi.m2": "Aire que no refreda",
            "bi.m3": "Pèrdua de pressió",
            "bi.z1": "Getafe",
            "bi.t1": "44 clients",
            "bi.z2": "Leganés",
            "bi.t2": "31 clients",
            "bi.t3": "17 clients"
          },
          "alt": "Foto de la caldera amb el codi F28 a la pantalla",
          "chat": [
            "Hola, la caldera no s'encén i marca F28",
            "Hola, soc la Clara, l'assistent d'IA. Em dius la marca i a quin municipi ets?",
            "Vaillant, a Getafe",
            "Gràcies. La visita de diagnòstic a Getafe són 59 €, que es descompten si fas la reparació. Et va bé demà al matí?",
            "Sí, perfecte",
            "Apuntat. L'equip et confirma l'hora exacta tan bon punt obrin."
          ]
        },
        "limpieza": {
          "sx": {
            "phone.nm": "La teva empresa de neteja",
            "chip1.t": "Encàrrec entès",
            "chip1.s": "Pis de 90 m² · àudio",
            "chip2.s": "Neteja a fons · 180 €",
            "chip3.t": "Neteja apuntada",
            "chip3.s": "A punt per al teu equip",
            "how1.day": "Dissabte · 20:47",
            "how1.msg": "Quant costa una neteja a fons?",
            "how2.h": "Entén l'encàrrec",
            "how2.k1": "Servei",
            "how2.v1": "Neteja a fons",
            "how2.k2": "Habitatge",
            "how2.v2": "90 m² · 2 banys",
            "how2.k3": "Àudio i adreça",
            "how2.v3": "Rebuts",
            "how3.k1": "Neteja a fons",
            "how3.v1": "180 €",
            "how3.v2": "Alcobendas",
            "how4.v1": "Divendres",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Demana parlar amb una persona",
            "bi.tag": "Neteja",
            "bi.sub": "Quins serveis et demanen, de quins municipis i quants acaben agendats.",
            "bi.k3": "neteges agendades",
            "bi.h1": "Quin servei et demanen més",
            "bi.m1": "Neteja a fons",
            "bi.m2": "Final d'obra",
            "bi.m3": "Vidres",
            "bi.z1": "Alcobendas",
            "bi.t1": "36 clients",
            "bi.z2": "Tres Cantos",
            "bi.t2": "22 clients",
            "bi.t3": "15 clients"
          },
          "chat": [
            null,
            "Hola, soc la Sara, l'assistent d'IA. Neteja a fons d'un pis de 90 m² amb dos banys, oi? A quin municipi és?",
            "Sí, això. A Alcobendas",
            "Gràcies. Són 180 € amb els productes inclosos. Et va bé divendres al matí?",
            "Sí, divendres",
            "Apuntat. L'equip et confirma l'hora exacta tan bon punt obrin."
          ]
        },
        "fontaneria": {
          "sx": {
            "phone.nm": "La teva lampisteria",
            "chip1.t": "Urgència entesa",
            "chip1.s": "Fuita a la cuina · àudio",
            "chip2.t": "Preu donat",
            "chip2.s": "Sortida urgent · 90 €",
            "chip3.t": "Passat al teu equip",
            "chip3.s": "Tècnic de guàrdia",
            "how1.day": "Diumenge · 23:42",
            "how1.msg": "Se m'inunda la cuina",
            "how2.h": "Entén l'avaria",
            "how2.k1": "Avaria",
            "how2.v1": "Fuita d'aigua",
            "how2.k2": "On",
            "how2.v2": "Cuina",
            "how2.k3": "Àudio i foto",
            "how2.v3": "Rebuts",
            "how3.k1": "Sortida urgent",
            "how3.v1": "90 €",
            "how3.v2": "Leganés",
            "how4.v1": "Avui",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: fuita d'aigua",
            "bi.tag": "Lampisteria",
            "bi.sub": "Quines avaries es repeteixen, de quins municipis i quantes acaben en visita.",
            "bi.k2": "preus donats",
            "bi.h1": "Quina avaria es repeteix",
            "bi.m1": "Fuites",
            "bi.m2": "Embussos",
            "bi.m3": "Termos",
            "bi.z1": "Leganés",
            "bi.t1": "38 clients",
            "bi.z2": "Getafe",
            "bi.t2": "27 clients",
            "bi.t3": "21 clients"
          },
          "alt": "Foto d'una fuita d'aigua sota l'aigüera",
          "chat": [
            null,
            "Se m'està inundant la cuina",
            "Hola, soc la Nora, l'assistent d'IA. Tanca la clau de pas general. A quin municipi ets?",
            "A Leganés",
            "És una urgència: la sortida a Leganés són 90 €. Ho passo ara mateix al tècnic de guàrdia.",
            "D'acord, gràcies",
            "Fet. Ja té el teu àudio i la teva adreça, i et truca ell directament."
          ]
        },
        "electricidad": {
          "sx": {
            "phone.nm": "Empresa d'electricitat",
            "chip1.t": "Avaria entesa",
            "chip1.s": "Diferencial · amb foto",
            "chip2.t": "Preu donat",
            "chip2.s": "Visita de revisió · 49 €",
            "chip3.s": "A punt per al teu equip",
            "how1.day": "Festiu · 07:40",
            "how1.msg": "Em salta el diferencial",
            "how2.h": "Entén l'avaria",
            "how2.k1": "Avaria",
            "how2.v1": "Salta el diferencial",
            "how2.k2": "Aparell",
            "how2.v2": "Forn",
            "how3.k1": "Visita de revisió",
            "how3.v1": "49 €",
            "how3.v2": "Móstoles",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: sense llum a casa",
            "bi.tag": "Electricitat",
            "bi.sub": "Quines avaries es repeteixen, de quins municipis i quantes acaben en visita.",
            "bi.k2": "preus donats",
            "bi.h1": "Quina avaria es repeteix",
            "bi.m1": "Salta el diferencial",
            "bi.m2": "Endolls",
            "bi.m3": "Quadre elèctric",
            "bi.z1": "Móstoles",
            "bi.t1": "33 clients",
            "bi.z2": "Alcorcón",
            "bi.t2": "25 clients",
            "bi.t3": "14 clients"
          },
          "alt": "Foto del quadre elèctric d'una casa",
          "chat": [
            "Bones, em salta el diferencial cada cop que encenc el forn",
            "Hola, soc l'Elena, l'assistent d'IA. Et passa només amb el forn? I a quin municipi ets?",
            "Només amb el forn. A Móstoles",
            "Gràcies. La visita de revisió a Móstoles són 49 €. Et va bé demà a la tarda?",
            "Sí, a partir de les 17",
            "Apuntat. L'equip et confirma l'hora exacta."
          ]
        },
        "tejados": {
          "sx": {
            "phone.nm": "Empresa de teulades",
            "chip1.t": "Avaria entesa",
            "chip1.s": "Gotera · amb foto",
            "chip2.t": "Preu donat",
            "chip2.s": "Visita d'inspecció · 60 €",
            "chip3.s": "A punt per al teu equip",
            "how1.day": "Diumenge · 08:12",
            "how1.msg": "Tinc una gotera al menjador",
            "how2.h": "Entén l'avaria",
            "how2.k1": "Avaria",
            "how2.v1": "Gotera",
            "how2.k2": "Habitatge",
            "how2.v2": "Casa",
            "how3.k1": "Visita d'inspecció",
            "how3.v1": "60 €",
            "how3.v2": "Las Rozas",
            "how4.v1": "Dijous",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: entra aigua a casa",
            "bi.tag": "Teulades",
            "bi.sub": "Quines avaries es repeteixen, de quins municipis i quantes acaben en visita.",
            "bi.k2": "preus donats",
            "bi.h1": "Quina avaria es repeteix",
            "bi.m1": "Goteres",
            "bi.m2": "Teules trencades",
            "bi.m3": "Canalons",
            "bi.z1": "Las Rozas",
            "bi.t1": "24 clients",
            "bi.z2": "Majadahonda",
            "bi.t2": "19 clients",
            "bi.t3": "12 clients"
          },
          "alt": "Foto d'una taca d'humitat al sostre del menjador",
          "chat": [
            "Hola, tinc una gotera al sostre del menjador",
            "Hola, soc la Irene, l'assistent d'IA. És un pis o una casa? I a quin municipi ets?",
            "Una casa, a Las Rozas",
            "Gràcies. La visita d'inspecció a Las Rozas són 60 €, que es descompten si fas la reparació. Et va bé dijous al matí?",
            "Sí, dijous",
            "Apuntat. L'equip et confirma l'hora exacta."
          ]
        },
        "jardineria": {
          "sx": {
            "phone.nm": "La teva jardineria",
            "chip1.t": "Encàrrec entès",
            "chip1.s": "Tanca de 20 m · amb foto",
            "chip2.s": "Poda de tanca · 140 €",
            "chip3.t": "Feina apuntada",
            "chip3.s": "A punt per al teu equip",
            "how1.day": "Dissabte · 13:20",
            "how1.msg": "Quant costa podar una tanca?",
            "how2.h": "Entén l'encàrrec",
            "how2.k1": "Feina",
            "how2.v1": "Poda de tanca",
            "how2.k2": "Llargada",
            "how2.v2": "20 metres",
            "how3.k1": "Poda de tanca",
            "how3.v1": "140 €",
            "how3.v2": "Pozuelo",
            "how4.v1": "Dimarts",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Demana un jardí complet",
            "bi.tag": "Jardineria",
            "bi.sub": "Quines feines et demanen, de quins municipis i quantes acaben agendades.",
            "bi.k3": "feines agendades",
            "bi.h1": "Quina feina et demanen més",
            "bi.m1": "Poda de tanques",
            "bi.m2": "Manteniment",
            "bi.m3": "Gespa",
            "bi.z1": "Pozuelo",
            "bi.t1": "29 clients",
            "bi.z2": "Boadilla",
            "bi.t2": "21 clients",
            "bi.t3": "11 clients"
          },
          "alt": "Foto d'una tanca vegetal alta i sense podar en un jardí",
          "chat": [
            "Hola, quant em costaria podar aquesta tanca?",
            "Hola, soc la Marta, l'assistent d'IA. Quants metres de llarg fa, més o menys? I a quin municipi ets?",
            "Uns 20 metres, a Pozuelo",
            "Gràcies. Podar 20 m de tanca són 140 €, amb la retirada de restes inclosa. Et va bé dimarts?",
            "Sí, dimarts",
            "Apuntat. L'equip et confirma l'hora exacta."
          ]
        },
        "cerrajeria": {
          "sx": {
            "phone.nm": "La teva serralleria",
            "chip1.t": "Urgència entesa",
            "chip1.s": "Porta tancada de cop",
            "chip2.t": "Preu donat",
            "chip2.s": "Obertura nocturna · 80 €",
            "chip3.t": "Passat al teu equip",
            "chip3.s": "Serraller de guàrdia",
            "how1.day": "Dissabte · 01:15",
            "how1.msg": "M'he deixat les claus a dins",
            "how2.h": "Entén la urgència",
            "how2.k1": "Urgència",
            "how2.v1": "Porta tancada",
            "how2.k2": "Tancada amb clau",
            "how2.v2": "No",
            "how2.k3": "Adreça",
            "how2.v3": "Rebuda",
            "how3.k1": "Obertura nocturna",
            "how3.v1": "80 €",
            "how3.v2": "Alcorcón",
            "how4.v1": "Avui",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: no pot entrar a casa",
            "bi.tag": "Serralleria",
            "bi.sub": "Què et demanen més, de quins municipis i quantes acaben en sortida.",
            "bi.k2": "preus donats",
            "bi.k3": "sortides urgents",
            "bi.h1": "Què et demanen més",
            "bi.m1": "Obertures",
            "bi.m2": "Canvis de pany",
            "bi.m3": "Portes blindades",
            "bi.z1": "Alcorcón",
            "bi.t1": "58 clients",
            "bi.z2": "Móstoles",
            "bi.t2": "41 clients",
            "bi.t3": "23 clients"
          },
          "chat": [
            "M'he deixat les claus a dins i no puc entrar",
            "Hola, soc la Vera, l'assistent d'IA. La porta està tancada només de cop o amb clau? I a quin municipi ets?",
            "Només de cop. A Alcorcón",
            "Gràcies. L'obertura nocturna a Alcorcón són 80 €. Ho passo ara mateix al serraller de guàrdia.",
            "D'acord, gràcies",
            "Fet. Ja té la teva adreça i et truca ell directament."
          ]
        },
        "talleres": {
          "sx": {
            "phone.nm": "El teu taller",
            "chip1.t": "Avaria entesa",
            "chip1.s": "Testimoni de motor · foto",
            "chip2.t": "Preu donat",
            "chip2.s": "Diagnosi · 45 €",
            "chip3.t": "Cita apuntada",
            "chip3.s": "Demà · 9:00",
            "how1.day": "Diumenge · 18:40",
            "how1.msg": "Se m'ha encès un llum del cotxe",
            "how2.h": "Entén l'avaria",
            "how2.k1": "Avaria",
            "how2.v1": "Testimoni de motor",
            "how2.k2": "Cotxe",
            "how2.v2": "Seat León · 2018",
            "how2.k3": "Foto",
            "how2.v3": "Rebuda",
            "how3.k1": "Diagnosi",
            "how3.v1": "45 €",
            "how3.k2": "Si repares",
            "how3.v2": "Es descompta",
            "how4.h": "Agenda la cita",
            "how4.v1": "Demà 9:00",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Sinistre amb l'assegurança",
            "bi.tag": "Tallers",
            "bi.sub": "Què et demanen més, de quins municipis i quants acaben amb cita.",
            "bi.k2": "preus donats",
            "bi.k3": "cites agendades",
            "bi.h1": "Què et demanen més",
            "bi.m1": "Revisions",
            "bi.m2": "Frens",
            "bi.m3": "Pneumàtics",
            "bi.z1": "Getafe",
            "bi.t1": "46 clients",
            "bi.z2": "Parla",
            "bi.t2": "29 clients",
            "bi.t3": "12 clients"
          },
          "alt": "Foto del quadre del cotxe amb el testimoni d'avaria del motor encès",
          "chat": [
            "Se m'ha encès aquest llum al cotxe",
            "Hola, soc l'Alba, l'assistent d'IA. Per veure-ho bé cal passar-li la diagnosi. Quin cotxe és i de quin any?",
            "Un Seat León del 2018",
            "Gràcies. La diagnosi són 45 €, que es descompten si fas la reparació. Et va bé demà a les 9:00?",
            "Sí, demà a les 9",
            "Apuntat: demà a les 9:00. T'esperem al taller."
          ]
        },
        "fincas": {
          "sx": {
            "phone.nm": "Administració de finques",
            "chip1.t": "Incidència entesa",
            "chip1.s": "Ascensor aturat · àudio",
            "chip2.t": "Incidència oberta",
            "chip2.s": "Portal 2 · prioritat alta",
            "chip3.t": "Passat al teu equip",
            "chip3.s": "Amb el resum del cas",
            "how1.day": "Diumenge · 08:05",
            "how1.msg": "L'ascensor està aturat des d'ahir",
            "how2.h": "Entén la incidència",
            "how2.k1": "Incidència",
            "how2.v1": "Ascensor aturat",
            "how2.k2": "Comunitat",
            "how2.v2": "Portal 2 · 3r B",
            "how2.k3": "Àudio",
            "how2.v3": "Transcrit",
            "how3.h": "Obre la incidència",
            "how3.k1": "Comunicat",
            "how3.v1": "Creat",
            "how3.k2": "Prioritat",
            "how3.v2": "Alta",
            "how3.k3": "Proveïdor",
            "how3.v3": "Manteniment",
            "how4.h": "Informa a qui toca",
            "how4.k1": "Administrador",
            "how4.v1": "Informat",
            "how4.k2": "Tècnic",
            "how4.v2": "Informat",
            "how4.k3": "Veí",
            "how4.v3": "Informat",
            "how5.alert": "Urgent: fuita a zones comunes",
            "bi.tag": "Finques",
            "bi.sub": "Quines incidències es repeteixen, a quines comunitats i quantes passen a proveïdor.",
            "bi.k2": "incidències obertes",
            "bi.k3": "passades a proveïdor",
            "bi.h1": "Quina incidència es repeteix",
            "bi.m1": "Ascensor",
            "bi.m2": "Porter automàtic",
            "bi.m3": "Humitats",
            "bi.h2": "Quines comunitats escriuen més",
            "bi.z1": "C/ Mayor, 12",
            "bi.t1": "41 veïns",
            "bi.z2": "Av. del Parque, 8",
            "bi.t2": "28 veïns",
            "bi.z3": "Pl. de la Fuente, 3",
            "bi.t3": "19 veïns"
          },
          "chat": [
            null,
            "Hola, soc l'Olga, l'assistent d'IA. Entesos: l'ascensor del portal 2 està aturat des d'ahir. Hi ha algú a dins?",
            "No, ningú. Només que no funciona",
            "Gràcies. He obert la incidència amb prioritat alta i l'he passat a l'administrador i a l'empresa de l'ascensor.",
            "Perfecte, gràcies",
            "Queda registrada. L'administrador et confirma quan venen."
          ]
        },
        "abogados": {
          "sx": {
            "phone.nm": "El teu despatx",
            "chip1.t": "Cas entès",
            "chip1.s": "Acomiadament · laboral",
            "chip2.t": "Preu donat",
            "chip2.s": "Primera consulta · 60 €",
            "chip3.t": "Cita apuntada",
            "chip3.s": "Demà · 10:00",
            "how1.day": "Dijous · 21:30",
            "how1.msg": "M'han acomiadat avui",
            "how2.h": "Entén el cas",
            "how2.k1": "Assumpte",
            "how2.v1": "Acomiadament",
            "how2.k2": "Àrea",
            "how2.v2": "Laboral",
            "how2.k3": "Carta d'acomiadament",
            "how2.v3": "La té",
            "how3.k1": "Primera consulta",
            "how3.v1": "60 €",
            "how3.k2": "Àrea",
            "how3.v2": "Laboral",
            "how4.h": "Agenda la cita",
            "how4.v1": "Demà 10:00",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Urgent: termini aquesta setmana",
            "bi.tag": "Advocats",
            "bi.sub": "Quins assumptes et consulten, de quines zones i quants acaben amb cita.",
            "bi.k2": "preus donats",
            "bi.k3": "cites agendades",
            "bi.h1": "Quin assumpte et consulten més",
            "bi.m1": "Acomiadaments",
            "bi.m2": "Herències",
            "bi.m3": "Divorcis",
            "bi.z1": "Chamberí",
            "bi.t1": "27 clients",
            "bi.z2": "Tetuán",
            "bi.t2": "18 clients",
            "bi.t3": "9 clients"
          },
          "chat": [
            "Bones, m'han acomiadat avui i no sé què fer",
            "Hola, soc l'Eva, l'assistent d'IA. Em sap greu el que t'ha passat. T'han donat ja la carta d'acomiadament?",
            "Sí, me l'han donat aquesta tarda",
            "Gràcies. Aquests casos convé veure'ls aviat. La primera consulta són 60 €. Et va bé demà a les 10:00?",
            "Sí, demà a les 10",
            "Apuntat: demà a les 10:00 amb una advocada laboralista. Porta la carta d'acomiadament."
          ]
        },
        "inmobiliarias": {
          "sx": {
            "phone.nm": "La teva immobiliària",
            "chip1.t": "Client qualificat",
            "chip1.s": "Hipoteca preaprovada",
            "chip2.t": "Hora proposada",
            "chip2.s": "Dissabte · 11:00 o 12:30",
            "chip3.s": "Dissabte · 11:00",
            "how1.day": "Divendres · 22:05",
            "how1.msg": "Encara està disponible el pis?",
            "how2.h": "Entén què busca",
            "how2.k1": "Pis",
            "how2.v1": "C/ Alcalá · 3 hab.",
            "how2.k2": "Per a",
            "how2.v2": "Viure-hi",
            "how2.k3": "Hipoteca",
            "how2.v3": "Preaprovada",
            "how3.h": "Qualifica el comprador",
            "how3.k1": "Preu del pis",
            "how3.v1": "320.000 €",
            "how3.k2": "Finançament",
            "how3.v2": "Preaprovat",
            "how3.k3": "Encaixa",
            "how3.v3": "Sí",
            "how4.v1": "Dissabte 11:00",
            "how4.k3": "Cita al teu calendari",
            "how5.alert": "Vol fer una oferta",
            "bi.tag": "Immobiliàries",
            "bi.sub": "Quins pisos et demanen, a quines zones busquen i quants acaben en visita.",
            "bi.k2": "compradors qualificats",
            "bi.h1": "Quins pisos et demanen més",
            "bi.m1": "3 habitacions",
            "bi.m2": "2 habitacions",
            "bi.m3": "Àtics",
            "bi.h2": "Quines zones busquen",
            "bi.z1": "Chamberí",
            "bi.t1": "52 clients",
            "bi.z2": "Retiro",
            "bi.t2": "38 clients",
            "bi.z3": "Altres zones",
            "bi.t3": "36 clients"
          },
          "chat": [
            "Hola, encara està disponible el pis del carrer Alcalá?",
            "Hola, soc la Carla, l'assistent d'IA. Sí, encara està disponible: 3 habitacions, 320.000 €. El vols per viure-hi? Necessites hipoteca?",
            "Per viure-hi. Tinc la hipoteca preaprovada",
            "Perfecte. Te'l puc ensenyar dissabte a les 11:00 o a les 12:30. Què et va millor?",
            "A les 11",
            "Apuntat: dissabte a les 11:00. T'acompanya un agent de l'oficina."
          ]
        }
      }
    }
  };
  const TR = L10N[LANG];
  if (TR) {
    Object.keys(SECTORS).forEach(k => {
      const S = SECTORS[k], T = TR.sectors[k];
      if (!T) return;
      if (T.sx) S.sx = Object.assign({}, S.sx, T.sx);
      if (T.alt) S.alt = T.alt;
      if (T.chat) S.chat.forEach((m, i) => { if (T.chat[i] != null) m.text = T.chat[i]; });
    });
  }
  const BADGE = (TR && TR.badge) || 'Respondiendo con IA';

  /* ---------- Render de una burbuja ---------- */
  function bubbleHTML(m, S) {
    let inner = '';
    if (m.photo) inner += photo(S.img, S.alt);
    if (m.audio) {
      inner += '<div class="audio"><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span class="wave"></span><span class="dur">' + m.audio + '</span></div>';
    }
    if (m.text) inner += m.text;
    inner += '<span class="time">' + (m.time || '') + (m.tick ? ' ' + ticks : '') + '</span>';
    return inner;
  }

  const demo = document.querySelector('.hm-demo');
  const body = document.querySelector('#homePhone .wa-body');
  const stage = demo && demo.querySelector('.setter-stage');
  if (!body || !stage) return;

  /* ---------- Móvil: chat en bucle + acciones sincronizadas (se reinicia al cambiar de sector) ---------- */
  const chips = stage.querySelectorAll('.stage-chip');
  const light = (step) => chips.forEach(c => {
    if (Number(c.dataset.step) <= step) c.classList.add('on');
  });
  const addMsg = (m, S) => {
    const el = document.createElement('div');
    el.className = 'msg ' + (m.kind === 'out' ? 'out' : 'in');
    el.innerHTML = bubbleHTML(m, S);
    body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    body.scrollTop = body.scrollHeight;
  };

  let token = 0;
  async function play(S) {
    const chat = S.chat;
    const my = ++token;
    body.innerHTML = '';
    chips.forEach(c => c.classList.remove('on'));
    if (reduceMotion) { chat.forEach(m => addMsg(m, S)); return; } // sin animación: conversación completa

    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';

    let badgeShown = false;
    await sleep(400);

    for (const m of chat) {
      if (my !== token) return;
      if (m.kind === 'out') {
        if (!badgeShown) {
          const badge = document.createElement('div');
          badge.className = 'ia-badge';
          badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21 8 13.9 2 9.4h7.6z"/></svg> ' + BADGE;
          body.appendChild(badge);
          requestAnimationFrame(() => badge.classList.add('show'));
          badgeShown = true;
          await sleep(500);
          if (my !== token) return;
        }
        body.appendChild(typing);
        typing.classList.add('show');
        body.scrollTop = body.scrollHeight;
        await sleep(1150);
        if (my !== token) return;
        typing.classList.remove('show');
        if (typing.parentNode) typing.parentNode.removeChild(typing);
      }
      addMsg(m, S);
      if (m.step) light(m.step);
      await sleep(m.kind === 'out' ? 1100 : 800);
    }

    if (my !== token) return;
    light(99);
    // Bucle: al terminar, espera y se reinicia sola
    await sleep(4200);
    if (my === token) play(S);
  }

  /* ---------- Selector de sector ---------- */
  const pills = document.querySelectorAll('.hm-sector[data-sector]');
  const swaps = document.querySelectorAll('[data-sx]');
  const bars = document.querySelectorAll('[data-sxv]'); // barras de reparto: su ancho sale del mismo texto ("41%")
  const ava = document.querySelector('#homePhone .ava');
  // los textos del sector por defecto viven en el HTML: se guardan para poder volver a él
  const base = {};
  swaps.forEach(el => { if (!(el.dataset.sx in base)) base[el.dataset.sx] = el.innerHTML; });

  const avatar = (d) => '<svg viewBox="0 0 38 38" aria-hidden="true"><rect width="38" height="38" fill="#1A3040"/><path transform="translate(9 9) scale(.83)" fill="none" stroke="#16ABF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="' + d + '"/></svg>';

  let current = null;
  let started = false; // el chat arranca cuando el móvil entra en pantalla (o al elegir sector)
  function setSector(key) {
    const S = SECTORS[key];
    if (!S || key === current) return;
    current = key;
    document.documentElement.setAttribute('data-sector', key);
    pills.forEach(t => {
      const on = t.dataset.sector === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const val = (k) => (S.sx && Object.prototype.hasOwnProperty.call(S.sx, k)) ? S.sx[k] : base[k];
    swaps.forEach(el => {
      const v = val(el.dataset.sx);
      if (el.innerHTML !== v) el.innerHTML = v;
    });
    bars.forEach(el => el.style.setProperty('--v', val(el.dataset.sxv)));
    if (ava) ava.innerHTML = avatar(S.icon);
    if (started || reduceMotion) play(S);
  }

  // qué sector elige cada visita (dataLayer + gtag, como click_whatsapp)
  function track(key, el) {
    const sec = el.closest('[data-screen-label]');
    const loc = sec ? sec.getAttribute('data-screen-label') : 'Otro';
    const lang = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'sector_select', sector: key, cta_location: loc, language: lang });
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'sector_select', { sector: key, cta_location: loc, language: lang });
    }
  }
  function choose(el) {
    const key = el.dataset.sector;
    if (key !== current) track(key, el);
    started = true;
    setSector(key);
  }
  pills.forEach(t => t.addEventListener('click', () => choose(t)));

  // ?sector=clima abre la página con ese sector ya elegido (enlaces de anuncios o de prospección)
  let initial = DEFAULT_SECTOR;
  try {
    const q = (new URLSearchParams(location.search).get('sector') || '').toLowerCase();
    if (Object.prototype.hasOwnProperty.call(SECTORS, q)) initial = q;
  } catch (e) {}
  setSector(initial);

  if (!reduceMotion) {
    stage.classList.add('live');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) { started = true; play(SECTORS[current]); }
      });
    }, { threshold: 0.3 });
    io.observe(body);
  }

  // las fotos de los demás sectores se piden con la página ya cargada: al cambiar no hay parpadeo
  window.addEventListener('load', () => {
    setTimeout(() => {
      Object.keys(SECTORS).forEach(k => {
        if (k !== current && SECTORS[k].img) { const i = new Image(); i.src = SECTORS[k].img; }
      });
    }, 1500);
  });
})();
