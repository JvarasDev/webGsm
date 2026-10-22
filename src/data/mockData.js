// Data extracted and synchronized with Kotlin Mobile Database Seed (Duoc UC DSY1105)
// GitHub: https://github.com/Liz-Elizabeth/GSM

export const enterpriseInfo = {
  name: "GSM IT & Digital Services",
  appFullName: "GSM · Gestión y Seguimiento Móvil de Solicitudes",
  tagline: "Centralización, Trazabilidad y Gestión de Solicitudes TI originadas en WhatsApp",
  description: "Plataforma empresarial desarrollada en Android Kotlin con Jetpack Compose y Room SQLite. Resuelve la fragmentación de requerimientos en WhatsApp, transformándolos en tickets formales con código único (#SOL-2026-XXXX), asignación técnica a especialistas, historial inmutable y control en tiempo real.",
  academicContext: {
    institution: "Duoc UC · Escuela de Informática y Telecomunicaciones",
    center: "CITT Puente Alto",
    subject: "DSY1105 · Desarrollo de Aplicaciones Móviles",
    coordinator: "Pablo Saldaña",
    term: "Examen Transversal 2026"
  },
  stats: [
    { value: "100%", label: "Trazabilidad de Requerimientos", detail: "Historial cronológico inmutable (HistorialEntity)" },
    { value: "0", label: "Solicitudes Perdidas en Chat", detail: "Código único formal SOL-2026-100X" },
    { value: "3", label: "Perfiles de Acceso Blindados", detail: "Cliente, Coordinador y Técnico" },
    { value: "< 2 min", label: "Derivación a WhatsApp", detail: "Mensaje estructurado con enlace de tracking" }
  ]
};

// 1. USUARIOS FICTICIOS DE PRUEBA (Kotlin Mock - Password para todos: "1234")
export const usuariosMock = [
  {
    id: 1,
    nombre: "Camila Rojas (Cliente Demo)",
    correo: "cliente@pyme.cl",
    password: "1234",
    rol: "CLIENTE",
    empresa: "Pyme Soluciones Alfa Ltda.",
    telefono: "+56900001111",
    medioContacto: "WhatsApp",
    serviciosAsociados: "Hosting, Desarrollo Web, Soporte de Correo",
    badgeColor: "#00d2ff"
  },
  {
    id: 2,
    nombre: "Roberto Méndez (Coordinador Admin)",
    correo: "admin@gsm.cl",
    password: "1234",
    rol: "ADMINISTRADOR",
    empresa: "GSM Servicios Digitales",
    telefono: "+56900002222",
    medioContacto: "WhatsApp",
    badgeColor: "#a855f7"
  },
  {
    id: 3,
    nombre: "Diego Soto (Técnico Soporte)",
    correo: "tecnico1@gsm.cl",
    password: "1234",
    rol: "TECNICO",
    empresa: "GSM Área Infraestructura",
    telefono: "+56900003333",
    medioContacto: "WhatsApp",
    badgeColor: "#10b981"
  },
  {
    id: 4,
    nombre: "Valentina Pino (Técnico Web)",
    correo: "tecnico2@gsm.cl",
    password: "1234",
    rol: "TECNICO",
    empresa: "GSM Área Desarrollo Web",
    telefono: "+56900004444",
    medioContacto: "WhatsApp",
    badgeColor: "#06b6d4"
  }
];

export const problemsVsSolutions = [
  {
    id: "lost-requests",
    title: "Pérdida de Visibilidad en Chats",
    problem: "Las solicitudes quedan diluidas en conversaciones masivas de WhatsApp, audios e imágenes sin seguimiento formal ni identificador.",
    solution: "Generación de código único (#SOL-2026-XXXX) al instante y persistencia local en Room SQLite + Sincronización API REST.",
    impact: "Control 100% auditable"
  },
  {
    id: "priority-assignment",
    title: "Sin Prioridad ni Responsable Asignado",
    problem: "Los técnicos atienden sin orden de urgencia y no se sabe con certeza quién está a cargo de cada requerimiento.",
    solution: "El Coordinador clasifica por categoría y prioridad (Baja, Media, Alta, Urgente) y asigna un técnico responsable explícito.",
    impact: "Reducción de demoras y omisiones"
  },
  {
    id: "progress-tracking",
    title: "Consultas Reiteradas de Clientes",
    problem: "El cliente debe preguntar insistentemente por WhatsApp para saber el avance de su sitio, hosting o incidencia.",
    solution: "Consulta en tiempo real del estado (RECIBIDA ➔ EN_REVISION ➔ ASIGNADA ➔ EN_PROCESO ➔ RESUELTA ➔ CERRADA) y enlace directo de seguimiento.",
    impact: "Experiencia uniforme y profesional"
  },
  {
    id: "evidence-history",
    title: "Falta de Evidencias y Detección de Atrasos",
    problem: "No hay constancia de las pruebas ejecutadas ni alertas automáticas cuando una solicitud urgente supera su fecha límite.",
    solution: "Carga de EvidenciaEntity simulada (imágenes/archivos), detección de solicitudes atrasadas (Criterio 23) y cierre formal.",
    impact: "Transparencia y cumplimiento de SLA"
  }
];

