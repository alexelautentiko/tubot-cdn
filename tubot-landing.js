/* ============================================================
   TUBOT landing — interacciones
   ============================================================ */
(function () {
  'use strict';

  /* ---------- i18n (ES por defecto; EN/CA según el locale que sirve Webflow) ---------- */
  // Webflow pone <html lang> por locale (/en/ y /ca/); en local se puede forzar con ?lang=en|ca.
  const LANG = (function () {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'ca') return q;
    } catch (e) {}
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return (l === 'en' || l === 'ca') ? l : 'es';
  })();

  const NUM_LOCALE = { es: 'es-ES', en: 'en-GB', ca: 'ca-ES' }[LANG];

  // Los valores sustituyen el innerHTML completo del elemento anotado: si el original
  // lleva markup anidado (span.grad-text, strong, time…), el valor debe llevarlo igual.
  const I18N = {
    en: {
      "a11y.lang": "Language",
      "cta": "I want mine",
      "sticky.short": "I want it",
      "note": "Lara, Tubot's AI, replies in seconds.",
      "hero.eyebrow": "AI agent for service businesses",
      "hero.h1pre": "More messages answered,",
      "hero.words": "more jobs invoiced.|more visits booked.|more quotes accepted.|more customers won.|less work.|less stress.|fewer mistakes.",
      "hero.word1": "more jobs invoiced.",
      "hero.sub": "An AI agent answers your WhatsApp 24/7, quotes and books the visit.",
      "hero.channels": "Works on",
      "hero.pick": "See it in your sector",
      "a11y.sector": "Sector",
      "sec.plagas": "Pest control",
      "sec.clima": "HVAC",
      "sec.limpieza": "Cleaning",
      "sec.fontaneria": "Plumbing",
      "sec.electricidad": "Electrical",
      "sec.fincas": "Property mgmt",
      "sec.tejados": "Roofing",
      "sec.jardineria": "Gardening",
      "sec.cerrajeria": "Locksmiths",
      "sec.talleres": "Garages",
      "sec.abogados": "Law firms",
      "sec.inmobiliarias": "Estate agents",
      "hero.status": "online",
      "hero.live": "Live",
      "proof.label": "They trust Tubot",
      "proof.x2": "customers multiplied",
      "proof.quote": "Before, customers would message, the reply was slow and they went to a competitor. Now they get the quote and the appointment right away.",
      "proof.visits": "visits booked <span>right in the chat</span>",
      "proof.chats": "enquiries handled <span>on WhatsApp, at any hour</span>",
      "proof.who": "Figures from Tubot clients",
      "how.eyebrow": "How it works",
      "how.title": "Trained on your rates, <em class=\"serif-em grad-text\">your areas and your calendar.</em>",
      "how.sub": "It serves customers like your best employee would.",
      "how.c1tag": "Answered right away",
      "how.c1": "Answers right away",
      "how.c5k1": "Summary to your team",
      "how.c5v1": "Sent",
      "how.c5k2": "The AI",
      "how.c5v2": "Steps aside",
      "how.c5": "Hands over to the human team",
      "how.intg": "We connect it to your calendar and your management software",
      "how.more": "and others with an API",
      "bi.eyebrow": "Business intelligence",
      "bi.title": "Decide with data, <em class=\"serif-em grad-text\">not guesswork.</em>",
      "bi.head": "Your summary",
      "bi.month": "September summary",
      "bi.k1": "conversations handled",
      "bi.time": "1 Oct · 09:00",
      "bi.reply": "View details",
      "price.eyebrow": "Pricing",
      "price.title": "From <em class=\"serif-em grad-text\">€249/month</em>",
      "price.l1": "No set-up fee",
      "price.l2": "Annual commitment",
      "price.l3": "Maintenance, support and improvements included",
      "price.l4": "Up and running in a week",
      "faq.q1": "What is Tubot?",
      "faq.a1": "Tubot is a Spanish company that builds WhatsApp AI agents for service businesses. We train it on your rates and your areas, connect it to your management software and run it for you.",
      "faq.q2": "Does it work with my management software?",
      "faq.a2": "It's already connected to Evisane and Google Calendar. With other software, such as STEL Order or Fixner, we connect it if they have an API. If not, your team gets each customer's details by email.",
      "faq.q3": "What if it gets a price wrong?",
      "faq.a3": "The AI doesn't work out the price: it comes from a calculator loaded with your rates. Anything that isn't on your list goes to your team.",
      "faq.q4": "What happens when someone on my team replies?",
      "faq.a4": "The AI goes quiet in that conversation and leaves you to it.",
      "faq.q5": "Do my customers know they're talking to an AI?",
      "faq.a5": "Yes. It introduces itself as an AI assistant from the first message. It's required in the European Union.",
      "faq.q6": "What if my business is in another sector?",
      "faq.a6": "If your customers message you to ask for a price or an appointment, it works the same. Tell Lara and we'll look at it.",
      "final.title": "Talk to Lara, <em class=\"serif-em grad-text\">Tubot's AI.</em>",
      "final.lead": "Yours replies just as fast, with your rates and your areas. In a week it's on your WhatsApp.",
      "final.live": "Lara online",
      "final.qrAlt": "QR code to message Lara, Tubot's AI, on WhatsApp",
      "final.qrCap": "Scan and message her",
      "foot.meta": "WhatsApp AI agents · <a href=\"mailto:hola@tubot.es\">hola@tubot.es</a>",
      "foot.tp": "Reviews on Trustpilot",
      "foot.legal": "© 2026 Tubot. All rights reserved. · <a href=\"https://tubot.es/recepcionista-ia-plagas\" rel=\"noopener\">Pest control</a> · <a href=\"https://tubot.es/recepcionista-ia-climatizacion\" rel=\"noopener\">HVAC and boilers</a> · <a href=\"https://tubot.es/setter-ia\" rel=\"noopener\">AI setter</a> · <a href=\"https://tubot.es/setter-instagram\" rel=\"noopener\">Setter for Instagram</a> · <a href=\"https://tubot.es/automatizacion-whatsapp\" rel=\"noopener\">WhatsApp automation</a> · <a href=\"https://tubot.es/contact\" target=\"_blank\" rel=\"noopener\">Contact</a> · <a href=\"https://tubot.es/blogs\" target=\"_blank\" rel=\"noopener\">Blog</a> · <a href=\"https://tubot.es/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy policy</a>",
      "a11y.waFloat": "Talk to Lara, Tubot's AI, on WhatsApp",
      "sticky.title": "Your WhatsApp AI agent",
      "sticky.sub": "Lara, Tubot's AI, will reply",
      "sx.phone.nm": "Your pest control company",
      "sx.chip1.t": "Pest understood",
      "sx.chip1.s": "Wasps · with photo",
      "sx.chip2.t": "Quote given",
      "sx.chip2.s": "Nest removal · €85",
      "sx.chip3.t": "Visit logged",
      "sx.chip3.s": "In your software",
      "sx.how1.day": "Sunday · 16:32",
      "sx.how1.msg": "I've got a wasp nest",
      "sx.how2.k1": "Pest",
      "sx.how2.v1": "Wasps",
      "sx.how2.k2": "Nest height",
      "sx.how2.v2": "First floor",
      "sx.how2.k3": "Photo and address",
      "sx.how2.v3": "Received",
      "sx.how2.h": "Understands the problem",
      "sx.how3.k1": "Nest removal",
      "sx.how3.v1": "€85",
      "sx.how3.k2": "Service area",
      "sx.how3.v2": "Torrent",
      "sx.how3.k3": "Calculated with",
      "sx.how3.v3": "Your rates",
      "sx.how3.h": "Quotes a price",
      "sx.how4.k1": "Slot offered",
      "sx.how4.v1": "Tomorrow",
      "sx.how4.k2": "Customer record",
      "sx.how4.v2": "Created",
      "sx.how4.k3": "Appointment in Evisane",
      "sx.how4.v3": "Created",
      "sx.how4.h": "Books the visit",
      "sx.how5.alert": "Not on your price list",
      "sx.bi.sub": "Which pests people ask about, from which towns and how many end in a visit.",
      "sx.bi.tag": "Pest control",
      "sx.bi.k2": "quotes given",
      "sx.bi.k3": "visits booked",
      "sx.bi.m1": "Cockroaches",
      "sx.bi.m2": "Rodents",
      "sx.bi.m3": "Wasps",
      "sx.bi.h1": "Which pest comes up most",
      "sx.bi.z1": "Torrent",
      "sx.bi.t1": "41 customers",
      "sx.bi.z2": "Paterna",
      "sx.bi.t2": "28 customers",
      "sx.bi.z3": "Outside your area",
      "sx.bi.t3": "19 customers",
      "sx.bi.h2": "Where they message you from",
      "seo.title": "TUBOT | WhatsApp AI agent for service businesses",
      "seo.desc": "WhatsApp AI agent for pest control, HVAC, cleaning, plumbing and electrical businesses: it replies to your customers at any hour, quotes and books the visit. From €249/month.",
      "seo.orgDesc": "Tubot is a Spanish company that builds and runs WhatsApp AI agents for service businesses: pest control, HVAC, cleaning, plumbing and electrical. The agent replies to customers at any hour, quotes using the business's rates, books the visit and passes the cases that need a person on to the team.",
      "seo.svcName": "WhatsApp AI agent for service businesses",
      "seo.svcType": "Customer service, quotes and visit booking on WhatsApp with artificial intelligence",
      "seo.svcDesc": "Tubot's AI agent replies on WhatsApp to a service business's customers at any hour: it understands text, voice notes and photos, gives the price using a calculator loaded with the business's rates, checks the service area, logs the visit for the team and passes on urgent cases and anything not on the price list. The owner gets the figures for what has come in: conversations, quotes and visits. It always introduces itself as an AI assistant. It runs on the official WhatsApp Business API, is trained for each business and is operated by Tubot: set-up, maintenance, support and ongoing improvement. From €249/month, with no set-up fee and an annual commitment.",
      "seo.svcAud": "Service businesses with an office or a coordinator (pest control, HVAC, cleaning, plumbing and electrical) whose customers message on WhatsApp to ask for a price and a visit",
      "wa.agente": "Hi, I want an AI agent for my business",
      "lead.title": "We'll message you on WhatsApp right now",
      "lead.sub": "Leave your name and number. Our AI will message you in seconds.",
      "lead.name": "Name",
      "lead.namePh": "Your name",
      "lead.phone": "WhatsApp",
      "lead.phonePh": "+44 7700 900000",
      "lead.consent": "I agree to Tubot messaging me on WhatsApp and accept the <a href=\"https://tubot.es/en/privacy-policy\" target=\"_blank\" rel=\"noopener\">privacy policy</a>.",
      "lead.submit": "Message me on WhatsApp",
      "lead.sending": "Sending…",
      "lead.micro": "No commitment · No spam",
      "lead.alt": "Prefer to write to us yourself? <span>Open WhatsApp</span>",
      "lead.okTitle": "Done, {name}!",
      "lead.okText": "We've just messaged you at <strong>{phone}</strong>. Open WhatsApp on your phone.",
      "lead.okBtn": "Got it",
      "lead.errName": "Tell us your name (letters only).",
      "lead.errPhone": "Check the number (include the country code, e.g. +44).",
      "lead.errConsent": "We need your consent to message you.",
      "lead.errSend": "We couldn't send it. Try again or open WhatsApp directly.",
      "lead.close": "Close"
    },
    ca: {
      "a11y.lang": "Idioma",
      "cta": "Vull el meu",
      "sticky.short": "El vull",
      "note": "Et contesta la Lara, la IA de Tubot, en segons.",
      "hero.eyebrow": "Agent d'IA per a empreses de serveis",
      "hero.h1pre": "Més missatges contestats,",
      "hero.words": "més feines facturades.|més visites agendades.|més pressupostos acceptats.|més clients guanyats.|menys feina.|menys estrès.|menys errors.",
      "hero.word1": "més feines facturades.",
      "hero.sub": "Un agent d'IA contesta el teu WhatsApp 24/7, pressuposta i agenda la visita.",
      "hero.channels": "Funciona a",
      "hero.pick": "Mira-ho al teu sector",
      "a11y.sector": "Sector",
      "sec.plagas": "Plagues",
      "sec.clima": "Climatització",
      "sec.limpieza": "Neteja",
      "sec.fontaneria": "Lampisteria",
      "sec.electricidad": "Electricitat",
      "sec.fincas": "Finques",
      "sec.tejados": "Teulades",
      "sec.jardineria": "Jardineria",
      "sec.cerrajeria": "Serralleria",
      "sec.talleres": "Tallers",
      "sec.abogados": "Advocats",
      "sec.inmobiliarias": "Immobiliàries",
      "hero.status": "en línia",
      "hero.live": "En directe",
      "proof.label": "Confien en Tubot",
      "proof.x2": "clients multiplicats",
      "proof.quote": "Abans, els clients escrivien, la resposta trigava i se n'anaven a la competència. Ara tenen el pressupost i la cita al moment.",
      "proof.visits": "visites agendades <span>directament al xat</span>",
      "proof.chats": "consultes ateses <span>per WhatsApp, a qualsevol hora</span>",
      "proof.who": "Xifres de clients de Tubot",
      "how.eyebrow": "Com funciona",
      "how.title": "Entrenat amb les teves tarifes, <em class=\"serif-em grad-text\">les teves zones i la teva agenda.</em>",
      "how.sub": "Atén com ho faria el teu millor empleat.",
      "how.c1tag": "Contestat al moment",
      "how.c1": "Contesta al moment",
      "how.c5k1": "Resum al teu equip",
      "how.c5v1": "Enviat",
      "how.c5k2": "La IA",
      "how.c5v2": "S'aparta",
      "how.c5": "Escala a l'equip humà",
      "how.intg": "El connectem amb el teu calendari i el teu programa de gestió",
      "how.more": "i altres amb API",
      "bi.eyebrow": "Intel·ligència de negoci",
      "bi.title": "Decideix amb dades, <em class=\"serif-em grad-text\">no a ull.</em>",
      "bi.head": "El teu resum",
      "bi.month": "Resum de setembre",
      "bi.k1": "converses ateses",
      "bi.time": "1 oct. · 09:00",
      "bi.reply": "Veure detall",
      "price.eyebrow": "Preu",
      "price.title": "Des de <em class=\"serif-em grad-text\">249 €/mes</em>",
      "price.l1": "Sense cost d'alta",
      "price.l2": "Compromís anual",
      "price.l3": "Manteniment, suport i millores inclosos",
      "price.l4": "Funcionant en una setmana",
      "faq.q1": "Què és Tubot?",
      "faq.a1": "Tubot és una empresa espanyola que crea agents d'IA per WhatsApp per a empreses de serveis. L'entrenem amb les teves tarifes i les teves zones, el connectem al teu programa de gestió i el portem nosaltres.",
      "faq.q2": "Funciona amb el meu programa de gestió?",
      "faq.a2": "Amb Evisane i Google Calendar ja està connectat. Amb altres programes, com STEL Order o Fixner, el connectem si tenen API. Si no, el teu equip rep per correu les dades de cada client.",
      "faq.q3": "I si dona malament un preu?",
      "faq.a3": "El preu no el calcula la IA: surt d'una calculadora amb les teves tarifes. El que no és a la teva llista ho passa al teu equip.",
      "faq.q4": "Què passa quan contesta algú del meu equip?",
      "faq.a4": "La IA calla en aquella conversa i us deixa continuar.",
      "faq.q5": "Els meus clients saben que parlen amb una IA?",
      "faq.a5": "Sí. Es presenta com a assistent d'IA des del primer missatge. És obligatori a la Unió Europea.",
      "faq.q6": "I si la meva empresa és d'un altre sector?",
      "faq.a6": "Si els teus clients t'escriuen per demanar preu o cita, funciona igual. Explica-ho a la Lara i ho mirem.",
      "final.title": "Parla amb la Lara, <em class=\"serif-em grad-text\">la IA de Tubot.</em>",
      "final.lead": "El teu contesta igual de ràpid, amb les teves tarifes i les teves zones. En una setmana el tens al teu WhatsApp.",
      "final.live": "Lara en línia",
      "final.qrAlt": "Codi QR per escriure a la Lara, la IA de Tubot, per WhatsApp",
      "final.qrCap": "Escaneja i escriu-li",
      "foot.meta": "Agents d'IA per WhatsApp · <a href=\"mailto:hola@tubot.es\">hola@tubot.es</a>",
      "foot.tp": "Opinions a Trustpilot",
      "foot.legal": "© 2026 Tubot. Tots els drets reservats. · <a href=\"https://tubot.es/recepcionista-ia-plagas\" rel=\"noopener\">Control de plagues</a> · <a href=\"https://tubot.es/recepcionista-ia-climatizacion\" rel=\"noopener\">Climatització i calderes</a> · <a href=\"https://tubot.es/setter-ia\" rel=\"noopener\">Setter IA</a> · <a href=\"https://tubot.es/setter-instagram\" rel=\"noopener\">Setter per a Instagram</a> · <a href=\"https://tubot.es/automatizacion-whatsapp\" rel=\"noopener\">Automatització de WhatsApp</a> · <a href=\"https://tubot.es/contact\" target=\"_blank\" rel=\"noopener\">Contacte</a> · <a href=\"https://tubot.es/blogs\" target=\"_blank\" rel=\"noopener\">Blog</a> · <a href=\"https://tubot.es/privacy-policy\" target=\"_blank\" rel=\"noopener\">Política de privacitat</a>",
      "a11y.waFloat": "Parlar amb la Lara, la IA de Tubot, per WhatsApp",
      "sticky.title": "El teu agent d'IA per WhatsApp",
      "sticky.sub": "Et contesta la Lara, la IA de Tubot",
      "sx.phone.nm": "La teva empresa de plagues",
      "sx.chip1.t": "Plaga entesa",
      "sx.chip1.s": "Vespes · amb foto",
      "sx.chip2.t": "Pressupost donat",
      "sx.chip2.s": "Retirada del niu · 85 €",
      "sx.chip3.t": "Visita apuntada",
      "sx.chip3.s": "Al teu programa de gestió",
      "sx.how1.day": "Diumenge · 16:32",
      "sx.how1.msg": "Tinc un niu de vespes",
      "sx.how2.k1": "Plaga",
      "sx.how2.v1": "Vespes",
      "sx.how2.k2": "Alçada del niu",
      "sx.how2.v2": "Primer pis",
      "sx.how2.k3": "Foto i adreça",
      "sx.how2.v3": "Rebudes",
      "sx.how2.h": "Entén el problema",
      "sx.how3.k1": "Retirada del niu",
      "sx.how3.v1": "85 €",
      "sx.how3.k2": "Zona de servei",
      "sx.how3.v2": "Torrent",
      "sx.how3.k3": "Calculat amb",
      "sx.how3.v3": "Les teves tarifes",
      "sx.how3.h": "Pressuposta",
      "sx.how4.k1": "Hora proposada",
      "sx.how4.v1": "Demà",
      "sx.how4.k2": "Fitxa del client",
      "sx.how4.v2": "Creada",
      "sx.how4.k3": "Cita a Evisane",
      "sx.how4.v3": "Creada",
      "sx.how4.h": "Agenda la visita",
      "sx.how5.alert": "Fora de la teva llista de preus",
      "sx.bi.sub": "Quines plagues et demanen, de quins municipis i quantes acaben en visita.",
      "sx.bi.tag": "Control de plagues",
      "sx.bi.k2": "pressupostos donats",
      "sx.bi.k3": "visites agendades",
      "sx.bi.m1": "Paneroles",
      "sx.bi.m2": "Rosegadors",
      "sx.bi.m3": "Vespes",
      "sx.bi.h1": "Quina plaga et demanen més",
      "sx.bi.z1": "Torrent",
      "sx.bi.t1": "41 clients",
      "sx.bi.z2": "Paterna",
      "sx.bi.t2": "28 clients",
      "sx.bi.z3": "Fora de la teva zona",
      "sx.bi.t3": "19 clients",
      "sx.bi.h2": "De quines zones t'escriuen",
      "seo.title": "TUBOT | Agent d'IA per WhatsApp per a empreses de serveis",
      "seo.desc": "Agent d'IA per WhatsApp per a empreses de plagues, climatització, neteja, lampisteria i electricitat: contesta als teus clients a qualsevol hora, pressuposta i agenda la visita. Des de 249 €/mes.",
      "seo.orgDesc": "Tubot és una empresa espanyola que crea i opera agents d'IA per WhatsApp per a empreses de serveis: control de plagues, climatització, neteja, lampisteria i electricitat. L'agent contesta als clients a qualsevol hora, pressuposta amb les tarifes del negoci, agenda la visita i passa a l'equip els casos que necessiten una persona.",
      "seo.svcName": "Agent d'IA per WhatsApp per a empreses de serveis",
      "seo.svcType": "Atenció al client, pressupostos i agenda de visites per WhatsApp amb intel·ligència artificial",
      "seo.svcDesc": "L'agent d'IA de Tubot contesta per WhatsApp als clients d'una empresa de serveis a qualsevol hora: entén text, àudios i fotos, dona el preu amb una calculadora carregada amb les tarifes del negoci, comprova la zona de servei, deixa la visita apuntada per a l'equip i li passa els casos urgents o fora de tarifa. El propietari té les xifres del que ha entrat: converses, pressupostos i visites. Es presenta sempre com a assistent d'IA. Funciona sobre l'API oficial de WhatsApp Business, s'entrena per a cada negoci i queda operat per Tubot: posada en marxa, manteniment, suport i millora contínua. Des de 249 €/mes, sense cost d'alta i amb compromís anual.",
      "seo.svcAud": "Empreses de serveis amb oficina o coordinació (control de plagues, climatització, neteja, lampisteria i electricitat) els clients de les quals escriuen per WhatsApp per demanar preu i visita",
      "wa.agente": "Hola, vull un agent d'IA per a la meva empresa",
      "lead.title": "T'escrivim per WhatsApp ara mateix",
      "lead.sub": "Deixa'ns el teu nom i el teu número. La nostra IA t'escriu en segons.",
      "lead.name": "Nom",
      "lead.namePh": "El teu nom",
      "lead.phone": "WhatsApp",
      "lead.phonePh": "+34 600 000 000",
      "lead.consent": "Accepto que Tubot m'escrigui per WhatsApp i la <a href=\"https://tubot.es/ca/privacy-policy\" target=\"_blank\" rel=\"noopener\">política de privacitat</a>.",
      "lead.submit": "Escriu-me per WhatsApp",
      "lead.sending": "Enviant…",
      "lead.micro": "Sense compromís · Sense spam",
      "lead.alt": "Prefereixes escriure'ns tu? <span>Obrir WhatsApp</span>",
      "lead.okTitle": "Fet, {name}!",
      "lead.okText": "T'acabem d'escriure al <strong>{phone}</strong>. Obre WhatsApp al mòbil.",
      "lead.okBtn": "Entesos",
      "lead.errName": "Digues-nos el teu nom (només lletres).",
      "lead.errPhone": "Revisa el número (amb el prefix del país si no és d'Espanya).",
      "lead.errConsent": "Necessitem el teu consentiment per escriure't.",
      "lead.errSend": "No s'ha pogut enviar. Torna-ho a provar o obre WhatsApp directament.",
      "lead.close": "Tancar"
    }
  };

  function t(key) {
    const d = I18N[LANG];
    return (d && Object.prototype.hasOwnProperty.call(d, key)) ? d[key] : null;
  }

  (function applyI18n() {
    // FAQ del JSON-LD: mapa "texto ES de la pregunta" -> "q9" (se captura antes de traducir el DOM)
    const faqKeyByEs = {};
    document.querySelectorAll('[data-i18n^="faq.q"]').forEach(el => {
      faqKeyByEs[el.textContent.replace(/\s+/g, ' ').trim()] = el.getAttribute('data-i18n').slice(4);
    });
    if (LANG !== 'es') {
      // 1) innerHTML por clave (clave ausente -> se queda el español)
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = t(el.getAttribute('data-i18n'));
        if (v !== null) el.innerHTML = v;
      });
      // 2) atributos: data-i18n-attr="attr:clave;attr2:clave2"
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
          const i = pair.indexOf(':');
          if (i < 1) return;
          const v = t(pair.slice(i + 1).trim());
          if (v !== null) el.setAttribute(pair.slice(0, i).trim(), v);
        });
      });
      // 3) deep links de WhatsApp: el bot recibe el primer mensaje en el idioma del visitante
      document.querySelectorAll('[data-i18n-wa]').forEach(a => {
        const v = t('wa.' + a.getAttribute('data-i18n-wa'));
        if (v !== null) a.href = 'https://wa.me/15755301374?text=' + encodeURIComponent(v);
      });
    }
    // 4) JSON-LD: Google indexa el schema del DOM renderizado. Se parsea SIEMPRE
    // (también en ES): el campo de custom code de Webflow puede envolver líneas
    // dentro de un string, y un salto de línea literal hace el JSON inválido —
    // aquí se sanea y se reescribe limpio; en EN/CA además se traduce.
    const ld = Array.prototype.find.call(
      document.querySelectorAll('script[type="application/ld+json"]'),
      s => s.textContent.indexOf('tubot.es/#organization') !== -1
    );
    if (ld) {
      try {
        let g, dirty = false;
        try { g = JSON.parse(ld.textContent); }
        catch (e1) {
          // sanea caracteres de control literales (el campo de Webflow puede envolver lineas dentro de strings)
          var src = ld.textContent, clean = '';
          for (var ci = 0; ci < src.length; ci++) { clean += src.charCodeAt(ci) < 32 ? ' ' : src.charAt(ci); }
          g = JSON.parse(clean); dirty = true;
        }
        if (LANG !== 'es') {
          (g['@graph'] || []).forEach(node => {
            if (node['@type'] === 'Organization') node.description = t('seo.orgDesc') || node.description;
            if (node['@type'] === 'Service') {
              node.name = t('seo.svcName') || node.name;
              node.serviceType = t('seo.svcType') || node.serviceType;
              node.description = t('seo.svcDesc') || node.description;
              if (node.audience) node.audience.audienceType = t('seo.svcAud') || node.audience.audienceType;
            }
            if (node['@type'] === 'WebSite') node.inLanguage = LANG;
            if (node['@type'] === 'WebPage') {
              node.url = 'https://tubot.es/' + LANG + '/';
              node.name = t('seo.title') || node.name;
              node.description = t('seo.desc') || node.description;
              node.inLanguage = LANG;
            }
            if (node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) {
              node.mainEntity.forEach((q, i) => {
                const k = faqKeyByEs[String(q.name || '').replace(/\s+/g, ' ').trim()];
                const n = k ? k.slice(1) : String(i + 1);
                q.name = t('faq.q' + n) || q.name;
                if (q.acceptedAnswer) q.acceptedAnswer.text = t('faq.a' + n) || q.acceptedAnswer.text;
              });
            }
          });
        }
        if (LANG !== 'es' || dirty) ld.textContent = JSON.stringify(g);
      } catch (e) {}
    }
    // switcher: marcar idioma activo (también en ES); en file:// enlazar vía ?lang= para testing
    document.querySelectorAll('.lang-switch a').forEach(a => {
      if (a.getAttribute('data-lang') === LANG) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
      if (location.protocol === 'file:') a.setAttribute('href', '?lang=' + a.getAttribute('data-lang'));
    });
    // soltar el guard anti-FOUC del page-head (no-op en ES, donde la clase no existe)
    document.documentElement.classList.remove('i18n-pending');
  })();

  /* ---------- Origen del lead en los wa.me (campañas de pago) ---------- */
  // Los anuncios llegan con utm_campaign (sufijo de URL final de cada campaña en Google Ads).
  // Ese código se añade al texto precargado de WhatsApp como "(ref: dg)" para ver en el inbox
  // del bot de qué campaña viene cada conversación. Con gclid/gbraid/wbraid pero sin
  // utm_campaign el código es "g". Sin campaña los enlaces no se tocan. sessionStorage lo
  // conserva si la página se recarga sin query. Va después de applyI18n, que reescribe los href.
  (function () {
    const valid = c => /^[a-z0-9_-]{1,20}$/.test(c);
    let ref = '';
    try {
      const qs = new URLSearchParams(location.search);
      const c = (qs.get('utm_campaign') || '').toLowerCase();
      if (valid(c)) ref = c;
      else if (qs.get('gclid') || qs.get('gbraid') || qs.get('wbraid')) ref = 'g';
      if (ref) sessionStorage.setItem('tubot_ref', ref);
      else ref = sessionStorage.getItem('tubot_ref') || '';
    } catch (e) {}
    if (!valid(ref)) return;
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
      try {
        const u = new URL(a.href);
        const text = u.searchParams.get('text');
        if (text) a.href = u.origin + u.pathname + '?text=' + encodeURIComponent(text + ' (ref: ' + ref + ')');
      } catch (e) {}
    });
  })();

  const ticks = '<span class="tick">✓✓</span>';

  /* ---------- Datos de conversación (por idioma) ---------- */
  const CHATS_ALL = {
    es: {
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
    },
    en: {
      clientes: {
        name: 'Lara Fernández',
        avatar: 'woman',
        messages: [
          { kind: 'in', text: 'Hi, could you give me a quote?', time: '22:47' },
          { kind: 'in', photo: 'bathroom to renovate', img: 'https://alexelautentiko.github.io/tubot-cdn/assets/bano-reformar.webp', time: '22:47' },
          { kind: 'out', text: 'Of course. From the photo, it comes to between &euro;2,400 and &euro;3,200 depending on finishes. Shall I book you a free visit this week?', time: '22:48', tick: true },
          { kind: 'in', text: 'Yes, Thursday afternoon if possible', time: '22:49' },
          { kind: 'out', text: 'Done: Thursday at 5:30pm. I\'ll remind you 30 min before', time: '22:49', tick: true }
        ]
      }
    },
    ca: {
      clientes: {
        name: 'Lara Fernández',
        avatar: 'woman',
        messages: [
          { kind: 'in', text: 'Hola, em podeu fer un pressupost?', time: '22:47' },
          { kind: 'in', photo: 'bany per reformar', img: 'https://alexelautentiko.github.io/tubot-cdn/assets/bano-reformar.webp', time: '22:47' },
          { kind: 'out', text: 'És clar. Per la foto, et queda entre 2.400 i 3.200&euro; segons acabats. T\'agendo visita gratuïta aquesta setmana?', time: '22:48', tick: true },
          { kind: 'in', text: 'Sí, dijous a la tarda si pot ser', time: '22:49' },
          { kind: 'out', text: 'Fet: dijous a les 17:30. T\'aviso 30 min abans', time: '22:49', tick: true }
        ]
      }
    }
  };
  const CHATS = CHATS_ALL[LANG] || CHATS_ALL.es;
  const IA_BADGE = ({ en: 'Replying with AI', ca: 'Responent amb IA' })[LANG] || 'Respondiendo con IA';

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
            badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21 8 13.9 2 9.4h7.6z"/></svg> ' + IA_BADGE;
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

  /* ---------- Demo multimodal (entrada → salida): tabs inbound ---------- */
  const ioTabs = document.querySelectorAll('.io-tab:not(.io-tab-out)');
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

  /* ---------- Demo multimodal (sistema → WhatsApp): tabs outbound ---------- */
  const ioTabsOut = document.querySelectorAll('.io-tab-out');
  if (ioTabsOut.length) {
    ioTabsOut.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.ioOut;
        ioTabsOut.forEach(t => {
          const on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        document.querySelectorAll('.io-panel-out').forEach(p => {
          p.classList.toggle('active', p.dataset.ioOutPanel === key);
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
      let s = group ? n.toLocaleString(NUM_LOCALE) : String(n);
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

  /* ---------- Tracking: evento click_whatsapp (dataLayer + gtag) ---------- */
  // cta_location compartido con el formulario de escritorio (mismas etiquetas en GA)
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
  (function () {
    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (!a) return;
      const loc = ctaLocation(a);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'click_whatsapp', cta_location: loc, link_url: a.href, language: LANG });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', { cta_location: loc, language: LANG, transport_type: 'beacon' });
      }
    }, true);
  })();

  /* ---------- Tracking: reserva en Calendly (postMessage del widget) ---------- */
  (function () {
    window.addEventListener('message', function (e) {
      if (e.origin.indexOf('https://calendly.com') !== 0) return;
      if (!e.data || e.data.event !== 'calendly.event_scheduled') return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'calendly_booked', language: LANG });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'calendly_booked', { language: LANG, transport_type: 'beacon' });
      }
    });
  })();

  /* ---------- Formulario "te escribimos" (solo escritorio) ---------- */
  // En escritorio wa.me obliga a abrir WhatsApp Web/Desktop y ahí se cae mucha gente: los CTA
  // abren un modal (nombre + WhatsApp) y es el bot quien escribe primero con una plantilla de Meta.
  // En móvil todo sigue igual (clic directo). Se apaga dejando LEAD_ENDPOINT vacío; con él
  // vacío, ?leadform=1 lo fuerza para probar (simula el envío).
  (function () {
    const LEAD_ENDPOINT = 'https://tubot-whatsapp.vercel.app/api/lead'; // /api/lead del bot (CORS: solo tubot.es)
    let preview = false;
    try { preview = new URLSearchParams(location.search).get('leadform') === '1'; } catch (e) {}
    if (!LEAD_ENDPOINT && !preview) return;
    if (typeof HTMLDialogElement !== 'function' || !window.matchMedia) return;
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)');

    const ES = {
      'lead.title': 'Te escribimos por WhatsApp ahora mismo',
      'lead.sub': 'Déjanos tu nombre y tu número. Nuestra IA te escribe en segundos.',
      'lead.name': 'Nombre',
      'lead.namePh': 'Tu nombre',
      'lead.phone': 'WhatsApp',
      'lead.phonePh': '+34 600 000 000',
      'lead.consent': 'Acepto que Tubot me escriba por WhatsApp y la <a href="https://tubot.es/privacy-policy" target="_blank" rel="noopener">política de privacidad</a>.',
      'lead.submit': 'Escríbeme por WhatsApp',
      'lead.sending': 'Enviando…',
      'lead.micro': 'Sin compromiso · Sin spam',
      'lead.alt': '¿Prefieres escribirnos tú? <span>Abrir WhatsApp</span>',
      'lead.okTitle': '¡Hecho, {name}!',
      'lead.okText': 'Te acabamos de escribir al <strong>{phone}</strong>. Abre WhatsApp en tu móvil.',
      'lead.okBtn': 'Entendido',
      'lead.errName': 'Dinos tu nombre (solo letras).',
      'lead.errPhone': 'Revisa el número (con prefijo de país si no es de España).',
      'lead.errConsent': 'Necesitamos tu consentimiento para escribirte.',
      'lead.errSend': 'No hemos podido enviarlo. Inténtalo de nuevo o abre WhatsApp directamente.',
      'lead.close': 'Cerrar'
    };
    const L = k => { const v = t(k); return v !== null ? v : ES[k]; };
    const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.042z"/></svg>';

    // E.164: "+" y 8–15 dígitos. Sin prefijo, un 6/7/9 de 9 cifras se asume español.
    function normPhone(raw) {
      let p = String(raw || '').replace(/[\s().-]/g, '');
      if (p.indexOf('00') === 0) p = '+' + p.slice(2);
      if (p.charAt(0) !== '+') p = /^[679]\d{8}$/.test(p) ? '+34' + p : '';
      return /^\+[1-9]\d{7,14}$/.test(p) ? p : null;
    }
    // La primera palabra va a {{1}} de la plantilla y el bot solo acepta un nombre de pila
    // (letras, apóstrofo o guion, 2–20). new RegExp y no literal: un navegador sin \p{L}
    // rompería el script entero al parsearlo; sin regex valida solo el bot.
    let NAME_RE = null;
    try { NAME_RE = new RegExp("^\\p{L}[\\p{L}\\p{M}'’-]{1,19}$", 'u'); } catch (e) {}
    const ERR_FIELD = { name: 'lead.errName', phone: 'lead.errPhone', consent: 'lead.errConsent' };
    function push(ev, extra) {
      const data = Object.assign({ language: LANG }, extra);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: ev }, data));
      if (typeof window.gtag === 'function') window.gtag('event', ev, Object.assign({ transport_type: 'beacon' }, data));
    }

    const dlg = document.createElement('dialog');
    dlg.className = 'lead-dlg';
    dlg.setAttribute('aria-labelledby', 'leadTitle');
    dlg.innerHTML =
      '<button type="button" class="lead-x" aria-label="' + L('lead.close') + '">&times;</button>' +
      '<div class="lead-step lead-step-form">' +
        '<div class="lead-badge">' + WA_ICON + '</div>' +
        '<h2 class="lead-title" id="leadTitle">' + L('lead.title') + '</h2>' +
        '<p class="lead-sub">' + L('lead.sub') + '</p>' +
        '<form class="lead-form" novalidate>' +
          '<label class="lead-field"><span>' + L('lead.name') + '</span>' +
            '<input name="name" type="text" autocomplete="name" maxlength="80" required placeholder="' + L('lead.namePh') + '"></label>' +
          '<label class="lead-field"><span>' + L('lead.phone') + '</span>' +
            '<input name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="24" required placeholder="' + L('lead.phonePh') + '"></label>' +
          '<label class="lead-hp" aria-hidden="true">Company<input name="company" type="text" tabindex="-1" autocomplete="off"></label>' +
          '<label class="lead-consent"><input name="consent" type="checkbox" required><span>' + L('lead.consent') + '</span></label>' +
          '<p class="lead-err" role="alert"></p>' +
          '<button type="submit" class="btn btn-wa btn-block btn-shine lead-submit">' + WA_ICON + '<span>' + L('lead.submit') + '</span></button>' +
          '<p class="lead-micro">' + L('lead.micro') + '</p>' +
        '</form>' +
        '<a class="lead-alt" data-cta="Formulario" target="_blank" rel="noopener">' + L('lead.alt') + '</a>' +
      '</div>' +
      '<div class="lead-step lead-step-ok" hidden>' +
        '<div class="lead-badge lead-badge-ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
        '<h2 class="lead-title lead-ok-title"></h2>' +
        '<p class="lead-sub lead-ok-text"></p>' +
        '<button type="button" class="btn btn-ghost lead-ok-btn">' + L('lead.okBtn') + '</button>' +
      '</div>';
    document.body.appendChild(dlg);

    const form = dlg.querySelector('.lead-form');
    const err = dlg.querySelector('.lead-err');
    const submit = dlg.querySelector('.lead-submit');
    const alt = dlg.querySelector('.lead-alt');
    const stepForm = dlg.querySelector('.lead-step-form');
    const stepOk = dlg.querySelector('.lead-step-ok');
    let ctx = null; // CTA que abrió el modal: { loc, intent, reason }

    function open(a) {
      let intent = '';
      try { intent = new URL(a.href).searchParams.get('text') || ''; } catch (e) {}
      // reason = clave del CTA (consultoria|precio|proceso|implementar): el bot la pone en {{2}}
      ctx = { loc: ctaLocation(a), intent: intent, reason: a.getAttribute('data-i18n-wa') };
      alt.href = a.href;
      err.textContent = '';
      stepForm.hidden = false; stepOk.hidden = true;
      dlg.showModal();
      form.elements.name.focus();
      push('lead_form_open', { cta_location: ctx.loc });
    }
    function close() { dlg.close(); }

    // window + captura: corre ANTES que los listeners de document (click_whatsapp, OpenAI
    // lead_created, GTM), y stopPropagation evita que cuenten una apertura de modal como lead.
    window.addEventListener('click', function (e) {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[data-i18n-wa]');
      if (!a || !desktop.matches) return;
      e.preventDefault();
      e.stopPropagation();
      open(a);
    }, true);

    dlg.querySelector('.lead-x').addEventListener('click', close);
    dlg.querySelector('.lead-ok-btn').addEventListener('click', close);
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); }); // clic en el backdrop
    form.addEventListener('input', () => { err.textContent = ''; });

    // window + captura, igual que el clic: la medición mejorada de GA4 contaría cada intento
    // (también los que no pasan la validación) como form_submit, que es evento clave en la
    // propiedad. El lead se mide solo con generate_lead tras el envío bueno.
    window.addEventListener('submit', function (e) {
      if (e.target !== form) return;
      e.preventDefault();
      e.stopPropagation();
      const name = form.elements.name.value.trim().replace(/\s+/g, ' ');
      const phone = normPhone(form.elements.phone.value);
      if (name.length < 2 || (NAME_RE && !NAME_RE.test(name.split(' ')[0]))) { err.textContent = L('lead.errName'); form.elements.name.focus(); return; }
      if (!phone) { err.textContent = L('lead.errPhone'); form.elements.phone.focus(); return; }
      if (!form.elements.consent.checked) { err.textContent = L('lead.errConsent'); form.elements.consent.focus(); return; }

      const qs = new URLSearchParams(location.search);
      const attribution = {};
      ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
        .forEach(k => { if (qs.get(k)) attribution[k] = qs.get(k); });
      // Sin query en esta URL (llegó por un anuncio y cambió de página): queda el código de
      // campaña que guardó el bloque "(ref:)" en sessionStorage.
      if (!Object.keys(attribution).length) {
        try { const ref = sessionStorage.getItem('tubot_ref'); if (ref) attribution.utm_campaign = ref; } catch (e2) {}
      }
      const payload = {
        name: name, phone: phone, consent: true, language: LANG,
        reason: ctx.reason, intent: ctx.intent, cta_location: ctx.loc,
        page: location.href.split('#')[0], referrer: document.referrer || '', attribution: attribution,
        company: form.elements.company.value // honeypot: el backend descarta si viene relleno
      };

      submit.disabled = true;
      submit.querySelector('span').textContent = L('lead.sending');
      const send = LEAD_ENDPOINT
        ? fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(r => {
              if (r.ok) return;
              // 400 con "field": el bot no acepta ese campo y reintentar igual no sirve
              return r.json().catch(() => ({})).then(j => {
                const e2 = new Error('HTTP ' + r.status);
                if (r.status === 400 && j) e2.field = j.field;
                throw e2;
              });
            })
        : new Promise(res => setTimeout(res, 900)); // preview sin backend

      send.then(function () {
        push('generate_lead', { cta_location: ctx.loc, method: 'whatsapp_form' });
        // OpenAI Ads: el lead real es el envío (la apertura del modal no llega a su listener)
        try { if (typeof window.oaiq === 'function') window.oaiq('measure', 'lead_created', { type: 'customer_action' }, {}); } catch (e2) {}
        const tpl = s => s.replace('{name}', '<span class="lead-ok-name"></span>').replace('{phone}', '<span class="lead-ok-phone"></span>');
        const title = dlg.querySelector('.lead-ok-title'), text = dlg.querySelector('.lead-ok-text');
        title.innerHTML = tpl(L('lead.okTitle'));
        text.innerHTML = tpl(L('lead.okText'));
        title.querySelector('.lead-ok-name').textContent = name.split(' ')[0];
        text.querySelector('.lead-ok-phone').textContent = phone;
        form.reset();
        stepForm.hidden = true; stepOk.hidden = false;
        dlg.querySelector('.lead-ok-btn').focus();
      }).catch(function (e2) {
        const field = e2 && ERR_FIELD[e2.field] ? e2.field : '';
        err.textContent = L(field ? ERR_FIELD[field] : 'lead.errSend');
        if (field) form.elements[field].focus();
        push('lead_form_error', { cta_location: ctx.loc });
      }).then(function () {
        submit.disabled = false;
        submit.querySelector('span').textContent = L('lead.submit');
      });
    }, true);
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

  /* ---------- Ancla a una pregunta del FAQ: abre el <details> (p. ej. #faq-instagram) ---------- */
  (function () {
    function openFaqFromHash() {
      const id = location.hash.slice(1);
      if (!id) return;
      const d = document.getElementById(id);
      if (d && d.tagName === 'DETAILS') d.open = true;
    }
    window.addEventListener('hashchange', openFaqFromHash);
    openFaqFromHash();
  })();

})();
