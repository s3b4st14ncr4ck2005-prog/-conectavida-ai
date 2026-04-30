export type Category =
  | "salud"
  | "ubicacion"
  | "tramites"
  | "emergencia"
  | "educacion"
  | "general";

export interface AIMessage {
  category: Category;
  emoji: string;
  title: string;
  intro: string;
  steps: string[];
  contacts?: { label: string; number: string }[];
  links?: { label: string; url: string }[];
}

const keywordsMap: Record<Exclude<Category, "general">, string[]> = {
  emergencia: [
    "urgente",
    "emergencia",
    "ayuda",
    "peligro",
    "accidente",
    "robo",
    "auxilio",
    "socorro",
    "fuego",
    "incendio",
    "golpearon",
    "atracaron",
    "amenaza",
    "violencia",
    "herido",
    "grave",
    "desmayo",
    "inconsciente",
    "muerto",
    "pistola",
    "cuchillo",
    "ataque",
    "me atacan",
  ],
  salud: [
    "mal",
    "dolor",
    "fiebre",
    "enfermo",
    "enferma",
    "síntoma",
    "medicina",
    "médico",
    "hospital",
    "clínica",
    "pastilla",
    "cita",
    "eps",
    "gripa",
    "covid",
    "herida",
    "sangra",
    "mareo",
    "vómito",
    "diarrea",
    "tos",
    "cuerpo",
    "cabeza",
    "estómago",
    "corazón",
    "respirar",
    "siento mal",
  ],
  ubicacion: [
    "perdido",
    "perdida",
    "dirección",
    "cómo llego",
    "dónde",
    "bus",
    "metro",
    "transporte",
    "ruta",
    "taxi",
    "uber",
    "transmilenio",
    "sitp",
    "estación",
    "calle",
    "barrio",
    "mapa",
    "llegar",
    "camino",
    "estoy perdido",
  ],
  tramites: [
    "documento",
    "cédula",
    "trámite",
    "papeles",
    "registro",
    "certificado",
    "firma",
    "apostilla",
    "pasaporte",
    "notaría",
    "registraduría",
    "dian",
    "rut",
    "renta",
    "impuesto",
    "multa",
    "contrato",
    "licencia",
    "visa",
    "carné",
    "nacimiento",
    "matrimonio",
    "divorcio",
    "entiendo",
  ],
  educacion: [
    "estudiar",
    "beca",
    "sena",
    "universidad",
    "aprender",
    "curso",
    "matemáticas",
    "inglés",
    "idioma",
    "carrera",
    "icfes",
    "prueba",
    "tarea",
    "escuela",
    "colegio",
    "grado",
    "capacitación",
    "diploma",
    "quiero estudiar",
  ],
};

function detectCategory(message: string): Category {
  const lower = message.toLowerCase();
  // Emergencia first — highest priority
  if (keywordsMap.emergencia.some((w) => lower.includes(w)))
    return "emergencia";
  for (const [cat, words] of Object.entries(keywordsMap) as [
    Exclude<Category, "general">,
    string[],
  ][]) {
    if (cat === "emergencia") continue;
    if (words.some((w) => lower.includes(w))) return cat;
  }
  return "general";
}