export const systemRoles = [
  {
    id: "cliente",
    name: "Perfil Cliente",
    badge: "Acceso Empresa / Pyme",
    color: "#00d2ff",
    description: "Informa necesidades, aporta antecedentes técnicos, consulta el avance en vivo y valida el resultado final del servicio.",
    userExample: "Camila Rojas (cliente@pyme.cl)",
    canDo: [
      "Registrar nueva solicitud con título, descripción y categoría",
      "Identificar el servicio o activo relacionado (web, hosting, correo)",
      "Adjuntar archivo o evidencia ficticia (EvidenciaEntity)",
      "Obtener identificador único (#SOL-2026-XXXX)",
      "Compartir mensaje estructurado por WhatsApp con 1 clic",
      "Consultar estado vigente y última actualización",
      "Revisar el historial cronológico y notas públicas",
      "Confirmar resolución o solicitar reapertura justificada"
    ],
    cannotDo: [
      "Consultar solicitudes de otros clientes (privacidad total)",
      "Modificar la prioridad asignada",
      "Asignar técnicos o responsables internos",
      "Eliminar el historial o bitácora de auditoría",
      "Cambiar directamente la solicitud a cerrada sin validación",
      "Acceder a comentarios internos entre técnicos y coordinador"
    ]
  },
  {
    id: "administrador",
    name: "Perfil Coordinador / Administrador",
    badge: "Control de Operaciones",
    color: "#a855f7",
    description: "Revisa, clasifica, prioriza, asigna y supervisa la carga de trabajo de todo el equipo de ingenieros y técnicos.",
    userExample: "Roberto Méndez (admin@gsm.cl)",
    canDo: [
      "Consultar panel maestro con todas las solicitudes de la empresa",
      "Revisar solicitudes nuevas en estado 'RECIBIDA'",
      "Clasificar y establecer nivel de prioridad (Baja, Media, Alta, Urgente)",
      "Asignar técnico responsable (Diego Soto o Valentina Pino)",
      "Identificar requerimientos pendientes y detectar solicitudes atrasadas (Criterio 23)",
      "Filtrar por cliente, estado, prioridad o técnico",
      "Supervisar historial y registrar comentarios de seguimiento",
      "Consultar dashboard ejecutivo con métricas por estado"
    ],
    cannotDo: [
      "Modificar el historial cronológico previo (inmutabilidad)",
      "Eliminar evidencias registradas por clientes o técnicos",
      "Omitir el registro de usuario y fecha en cada acción realizada"
    ]
  },
  {
    id: "tecnico",
    name: "Perfil Técnico / Ejecutor",
    badge: "Mesa de Ayuda & Desarrollo",
    color: "#10b981",
    description: "Ejecuta el trabajo técnico asignado, documenta avances, adjunta pruebas de resolución y marca el ticket como resuelto.",
    userExample: "Diego Soto (Soporte) / Valentina Pino (Web)",
    canDo: [
      "Bandeja personalizada con solicitudes asignadas a su cargo",
      "Ver antecedentes completos y evidencias subidas por el cliente",
      "Registrar avances de trabajo y tiempos de respuesta",
      "Incorporar comentarios técnicos y solicitar información adicional (Criterio 22)",
      "Actualizar estado a 'EN_PROCESO' y 'RESUELTA'",
      "Adjuntar capturas de pantalla y evidencias de solución",
      "Consultar el historial de acciones efectuadas"
    ],
    cannotDo: [
      "Consultar solicitudes de otros técnicos sin autorización",
      "Cerrar definitivamente el ticket (requiere conformidad del cliente)",
      "Alterar o suprimir el historial de cambios",
      "Modificar datos de contacto del cliente solicitante"
    ]
  }
];

