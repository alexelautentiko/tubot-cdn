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
      "a11y.tablist": "Message type",
      "a11y.waFloat": "Audit on WhatsApp",
      "hdr.cta": "Audit on WhatsApp",
      "hero.eyebrow": "AI FOR WHATSAPP BUSINESS",
      "hero.h1pre": "Your WhatsApp",
      "hero.words": "takes orders|sends quotes|books visits|manages bookings|captures leads|collects documents|answers questions",
      "hero.word1": "takes orders",
      "hero.sub": "It answers, qualifies and resolves 24/7. Without anyone glued to the phone.",
      "hero.cta": "Request your free consultation",
      "hero.micro1": "Our own AI replies in seconds",
      "hero.micro2": "Free consultation",
      "hero.micro3": "No commitment",
      "hero.status": "online",
      "trust.label": "POWERED BY THE BEST AI",
      "proc.eyebrow": "<span class=\"dot\"></span>Processes, not bots",
      "proc.title": "We don't install a bot. <span class=\"grad-text\">We take a process off your plate.</span>",
      "proc.g1": "Sales",
      "proc.c1h": "Captures and qualifies leads 24/7",
      "proc.c1p": "Answered instantly, qualified and with the appointment booked, even in the middle of the night.",
      "proc.c2h": "Instant quotes",
      "proc.c2p": "From a photo or a few details, it returns a ballpark quote on the spot and books the visit.",
      "proc.c3h": "Bookings and orders",
      "proc.c3p": "Takes the booking or the order at any hour, with no one watching the phone.",
      "proc.g2": "Support",
      "proc.c4h": "Repetitive FAQs",
      "proc.c4p": "Resolved on the spot, with your information and your tone.",
      "proc.c5h": "Case status",
      "proc.c5p": "Orders, repairs or paperwork, checkable 24/7 without picking up the phone.",
      "proc.c6h": "Document collection",
      "proc.c6p": "Requests and receives data, photos and PDFs in a guided flow, complete and right first time.",
      "proc.g3": "Team",
      "proc.c7h": "Internal team",
      "proc.c7p": "Internal FAQs, work orders, onboarding and L1 helpdesk, resolved on their own.",
      "proc.cta": "Start with my process",
      "io.eyebrow": "<span class=\"dot\"></span>It understands everything they send",
      "io.title": "Text, voice or photo. <span class=\"grad-text\">Straight into your CRM, calendar or ERP.</span>",
      "io.tab1": "Text",
      "io.tab2": "Audio",
      "io.tab3": "Image",
      "io.app": "WhatsApp · Customer",
      "io.p1.m1": "Hi, I need a generator for an event on Saturday<span class=\"time\">09:12</span>",
      "io.p1.m2": "It'd be for the whole day. In Getafe<span class=\"time\">09:13</span>",
      "io.p1.tit": "Equipment booking",
      "io.p1.pill": "Pulled from the chat",
      "io.p1.k1": "Equipment", "io.p1.v1": "6 kVA generator",
      "io.p1.k2": "Date", "io.p1.v2": "Saturday · 1 day",
      "io.p1.k3": "Area",
      "io.p1.k4": "Availability", "io.p1.v4": "Confirmed",
      "io.p1.dest": "Booking created and quote sent",
      "io.p2.m2": "“Hi, I'm in 3B, building 2. The lift has been out since yesterday and the hallway light is gone too, could you send someone over?”<span class=\"time\">08:05</span>",
      "io.p2.tit": "Incident logged",
      "io.p2.pill": "Pulled from the audio",
      "io.p2.k1": "Resident", "io.p2.v1": "Building 2 · 3B",
      "io.p2.k2": "Issue", "io.p2.v2": "Lift out of service",
      "io.p2.k3": "Also", "io.p2.v3": "Hallway light out",
      "io.p2.k4": "Priority", "io.p2.v4": "High",
      "io.p2.dest": "Work order created and technician notified",
      "io.p3.tag": "nest on the façade",
      "io.p3.m2": "I found this nest on the façade, can you come and remove it?<span class=\"time\">12:18</span>",
      "io.p3.tit": "Quote + visit",
      "io.p3.pill": "Pulled from the photo",
      "io.p3.k1": "Pest", "io.p3.v1": "Wasps",
      "io.p3.k2": "Location", "io.p3.v2": "Nest on façade",
      "io.p3.k3": "Service", "io.p3.v3": "Removal · €90–140",
      "io.p3.k4": "Visit", "io.p3.v4": "Proposed this week",
      "io.p3.dest": "Quote sent and visit booked",
      "stats.l1": "Response time",
      "stats.l2": "Always-on support",
      "stats.n3": "+8,000",
      "stats.l3": "Integrations",
      "stats.l4": "Weeks to go live",
      "sec.title": "For teams that <span class=\"grad-text\">live on WhatsApp</span>",
      "sec.1": "Real estate", "sec.2": "Dental clinics", "sec.3": "Law firms", "sec.4": "Ecommerce",
      "sec.5": "Restaurants", "sec.6": "Property management", "sec.7": "Advisory firms",
      "sec.8": "Professional services", "sec.9": "Aesthetic clinics", "sec.10": "Medical centres",
      "sec.11": "Gyms & studios", "sec.12": "Academies", "sec.13": "Car dealerships",
      "sec.14": "Renovations & construction", "sec.15": "Installers & maintenance",
      "sec.16": "Cleaning companies", "sec.17": "Logistics & delivery", "sec.18": "Hotels & accommodation",
      "sec.19": "Travel agencies", "sec.20": "Insurance", "sec.21": "Recruiting & staffing", "sec.22": "Events",
      "road.eyebrow": "<span class=\"dot\"></span>Implementation",
      "road.title": "How we bring AI <span class=\"grad-text\">to your business</span>",
      "road.s1h": "Audit & setup",
      "road.s1p": "We connect your current number (or set up a new one) and map which processes eat up most of your team's time.",
      "road.s2h": "We train your AI",
      "road.s2p": "We load your FAQs, catalogue, tone and processes. We connect your CRM, calendar and ERP. Nothing in silos.",
      "road.s3h": "Launch",
      "road.s3p": "We activate the AI under your brand and validate it on real conversations before letting it fly solo.",
      "road.s4h": "Continuous improvement",
      "road.s4p": "We monitor, fine-tune flows and report month after month. A living operation, not an abandoned bot.",
      "road.s5h": "AI up and running",
      "road.s5p": "Your WhatsApp covered 24/7 and your team freed from repetitive work. This is where the good part starts.",
      "intg.eyebrow": "<span class=\"dot\"></span>Integrations",
      "intg.title": "Connects with <span class=\"grad-text\">your tools</span>",
      "intg.more": "+8,000 apps via API",
      "intg.note": "Using an in-house tool? We assess it in the initial audit and connect it via API.",
      "vs.mtag": "What the market does",
      "vs.mh": "Drop a bot and run",
      "vs.mb1": "They sell you a generic menu bot",
      "vs.mb2": "They hand you templates and disappear",
      "vs.mb3": "Maintenance is on you",
      "vs.mb4": "It doesn't understand voice notes, photos or PDFs",
      "vs.ttag": "What we do at Tubot",
      "vs.th": "An operation that improves on its own",
      "vs.tb1": "We train your AI for your specific business",
      "vs.tb2": "We run it in production month after month",
      "vs.tb3": "We improve the system with every conversation",
      "vs.tb4": "It understands voice, vision and real documents",
      "testi.title": "Clients who already <span class=\"grad-text\">stopped wasting time</span>",
      "testi.q1": "My sales reps only talk to clients ready to buy. We used to lose 40% of our time on cold leads.",
      "testi.r1": "Sales Director · Inmobiliaria Aldaba",
      "testi.q2": "A photo comes in on WhatsApp and goes out with a quote in seconds. We close twice as many visits.",
      "testi.r2": "Managing Director · Reformas Veyra",
      "testi.q3": "Orders and invoicing run on their own. High season used to be chaos; now we barely touch it.",
      "testi.r3": "Operations · Distribuciones Cantero",
      "price.title": "Clear pricing, <span class=\"grad-text\">no surprises</span>",
      "price.from": "From",
      "price.amt": "€249 <small>/ month</small>",
      "price.note": "The final price depends on message volume, integrations and complexity.",
      "price.i1": "Full setup, <strong>no installation fee</strong>",
      "price.i2": "Maintenance, support and updates",
      "price.i3": "Integrations with your tools",
      "price.i4": "Continuous improvement, month after month",
      "price.cta": "Get my quote",
      "price.objTitle": "We <span class=\"grad-text\">install it</span> on:",
      "price.o1h": "Your business",
      "price.o1p": "A QR code in your premises, receipts and invoices: customers scan it and message you instantly.",
      "price.o2h": "Your website and emails",
      "price.o2p": "A WhatsApp button on your website and in your team's emails.",
      "price.o3h": "Google and your ads",
      "price.o3p": "A WhatsApp button on your Google Business profile and in your Facebook and Instagram ads.",
      "final.eyebrow": "<span class=\"dot\"></span>Free consultation on WhatsApp",
      "final.title": "Your competitors are already using AI. <span class=\"grad-text\">Are you?</span>",
      "final.cta": "Audit on WhatsApp",
      "final.micro1": "Free consultation",
      "final.micro2": "No commitment",
      "final.micro3": "Instant reply",
      "final.or": "or book a call",
      "faq.title": "Frequently asked <span class=\"grad-text\">questions</span>",
      "faq.q1": "What is Tubot?",
      "faq.a1": "Tubot is a Spanish company that builds AI-powered WhatsApp Business bots. Each bot is trained for your business, connects to your tools and is operated by Tubot to handle customers, qualify leads, manage appointments and automate repetitive processes from WhatsApp.",
      "faq.q2": "How long does it take to implement?",
      "faq.a2": "Between 2 and 4 weeks. We design, train and test the bot in parallel before deployment, so you keep working as usual while it is prepared and rolled out progressively.",
      "faq.q3": "Does it integrate with my CRM, ERP and tools?",
      "faq.a3": "Yes. We connect via API with HubSpot, Pipedrive, Salesforce, Zoho, Holded, calendars, Google Drive, OneDrive, Dropbox, Shopify, WooCommerce, Notion and Slack, among +8,000 apps. If you use an in-house tool, we assess it in the initial audit.",
      "faq.q4": "Does Tubot replace my team?",
      "faq.a4": "No. It complements your team with a human-in-the-loop approach: it resolves the repetitive work, covers out-of-hours and escalates to a person when the case needs human judgement. The goal is to free up capacity, not to replace anyone.",
      "faq.q5": "Is it GDPR compliant?",
      "faq.a5": "Yes. We work with security measures, encryption and data protection criteria aligned with the GDPR. Where applicable, data is hosted on European infrastructure and processing is reviewed during implementation.",
      "faq.q6": "How is it different from ChatGPT or a traditional chatbot?",
      "faq.a6": "ChatGPT is a general-purpose model and a traditional chatbot follows rigid flows. Tubot is an AI trained for your specific business, connected to real systems and operated continuously. It includes deployment, integrations, maintenance and continuous improvement.",
      "faq.q7": "How much does it cost?",
      "faq.a7": "A monthly fee from €249 to €1,000/month, with no installation fee and an annual commitment. The price depends on message volume, integrations and complexity. It includes installation, maintenance, support, updates and continuous improvement.",
      "faq.q8": "Do you only work in Spain?",
      "faq.a8": "We operate mainly in Spain and also with companies across Latin America (Mexico, Argentina, Chile and Colombia). The bot adapts to each company's language, tone, processes and tools.",
      "foot.meta": "AI for WhatsApp Business · <a href=\"mailto:hola@tubot.es\">hola@tubot.es</a>",
      "foot.cta": "Audit on WhatsApp",
      "foot.legal": "© 2026 Tubot. All rights reserved. · <a href=\"https://tubot.es/en/contact\" target=\"_blank\" rel=\"noopener\">Contact</a> · <a href=\"https://tubot.es/en/blogs\" target=\"_blank\" rel=\"noopener\">Blog</a> · <a href=\"https://tubot.es/en/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy policy</a>",
      "sticky.full1": "Free consultation on WhatsApp",
      "sticky.short1": "Free consultation",
      "sticky.sub": "We'll tell you what to automate in your business, no strings attached",
      "sticky.full2": "Request your free consultation",
      "sticky.short2": "Free consultation",
      "wa.implementar": "Hi, I'd like to implement AI in my WhatsApp Business",
      "wa.consultoria": "Hi, I'd like my free Tubot consultation",
      "wa.proceso": "Hi, I'd like to automate a process in my WhatsApp with AI",
      "wa.precio": "Hi, I'd like to know Tubot's price for my business",
      "seo.title": "TUBOT | AI for WhatsApp Business",
      "seo.desc": "AI that automates your WhatsApp Business. Handles your customers, automates orders and quotes, and frees up your team. Available 24/7, trained for your business.",
      "seo.orgDesc": "Tubot is a Spanish company that builds, deploys and operates AI-powered WhatsApp Business bots for companies. Its bots handle customers, qualify leads, manage appointments, process documents, respond to voice notes and connect conversations with CRMs, ERPs and internal tools.",
      "seo.svcName": "AI-powered WhatsApp Business bots for companies",
      "seo.svcType": "WhatsApp Business automation with artificial intelligence",
      "seo.svcDesc": "Tubot builds WhatsApp Business bots trained for each business, connected to its systems and operated continuously. The service includes deployment, integrations, maintenance, support and continuous improvement.",
      "seo.svcAud": "Companies that receive customers, leads, bookings, documents or support requests via WhatsApp"
    },
    ca: {
      "a11y.lang": "Idioma",
      "a11y.tablist": "Tipus de missatge",
      "a11y.waFloat": "Auditoria per WhatsApp",
      "hdr.cta": "Auditoria per WhatsApp",
      "hero.eyebrow": "IA PER A WHATSAPP BUSINESS",
      "hero.h1pre": "El teu WhatsApp",
      "hero.words": "pren comandes|envia pressupostos|agenda visites|gestiona reserves|capta clients|recull documentació|respon dubtes",
      "hero.word1": "pren comandes",
      "hero.sub": "Atén, qualifica i resol 24/7. Sense que ningú estigui pendent del mòbil.",
      "hero.cta": "Sol·licitar consultoria gratuïta",
      "hero.micro1": "Et respon la nostra pròpia IA en segons",
      "hero.micro2": "Consultoria gratis",
      "hero.micro3": "Sense compromís",
      "hero.status": "en línia",
      "trust.label": "POTENCIAT PER LA MILLOR IA",
      "proc.eyebrow": "<span class=\"dot\"></span>Processos, no bots",
      "proc.title": "No instal·lem un bot. <span class=\"grad-text\">Et traiem un procés de sobre.</span>",
      "proc.g1": "Vendes",
      "proc.c1h": "Captura i qualifica leads 24/7",
      "proc.c1p": "Atesos a l'instant, qualificats i amb la cita agendada, també de matinada.",
      "proc.c2h": "Pressupostos a l'instant",
      "proc.c2p": "Amb una foto o quatre dades, retorna un pressupost orientatiu al moment i agenda la visita.",
      "proc.c3h": "Reserves i comandes",
      "proc.c3p": "Pren la reserva o la comanda a qualsevol hora, sense que ningú hi estigui pendent.",
      "proc.g2": "Atenció",
      "proc.c4h": "FAQs repetitives",
      "proc.c4p": "Resoltes al moment, amb la teva informació i el teu to.",
      "proc.c5h": "Estat d'un expedient",
      "proc.c5p": "Comanda, reparació o tràmit consultable 24/7, sense despenjar el telèfon.",
      "proc.c6h": "Recollida de documentació",
      "proc.c6p": "Demana i rep dades, fotos i PDFs de forma guiada, complets i a la primera.",
      "proc.g3": "Equip",
      "proc.c7h": "Equip intern",
      "proc.c7p": "FAQs internes, comunicats, onboarding i helpdesk N1, resolts sols.",
      "proc.cta": "Començar pel meu procés",
      "io.eyebrow": "<span class=\"dot\"></span>Entén tot el que li envien",
      "io.title": "Text, àudio o foto. <span class=\"grad-text\">Directes al teu CRM, agenda o ERP.</span>",
      "io.tab1": "Text",
      "io.tab2": "Àudio",
      "io.tab3": "Imatge",
      "io.app": "WhatsApp · Client",
      "io.p1.m1": "Bones, necessito un generador per a un esdeveniment dissabte<span class=\"time\">09:12</span>",
      "io.p1.m2": "Seria per a tot el dia. A Getafe<span class=\"time\">09:13</span>",
      "io.p1.tit": "Reserva d'equip",
      "io.p1.pill": "Extret del xat",
      "io.p1.k1": "Equip", "io.p1.v1": "Generador 6 kVA",
      "io.p1.k2": "Data", "io.p1.v2": "Dissabte · 1 dia",
      "io.p1.k3": "Zona",
      "io.p1.k4": "Disponibilitat", "io.p1.v4": "Confirmada",
      "io.p1.dest": "Reserva creada i pressupost enviat",
      "io.p2.m2": "“Hola, soc del 3r B del portal 2. L'ascensor està parat des d'ahir i el llum del portal tampoc va, a veure si podeu enviar algú.”<span class=\"time\">08:05</span>",
      "io.p2.tit": "Incidència registrada",
      "io.p2.pill": "Extret de l'àudio",
      "io.p2.k1": "Veí", "io.p2.v1": "Portal 2 · 3r B",
      "io.p2.k2": "Avaria", "io.p2.v2": "Ascensor parat",
      "io.p2.k3": "També", "io.p2.v3": "Llum del portal fos",
      "io.p2.k4": "Prioritat", "io.p2.v4": "Alta",
      "io.p2.dest": "Comunicat creat i avís enviat al tècnic",
      "io.p3.tag": "niu a la façana",
      "io.p3.m2": "He vist aquest niu a la façana, podeu venir a treure'l?<span class=\"time\">12:18</span>",
      "io.p3.tit": "Pressupost + visita",
      "io.p3.pill": "Extret de la foto",
      "io.p3.k1": "Plaga", "io.p3.v1": "Vespes",
      "io.p3.k2": "Ubicació", "io.p3.v2": "Niu a la façana",
      "io.p3.k3": "Servei", "io.p3.v3": "Retirada · 90–140 €",
      "io.p3.k4": "Visita", "io.p3.v4": "Proposada aquesta setmana",
      "io.p3.dest": "Pressupost enviat i visita agendada",
      "stats.l1": "Temps de resposta",
      "stats.l2": "Atenció sense descans",
      "stats.n3": "+8.000",
      "stats.l3": "Integracions",
      "stats.l4": "Setmanes d'implementació",
      "sec.title": "Per a equips que <span class=\"grad-text\">viuen a WhatsApp</span>",
      "sec.1": "Immobiliàries", "sec.2": "Clíniques dentals", "sec.3": "Despatxos d'advocats", "sec.4": "Ecommerce",
      "sec.5": "Restauració", "sec.6": "Administració de finques", "sec.7": "Assessories",
      "sec.8": "Serveis professionals", "sec.9": "Clíniques estètiques", "sec.10": "Centres mèdics",
      "sec.11": "Gimnasos i estudis", "sec.12": "Acadèmies", "sec.13": "Concessionaris",
      "sec.14": "Reformes i construcció", "sec.15": "Instal·ladors i manteniment",
      "sec.16": "Empreses de neteja", "sec.17": "Logística i repartiment", "sec.18": "Hotels i allotjaments",
      "sec.19": "Agències de viatges", "sec.20": "Assegurances", "sec.21": "Recruiting i ETT", "sec.22": "Esdeveniments",
      "road.eyebrow": "<span class=\"dot\"></span>Implementació",
      "road.title": "Així portem la IA <span class=\"grad-text\">a la teva empresa</span>",
      "road.s1h": "Auditoria i alta",
      "road.s1p": "Integrem el teu número actual (o en donem d'alta un de nou) i mapegem quins processos consumeixen més temps al teu equip.",
      "road.s2h": "Entrenem la teva IA",
      "road.s2p": "Carreguem les teves FAQs, catàleg, to i processos. Connectem amb el teu CRM, calendari i ERP. Res aïllat.",
      "road.s3h": "Llançament",
      "road.s3p": "Activem la IA sota la teva marca i la validem sobre converses reals abans de deixar-la anar del tot.",
      "road.s4h": "Millora contínua",
      "road.s4p": "Monitorem, ajustem fluxos i reportem mes a mes. Una operació viva, no un bot abandonat.",
      "road.s5h": "IA en marxa",
      "road.s5p": "El teu WhatsApp atès 24/7 i el teu equip alliberat del repetitiu. Aquí comença el bo.",
      "intg.eyebrow": "<span class=\"dot\"></span>Integracions",
      "intg.title": "Es connecta amb <span class=\"grad-text\">les teves eines</span>",
      "intg.more": "+8.000 apps via API",
      "intg.note": "Fas servir una eina pròpia? L'avaluem a l'auditoria inicial i la connectem via API.",
      "vs.mtag": "El que fa el mercat",
      "vs.mh": "Un bot i a córrer",
      "vs.mb1": "Et venen un bot genèric de menús",
      "vs.mb2": "Et deixen plantilles i desapareixen",
      "vs.mb3": "El manteniment va a càrrec teu",
      "vs.mb4": "No entén àudios, fotos ni PDFs",
      "vs.ttag": "El que fem a Tubot",
      "vs.th": "Una operació que millora sola",
      "vs.tb1": "Entrenem la teva IA per al teu negoci concret",
      "vs.tb2": "L'operem en producció mes a mes",
      "vs.tb3": "Millorem el sistema amb cada conversa",
      "vs.tb4": "Entén veu, visió i documents reals",
      "testi.title": "Clients que ja <span class=\"grad-text\">han deixat de perdre temps</span>",
      "testi.q1": "Els meus comercials només parlen amb clients a punt de comprar. Abans se'ns n'anava el 40% del temps en leads freds.",
      "testi.r1": "Directora comercial · Inmobiliaria Aldaba",
      "testi.q2": "Una foto entra per WhatsApp i surt amb pressupost en segons. Tanquem el doble de visites.",
      "testi.r2": "Gerent · Reformas Veyra",
      "testi.q3": "Comandes i facturació van soles. La temporada alta era un caos; ara ni ho toquem.",
      "testi.r3": "Operacions · Distribuciones Cantero",
      "price.title": "Preu clar, <span class=\"grad-text\">sense sorpreses</span>",
      "price.from": "Des de",
      "price.amt": "249€ <small>/ mes</small>",
      "price.note": "El preu final depèn del volum de missatges, integracions i complexitat.",
      "price.i1": "Posada en marxa completa, <strong>sense cost d'instal·lació</strong>",
      "price.i2": "Manteniment, suport i actualitzacions",
      "price.i3": "Integracions amb les teves eines",
      "price.i4": "Millora contínua mes a mes",
      "price.cta": "Demanar el meu pressupost",
      "price.objTitle": "L'<span class=\"grad-text\">instal·lem</span> a:",
      "price.o1h": "El teu negoci",
      "price.o1p": "Un codi QR al teu local, tiquets i factures: l'escanegen i t'escriuen a l'instant.",
      "price.o2h": "El teu web i els teus emails",
      "price.o2p": "Un botó de WhatsApp a la teva pàgina web i als correus del teu equip.",
      "price.o3h": "Google i els teus anuncis",
      "price.o3p": "Un botó de WhatsApp a la teva fitxa de Google i als teus anuncis de Facebook i Instagram.",
      "final.eyebrow": "<span class=\"dot\"></span>Consultoria gratuïta per WhatsApp",
      "final.title": "La teva competència ja fa servir IA. <span class=\"grad-text\">I tu?</span>",
      "final.cta": "Auditoria per WhatsApp",
      "final.micro1": "Consultoria gratis",
      "final.micro2": "Sense compromís",
      "final.micro3": "Resposta a l'instant",
      "final.or": "o agenda una trucada",
      "faq.title": "Preguntes <span class=\"grad-text\">freqüents</span>",
      "faq.q1": "Què és Tubot?",
      "faq.a1": "Tubot és una empresa espanyola que crea bots de WhatsApp Business amb IA. El bot s'entrena per a cada negoci, es connecta a les teves eines i queda operat per Tubot per atendre clients, qualificar leads, gestionar cites i automatitzar processos repetitius des de WhatsApp.",
      "faq.q2": "Quant triga a implementar-se?",
      "faq.a2": "Entre 2 i 4 setmanes. Dissenyem, entrenem i provem el bot en paral·lel abans del desplegament, perquè continuïs treballant amb normalitat mentre es prepara i s'activa de forma progressiva.",
      "faq.q3": "S'integra amb el meu CRM, ERP i eines?",
      "faq.a3": "Sí. Connectem via API amb HubSpot, Pipedrive, Salesforce, Zoho, Holded, calendaris, Google Drive, OneDrive, Dropbox, Shopify, WooCommerce, Notion i Slack, entre +8.000 apps. Si fas servir una eina pròpia, l'avaluem a l'auditoria inicial.",
      "faq.q4": "Tubot substitueix el meu equip?",
      "faq.a4": "No. Complementa l'equip amb enfocament human-in-the-loop: resol el repetitiu, atén fora d'horari i escala a una persona quan el cas requereix criteri humà. L'objectiu és alliberar capacitat, no substituir.",
      "faq.q5": "Compleix amb el RGPD?",
      "faq.a5": "Sí. Treballem amb mesures de seguretat, encriptació i criteris de protecció de dades alineats amb el RGPD. Quan aplica, les dades s'allotgen en infraestructura europea i el tractament es revisa a la implementació.",
      "faq.q6": "En què es diferencia de ChatGPT o d'un chatbot tradicional?",
      "faq.a6": "ChatGPT és un model general i un chatbot tradicional segueix fluxos rígids. Tubot és una IA entrenada per al teu negoci concret, connectada a sistemes reals i operada de forma contínua. Inclou desplegament, integracions, manteniment i millora contínua.",
      "faq.q7": "Quant costa?",
      "faq.a7": "Mensualitat de 249€ a 1.000€/mes, sense cost d'instal·lació i amb compromís anual. El preu depèn del volum de missatges, integracions i complexitat. Inclou instal·lació, manteniment, suport, actualitzacions i millora contínua.",
      "faq.q8": "Treballa només a Espanya?",
      "faq.a8": "Operem principalment a Espanya i també amb empreses de Llatinoamèrica (Mèxic, Argentina, Xile i Colòmbia). El bot s'adapta a l'idioma, to, processos i eines de cada empresa.",
      "foot.meta": "IA per a WhatsApp Business · <a href=\"mailto:hola@tubot.es\">hola@tubot.es</a>",
      "foot.cta": "Auditoria per WhatsApp",
      "foot.legal": "© 2026 Tubot. Tots els drets reservats. · <a href=\"https://tubot.es/ca/contact\" target=\"_blank\" rel=\"noopener\">Contacte</a> · <a href=\"https://tubot.es/ca/blogs\" target=\"_blank\" rel=\"noopener\">Blog</a> · <a href=\"https://tubot.es/ca/privacy-policy\" target=\"_blank\" rel=\"noopener\">Política de privacitat</a>",
      "sticky.full1": "Consultoria gratuïta per WhatsApp",
      "sticky.short1": "Consultoria gratis",
      "sticky.sub": "Et diem què automatitzar al teu negoci, sense compromís",
      "sticky.full2": "Sol·licitar consultoria gratuïta",
      "sticky.short2": "Consultoria gratuïta",
      "wa.implementar": "Hola, vull implementar IA al meu WhatsApp Business",
      "wa.consultoria": "Hola, vull la meva consultoria gratuïta de Tubot",
      "wa.proceso": "Hola, vull automatitzar un procés del meu WhatsApp amb IA",
      "wa.precio": "Hola, vull saber el preu de Tubot per al meu negoci",
      "seo.title": "TUBOT | IA per a WhatsApp Business",
      "seo.desc": "IA que automatitza el teu WhatsApp Business. Atén els teus clients, automatitza comandes i pressupostos i allibera el teu equip. Disponible 24/7, entrenada per al teu negoci.",
      "seo.orgDesc": "Tubot és una empresa espanyola que desenvolupa, desplega i opera bots de WhatsApp Business amb IA per a empreses. Els seus bots atenen clients, qualifiquen leads, gestionen cites, processen documents, responen àudios i integren converses amb CRM, ERP i eines internes.",
      "seo.svcName": "Bots de WhatsApp Business amb IA per a empreses",
      "seo.svcType": "Automatització de WhatsApp Business amb intel·ligència artificial",
      "seo.svcDesc": "Tubot crea bots de WhatsApp Business entrenats per a cada negoci, connectats als seus sistemes i operats de forma contínua. El servei inclou desplegament, integracions, manteniment, suport i millora contínua.",
      "seo.svcAud": "Empreses que reben clients, leads, reserves, documents o suport per WhatsApp"
    }
  };

  function t(key) {
    const d = I18N[LANG];
    return (d && Object.prototype.hasOwnProperty.call(d, key)) ? d[key] : null;
  }

  (function applyI18n() {
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
      // 4) JSON-LD: Google indexa el schema del DOM renderizado
      const ld = Array.prototype.find.call(
        document.querySelectorAll('script[type="application/ld+json"]'),
        s => s.textContent.indexOf('tubot.es/#organization') !== -1
      );
      if (ld) {
        try {
          const g = JSON.parse(ld.textContent);
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
                q.name = t('faq.q' + (i + 1)) || q.name;
                if (q.acceptedAnswer) q.acceptedAnswer.text = t('faq.a' + (i + 1)) || q.acceptedAnswer.text;
              });
            }
          });
          ld.textContent = JSON.stringify(g);
        } catch (e) {}
      }
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
      window.dataLayer.push({ event: 'click_whatsapp', cta_location: loc, link_url: a.href, language: LANG });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', { cta_location: loc, language: LANG, transport_type: 'beacon' });
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
      window.dataLayer.push({ event: 'calendly_booked', language: LANG });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'calendly_booked', { language: LANG, transport_type: 'beacon' });
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