const responseTemplates: Record<Category, (msg: string) => AIMessage> = {
  emergencia: () => ({
    category: "emergencia",
    emoji: "🚨",
    title: "Situación de emergencia detectada",
    intro:
      "Tu seguridad es la prioridad absoluta. Mantén la calma y actúa así:",
    steps: [
      "Llama AHORA al 123 — línea nacional de emergencias (Policía, Bomberos, Ambulancia)",
      "Si estás en peligro inmediato, aléjate hacia un lugar público con otras personas",
      "Avisa a un familiar o amigo tu ubicación exacta: calle, barrio y ciudad",
      "Activa la ubicación en tiempo real en WhatsApp y compártela con alguien de confianza",
      "No confrontes a agresores — tu vida vale infinitamente más que cualquier objeto",
      "Una vez seguro, quédate en el lugar y espera a las autoridades",
    ],
    contacts: [
      { label: "Emergencias Colombia", number: "123" },
      { label: "Cruz Roja", number: "132" },
      { label: "Defensa Civil", number: "144" },
      { label: "Línea violencia / mujer", number: "155" },
    ],
  }),

  salud: (msg) => ({
    category: "salud",
    emoji: "🏥",
    title: "Orientación de salud",
    intro: "Entiendo que no te sientes bien. Te guío paso a paso:",
    steps: [
      msg.toLowerCase().includes("grave") ||
      msg.toLowerCase().includes("urgente") ||
      msg.toLowerCase().includes("difícil respirar")
        ? "⚠️ Esto puede ser urgente — ve a urgencias ahora o llama al 123"
        : "Evalúa la gravedad: ¿llevas más de 48 h con síntomas? ¿Tienes dificultad para respirar?",
      "Llama al número de tu EPS (está en la parte trasera del carné) — tienen línea 24 h",
      "Muchas EPS tienen teleconsulta gratuita por app o WhatsApp — evita filas innecesarias",
      "Si tienes fiebre mayor a 38,5 °C por más de 2 días seguidos, busca atención presencial",
      "Mantente muy hidratado: toma agua o suero oral cada 30 minutos",
      "Anota síntomas, cuándo empezaron y qué los mejora o empeora — el médico lo necesitará",
    ],
    contacts: [
      { label: "Línea de Salud", number: "106" },
      { label: "Emergencias", number: "123" },
      { label: "Minsalud info", number: "018000910097" },
    ],
  }),

  ubicacion: () => ({
    category: "ubicacion",
    emoji: "📍",
    title: "Guía de navegación",
    intro: "Te ayudo a moverte por la ciudad. Sigue estos pasos:",
    steps: [
      "Abre Google Maps y escribe tu destino — funciona en toda Colombia incluso con poca señal",
      "Para Bogotá: descarga 'Moovit' — rutas exactas de Transmilenio y SITP con horarios en tiempo real",
      "Para Medellín: usa la app oficial del Metro de Medellín o también Moovit",
      "Para Cali: app 'MÍO' (Masivo Integrado de Occidente) para rutas de bus articulado",
      "Descarga el mapa offline de tu ciudad en Google Maps antes de salir (funciona sin internet)",
      "Si vas de noche: toma rutas principales bien iluminadas y comparte tu viaje en tiempo real",
    ],
    links: [
      { label: "Moovit Colombia", url: "https://moovitapp.com" },
      {
        label: "Transmilenio horarios",
        url: "https://www.transmilenio.gov.co",
      },
    ],
  }),

  tramites: () => ({
    category: "tramites",
    emoji: "📋",
    title: "Orientación en trámites",
    intro:
      "Colombia ha digitalizado la mayoría de servicios. Aquí te explico cómo proceder:",
    steps: [
      "Empieza en gov.co — portal oficial con TODOS los trámites del gobierno en un solo lugar",
      "Cédula / tarjeta de identidad / pasaporte: registraduria.gov.co — agenda cita en línea",
      "Impuestos, RUT o DIAN: dian.gov.co — la mayoría de trámites son 100 % virtuales hoy",
      "Apostillas y documentos para el exterior: cancilleria.gov.co — apostilla electrónica disponible",
      "Lleva siempre: fotocopia de cédula + documento original + comprobante de pago si aplica",
      "Las filas son largas después de las 8 a.m. — llega antes de las 7 si es trámite presencial",
      "Muchos trámites aceptan firma electrónica — ahorra el desplazamiento",
    ],
    links: [
      { label: "Portal GOV.CO", url: "https://www.gov.co" },
      {
        label: "Registraduría Nacional",
        url: "https://www.registraduria.gov.co",
      },
      { label: "DIAN Virtual", url: "https://www.dian.gov.co" },
    ],
  }),

  educacion: () => ({
    category: "educacion",
    emoji: "🎓",
    title: "Recursos educativos gratuitos",
    intro: "La educación es tu mejor inversión. Tienes oportunidades reales:",
    steps: [
      "SENA: cursos técnicos GRATUITOS en oferta.sena.edu.co — virtuales y presenciales en todo el país",
      "ICETEX: créditos blandos y becas condonables para universidad — revisa icetex.gov.co",
      "Coursera / edX: cursos certificados de universidades del mundo, muchos gratis en modo auditoría",
      "Khan Academy: matemáticas y ciencias desde cero hasta avanzado, 100 % gratis en español",
      "Duolingo: aprende inglés, portugués u otro idioma en 15 minutos al día — completamente gratis",
      "Para el ICFES / Saber 11: simulacros gratuitos en icfes.gov.co — prepárate con meses de anticipación",
    ],
    links: [
      { label: "SENA Oferta Educativa", url: "https://oferta.sena.edu.co" },
      { label: "ICETEX Becas", url: "https://www.icetex.gov.co" },
      { label: "Khan Academy Español", url: "https://es.khanacademy.org" },
    ],
  }),

  general: () => ({
    category: "general",
    emoji: "👋",
    title: "¡Hola! Soy ConectaVida AI",
    intro:
      "Estoy aquí para ayudarte con lo que necesites en tu vida diaria en Colombia. Puedo orientarte en:",
    steps: [
      "🏥 Salud — síntomas, citas EPS, orientación médica",
      "📍 Ubicación — rutas, transporte público, cómo llegar a tu destino",
      "📋 Trámites — cédula, documentos, portales del gobierno",
      "🚨 Emergencias — respuesta rápida y números de auxilio",
      "🎓 Educación — SENA, becas, cursos gratuitos",
      "Cuéntame más sobre tu situación y te doy orientación específica.",
    ],
  }),
};

export function getAIResponse(message: string): AIMessage {
  const category = detectCategory(message);
  return responseTemplates[category](message);
}