export const statusesList = [
  { code: "RECIBIDA", label: "Recibida", color: "#38bdf8", desc: "La solicitud fue registrada y cuenta con identificador único." },
  { code: "REVISION", label: "En revisión", color: "#a855f7", desc: "La empresa está validando antecedentes, alcance y prioridad." },
  { code: "PENDIENTE_INFORMACION", label: "Pendiente de info", color: "#f59e0b", desc: "Se requiere antecedente o respuesta adicional del cliente (Criterio 22)." },
  { code: "ASIGNADA", label: "Asignada", color: "#6366f1", desc: "Existe un responsable técnico asignado para la atención." },
  { code: "EN_PROCESO", label: "En proceso", color: "#06b6d4", desc: "El técnico especialista se encuentra ejecutando la tarea." },
  { code: "RESUELTA", label: "Resuelta", color: "#10b981", desc: "Solución implementada y a la espera de confirmación del cliente." },
  { code: "CERRADA", label: "Cerrada", color: "#64748b", desc: "El cliente confirmó conformidad o el ciclo finalizó con éxito." },
  { code: "CANCELADA", label: "Cancelada", color: "#ef4444", desc: "La solicitud no continuará y se registró el motivo formal." }
];

export const categoriesList = [
  "INCIDENTE_TECNICO",
  "SOPORTE_CORREO",
  "MARKETING_DIGITAL",
  "HOSTING",
  "Mantenimiento Web",
  "Desarrollo Web",
  "Consulta Técnica",
  "Acceso o Configuración"
];

export const prioritiesList = [
  { level: "BAJA", color: "#10b981", sla: "48 - 72 hrs" },
  { level: "MEDIA", color: "#f59e0b", sla: "24 - 48 hrs" },
  { level: "ALTA", color: "#f97316", sla: "8 - 12 hrs" },
  { level: "URGENTE", color: "#ef4444", sla: "< 4 hrs" }
];

// 2, 3, 4, 5: Exact Solicitudes Mock from Kotlin Database Seed
export const sampleTickets = [
  {
    id: "SOL-2026-1001",
    title: "Error 500 al subir catálogo en sitio web",
    client: "Camila Rojas (Cliente Demo)",
    company: "Pyme Soluciones Alfa Ltda.",
    contact: "+56900001111",
    category: "INCIDENTE_TECNICO",
    priority: "ALTA",
    status: "Recibida",
    statusCode: "RECIBIDA",
    service: "Mantenimiento Web",
    asset: "https://tienda.pymealfa-ficticia.cl",
    assignedTo: "Sin Asignar (Pendiente)",
    assignedTechId: null,
    createdAt: "Hoy hace 2 horas",
    updatedAt: "Hoy hace 2 horas",
    deadline: "En 22 horas",
    isOverdue: false,
    description: "Al intentar actualizar los productos desde el panel web aparece pantalla blanca con Error 500.",
    evidenceName: "captura_error_500_ficticia.png (320 KB)",
    history: [
      {
        date: "Hoy hace 2 horas",
        user: "Camila Rojas (CLIENTE)",
        role: "CLIENTE",
        action: "CREACION",
        status: "Recibida",
        comment: "Solicitud registrada formalmente desde mensaje de WhatsApp."
      }
    ]
  },
  {
    id: "SOL-2026-1002",
    title: "Caída de servicio de correo corporativo",
    client: "Camila Rojas (Cliente Demo)",
    company: "Pyme Soluciones Alfa Ltda.",
    contact: "+56900001111",
    category: "SOPORTE_CORREO",
    priority: "URGENTE",
    status: "En proceso",
    statusCode: "EN_PROCESO",
    service: "Hosting y Correo",
    asset: "mail.pymealfa-ficticia.cl",
    assignedTo: "Diego Soto (Técnico Soporte)",
    assignedTechId: 3,
    createdAt: "Ayer (hace 12 horas)",
    updatedAt: "Hoy hace 3 horas",
    deadline: "Vencida hace 5 horas",
    isOverdue: true, // Probar Criterio 23: Detección de solicitudes atrasadas
    description: "Las cuentas de ventas no pueden enviar ni recibir correos desde ayer.",
    history: [
      {
        date: "Ayer (hace 12 horas)",
        user: "Camila Rojas (CLIENTE)",
        role: "CLIENTE",
        action: "CREACION",
        status: "Recibida",
        comment: "Solicitud ingresada por WhatsApp con reporte de interrupción masiva."
      },
      {
        date: "Ayer (hace 10 horas)",
        user: "Roberto Méndez (ADMINISTRADOR)",
        role: "ADMINISTRADOR",
        action: "ASIGNACION",
        status: "Asignada",
        comment: "Asignado con prioridad URGENTE al técnico Diego Soto."
      },
      {
        date: "Hoy hace 3 horas",
        user: "Diego Soto (TECNICO)",
        role: "TECNICO",
        action: "AVANCE",
        status: "En proceso",
        comment: "Revisando registros DNS y certificados SSL del servidor de correo."
      }
    ]
  },
  {
    id: "SOL-2026-1003",
    title: "Actualización de banner campaña marketing",
    client: "Camila Rojas (Cliente Demo)",
    company: "Pyme Soluciones Alfa Ltda.",
    contact: "+56900001111",
    category: "MARKETING_DIGITAL",
    priority: "MEDIA",
    status: "Pendiente de info",
    statusCode: "PENDIENTE_INFORMACION",
    service: "Marketing Digital",
    asset: "https://pymealfa-ficticia.cl",
    assignedTo: "Valentina Pino (Técnico Web)",
    assignedTechId: 4,
    createdAt: "Ayer (hace 24 horas)",
    updatedAt: "Hoy hace 4 horas",
    deadline: "En 44 horas",
    isOverdue: false,
    description: "Requerimos cambiar el banner principal de inicio por la campaña de invierno.",
    history: [
      {
        date: "Ayer (hace 24 horas)",
        user: "Camila Rojas (CLIENTE)",
        role: "CLIENTE",
        action: "CREACION",
        status: "Recibida",
        comment: "Solicitud de cambio de banner enviada por el cliente."
      },
      {
        date: "Ayer (hace 20 horas)",
        user: "Roberto Méndez (ADMINISTRADOR)",
        role: "ADMINISTRADOR",
        action: "ASIGNACION",
        status: "Asignada",
        comment: "Asignada a Valentina Pino (Desarrollo Web)."
      },
      {
        date: "Hoy hace 4 horas",
        user: "Valentina Pino (TECNICO)",
        role: "TECNICO",
        action: "SOLICITUD_INFO",
        status: "Pendiente de info",
        comment: "Por favor adjuntar el archivo gráfico en formato PNG y el texto legal de la promoción."
      }
    ]
  },
  {
    id: "SOL-2026-1004",
    title: "Creación de subdominio para entorno de pruebas",
    client: "Camila Rojas (Cliente Demo)",
    company: "Pyme Soluciones Alfa Ltda.",
    contact: "+56900001111",
    category: "HOSTING",
    priority: "BAJA",
    status: "Resuelta",
    statusCode: "RESUELTA",
    service: "Hosting",
    asset: "demo.pymealfa-ficticia.cl",
    assignedTo: "Diego Soto (Técnico Soporte)",
    assignedTechId: 3,
    createdAt: "Hace 2 días (48 horas)",
    updatedAt: "Hoy hace 1 hora",
    deadline: "En 24 horas",
    isOverdue: false,
    description: "Se solicita habilitar demo.pymealfa-ficticia.cl apuntando al servidor de test.",
    resolution: "Se configuró el registro CNAME y el certificado SSL en el panel de hosting ficticio.",
    notificationMessage: "Tu solicitud #SOL-2026-1004 fue marcada como Resuelta. Confirma tu conformidad.",
    history: [
      {
        date: "Hace 48 horas",
        user: "Camila Rojas (CLIENTE)",
        role: "CLIENTE",
        action: "CREACION",
        status: "Recibida",
        comment: "Requerimiento de hosting ingresado."
      },
      {
        date: "Hace 24 horas",
        user: "Roberto Méndez (ADMINISTRADOR)",
        role: "ADMINISTRADOR",
        action: "ASIGNACION",
        status: "Asignada",
        comment: "Asignada a Diego Soto (Área Infraestructura)."
      },
      {
        date: "Hoy hace 1 hora",
        user: "Diego Soto (TECNICO)",
        role: "TECNICO",
        action: "RESOLUCION",
        status: "Resuelta",
        comment: "Solución: Subdominio activo con SSL funcionando. Queda a la espera de conformidad del cliente."
      }
    ]
  }
];

export const techStackDetails = [
  {
    name: "Kotlin 2.0 & Android Studio",
    category: "Mobile Core",
    icon: "Smartphone",
    desc: "Desarrollo nativo para dispositivos Android, alto rendimiento y corrutinas asíncronas."
  },
  {
    name: "Jetpack Compose & Material 3",
    category: "UI Moderna",
    icon: "Layout",
    desc: "Interfaz declarativa con temas dinámicos, modo oscuro, componentes táctiles accesibles y fluidos."
  },
  {
    name: "Arquitectura MVVM & StateFlow",
    category: "Software Pattern",
    icon: "Layers",
    desc: "Separación estricta entre capa de presentación, lógica de negocio y repositorios de datos."
  },
  {
    name: "Room Database (SQLite Local)",
    category: "Persistencia Offline",
    icon: "Database",
    desc: "Entidades: UsuarioEntity, SolicitudEntity, HistorialEntity, EvidenciaEntity y NotificacionEntity."
  },
  {
    name: "Spring Boot Microservicios & Retrofit",
    category: "Backend REST API",
    icon: "Server",
    desc: "Comunicación HTTP segura para sincronización de tickets, actualización de estados y logs de auditoría."
  },
  {
    name: "WhatsApp Bridge Intent",
    category: "Integración Canales",
    icon: "MessageSquare",
    desc: "Generación de mensajes estructurados con código SOL-2026-XXXX y URL de seguimiento sin APIs de pago."
  }
];

export const galleryItems = [
  {
    id: "app-showcase",
    title: "Aplicación Móvil Android GSM",
    category: "Aplicación Nativa",
    image: "/images/gsm_app_mockup.jpg",
    desc: "Pantalla principal con tarjetas de tickets en vivo (SOL-2026-1001 a 1004), estados neón, prioridades y enlace de derivación a WhatsApp."
  },
  {
    id: "headquarters",
    title: "Sede Central & Oficinas GSM",
    category: "Instalaciones Corporativas",
    image: "/images/gsm_modern_office.jpg",
    desc: "Espacios de trabajo colaborativos de alta tecnología, salas de reuniones vidriadas y recepción corporativa en Puente Alto."
  },
  {
    id: "tech-team",
    title: "Mesa de Arquitectura y Desarrollo",
    category: "Equipo de Ingeniería",
    image: "/images/gsm_technical_team.jpg",
    desc: "Equipo multidisciplinario analizando diagramas de flujo de solicitudes, arquitectura MVVM y trazabilidad de requerimientos."
  },
  {
    id: "data-center",
    title: "Soporte de Infraestructura & Cloud",
    category: "Especialistas TI",
    image: "/images/gsm_support_engineer.jpg",
    desc: "Ingenieros de soporte monitoreando racks de servidores, correo corporativo y estado de servicios de hosting para pymes."
  }
];

// Equpo real del proyecto y de la aplicación GSM
export const teamMembers = [
  {
    name: "Elizabeth (Liz-Elizabeth)",
    role: "Lead Mobile Developer & Creadora de la App GSM",
    bio: "Desarrolladora principal de la app móvil GSM en Kotlin nativo, Jetpack Compose, Room SQLite y arquitectura MVVM. Autora del repositorio oficial.",
    github: "https://github.com/Liz-Elizabeth/GSM",
    linkedin: "https://linkedin.com",
    email: "elizabeth@gsm.cl",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Roberto Méndez",
    role: "Coordinador Administrador (Mesa de Operaciones)",
    bio: "Encargado de revisar solicitudes en estado RECIBIDA, clasificar prioridades, derivar al técnico idóneo y detectar tickets atrasados (Criterio 23).",
    github: "https://github.com/Liz-Elizabeth/GSM",
    linkedin: "https://linkedin.com",
    email: "admin@gsm.cl",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Diego Soto",
    role: "Técnico Soporte (Área Infraestructura)",
    bio: "Especialista en servidores de correo corporativo, hosting, configuración de subdominios, certificados SSL y resolución de incidentes críticos.",
    github: "https://github.com/Liz-Elizabeth/GSM",
    linkedin: "https://linkedin.com",
    email: "tecnico1@gsm.cl",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Valentina Pino",
    role: "Técnica Web (Área Desarrollo Web)",
    bio: "Especialista en desarrollo frontend, actualización de banners, maquetación de catálogos y gestión de solicitudes de marketing digital.",
    github: "https://github.com/Liz-Elizabeth/GSM",
    linkedin: "https://linkedin.com",
    email: "tecnico2@gsm.cl",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  }
];

export const corporateContacts = {
  generalEmail: "admin@gsm.cl",
  supportEmail: "tecnico1@gsm.cl",
  webEmail: "tecnico2@gsm.cl",
  clientEmail: "cliente@pyme.cl",
  phone: "+56 9 0000 2222",
  whatsapp: "+56 9 0000 2222",
  address: "Av. Concha y Toro 1340, Puente Alto, Región Metropolitana (Sede Duoc UC CITT)",
  githubRepo: "https://github.com/Liz-Elizabeth/GSM",
  linkedinOrg: "https://linkedin.com"
};
