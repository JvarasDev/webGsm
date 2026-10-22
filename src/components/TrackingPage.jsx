import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowLeft, CheckCircle, Clock, AlertTriangle, 
  Share2, MessageCircle, Copy, Check, FileText, User, 
  Building, RefreshCw, Send, ShieldCheck, ChevronRight,
  ExternalLink, Bell, Smartphone, HelpCircle
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { 
  sampleTickets, statusesList, prioritiesList, 
  corporateContacts, usuariosMock 
} from '../data/mockData';

export default function TrackingPage({ initialTicketId, onNavigateHome }) {
  const [tickets, setTickets] = useState(sampleTickets);
  const [searchCode, setSearchCode] = useState(initialTicketId || 'SOL-2026-1004');
  const [activeTicketId, setActiveTicketId] = useState(initialTicketId || 'SOL-2026-1004');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWA, setCopiedWA] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  // Update when initialTicketId prop changes
  useEffect(() => {
    if (initialTicketId) {
      setActiveTicketId(initialTicketId);
      setSearchCode(initialTicketId);
    }
  }, [initialTicketId]);

  // Current active ticket
  const currentTicket = tickets.find(t => 
    t.id.toLowerCase() === activeTicketId.toLowerCase()
  ) || tickets.find(t => t.id === 'SOL-2026-1004') || tickets[0];

  // Helper for status color
  const getStatusColor = (statusLabel) => {
    const s = statusesList.find(item => 
      item.label.toLowerCase() === statusLabel?.toLowerCase() || 
      item.code.toLowerCase() === statusLabel?.toLowerCase()
    );
    return s ? s.color : '#38bdf8';
  };

  // Helper for priority color
  const getPriorityColor = (pLevel) => {
    const p = prioritiesList.find(item => item.level.toUpperCase() === pLevel?.toUpperCase());
    return p ? p.color : '#f59e0b';
  };

  // Lifecycle steps calculation
  const getStepProgress = (status) => {
    switch (status?.toLowerCase()) {
      case 'recibida': return 1;
      case 'en revisión':
      case 'asignada': return 2;
      case 'en proceso':
      case 'pendiente de info':
      case 'pendiente_informacion': return 3;
      case 'resuelta': return 4;
      case 'cerrada': return 5;
      default: return 1;
    }
  };

  const currentStep = getStepProgress(currentTicket.status);

  // Handle Search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    const found = tickets.find(t => t.id.toUpperCase() === clean);
    if (found) {
      setActiveTicketId(found.id);
      window.history.pushState(null, '', `/seguimiento/${found.id}`);
    } else {
      setActionFeedback({
        type: 'error',
        message: `No se encontró la solicitud "${clean}". Puedes probar con: SOL-2026-1001, SOL-2026-1002, SOL-2026-1003 o SOL-2026-1004.`
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  // Quick switch mock
  const selectMock = (id) => {
    setActiveTicketId(id);
    setSearchCode(id);
    window.history.pushState(null, '', `/seguimiento/${id}`);
  };

  // Action: Client confirms conformity (Criterio 32 / 34)
  const handleConfirmClosure = () => {
    const now = new Date();
    const dateStr = `Hoy a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = tickets.map(t => {
      if (t.id === currentTicket.id) {
        return {
          ...t,
          status: 'Cerrada',
          statusCode: 'CERRADA',
          updatedAt: dateStr,
          history: [
            ...t.history,
            {
              date: dateStr,
              user: `${t.client} (CLIENTE)`,
              role: 'CLIENTE',
              action: 'CONFORMIDAD_CIERRE',
              status: 'Cerrada',
              comment: 'El cliente confirmó la conformidad del servicio recibido. Cierre formal registrado en el historial (Criterio 32).'
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
    setActionFeedback({
      type: 'success',
      message: '¡Conformidad registrada con éxito! La solicitud ha pasado a estado Cerrada.'
    });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Action: Client requests reopening (Criterio 33)
  const handleRequestReopen = () => {
    const now = new Date();
    const dateStr = `Hoy a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = tickets.map(t => {
      if (t.id === currentTicket.id) {
        return {
          ...t,
          status: 'En proceso',
          statusCode: 'EN_PROCESO',
          updatedAt: dateStr,
          history: [
            ...t.history,
            {
              date: dateStr,
              user: `${t.client} (CLIENTE)`,
              role: 'CLIENTE',
              action: 'REAPERTURA',
              status: 'En proceso',
              comment: 'El cliente solicitó la reapertura del caso para revisión técnica adicional (Criterio 33).'
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
    setActionFeedback({
      type: 'info',
      message: 'Reapertura solicitada. El técnico a cargo revisará nuevamente el caso.'
    });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Action: Client responds to additional info request (Criterio 22)
  const handleSendInfo = () => {
    const now = new Date();
    const dateStr = `Hoy a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = tickets.map(t => {
      if (t.id === currentTicket.id) {
        return {
          ...t,
          status: 'En proceso',
          statusCode: 'EN_PROCESO',
          updatedAt: dateStr,
          history: [
            ...t.history,
            {
              date: dateStr,
              user: `${t.client} (CLIENTE)`,
              role: 'CLIENTE',
              action: 'RESPUESTA_CLIENTE',
              status: 'En proceso',
              comment: 'Cliente adjuntó los antecedentes requeridos por el técnico especialista.'
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
    setActionFeedback({
      type: 'success',
      message: 'Información adicional enviada al técnico. La solicitud volvió a estado En Proceso.'
    });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Copy tracking URL
  const handleCopyLink = () => {
    const trackingUrl = `${window.location.origin}/seguimiento/${currentTicket.id}`;
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // WhatsApp structured text
  const buildWhatsAppMessage = () => {
    return `🔔 *CONSULTA DE SEGUIMIENTO GSM [${currentTicket.id}]*\n` +
      `📌 *Título:* ${currentTicket.title}\n` +
      `🏢 *Cliente:* ${currentTicket.client}\n` +
      `🏷️ *Categoría:* ${currentTicket.category}\n` +
      `⚡ *Prioridad:* ${currentTicket.priority}\n` +
      `🚦 *Estado Actual:* ${currentTicket.status}\n` +
      `👨‍💻 *Responsable:* ${currentTicket.assignedTo}\n` +
      `🔗 *Ver en Línea:* ${window.location.origin}/seguimiento/${currentTicket.id}\n` +
      `_Sistema GSM · Duoc UC DSY1105_`;
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage());
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2500);
  };

  return (
    <div className="tracking-page-root">
      {/* Top Tracking Navbar */}
      <nav className="tracking-navbar">
        <div className="container tracking-nav-container">
          <div className="tracking-nav-left">
            <button className="back-home-btn" onClick={onNavigateHome}>
              <ArrowLeft size={18} />
              <span>Volver a la Web Principal</span>
            </button>
            <div className="tracking-brand-badge">
              <span className="live-dot-green"></span>
              <span>Portal de Seguimiento Público GSM</span>
            </div>
          </div>

          <div className="tracking-nav-right">
            <a 
              href={corporateContacts.githubRepo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="icon-link-btn"
              title="Repositorio oficial en GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href={`https://wa.me/56900002222?text=${encodeURIComponent(`Hola Roberto Méndez, consulto por la solicitud ${currentTicket.id}`)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-btn-wa"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Mesa de Ayuda</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container tracking-main-container">
        {/* Search Bar & Quick Mock Selectors */}
        <div className="tracking-search-header glass-panel">
          <div className="search-header-text">
            <h2>Consulta de Estado y Trazabilidad en Tiempo Real</h2>
            <p>Ingresa tu código único de solicitud (ej: <strong>SOL-2026-1004</strong>) originado en WhatsApp o selecciona los casos de prueba del seed de Kotlin.</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="tracking-search-form">
            <div className="tracking-input-wrapper">
              <Search size={20} className="search-input-icon" />
              <input 
                type="text" 
                placeholder="Ingresa código (ej: SOL-2026-1004)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="tracking-input"
              />
            </div>
            <button type="submit" className="btn-primary">
              <span>Consultar</span>
              <ChevronRight size={18} />
            </button>
          </form>

          {/* Quick Mock Selectors */}
          <div className="quick-mocks-row">
            <span className="quick-mocks-label">Solicitudes de Prueba (Kotlin Mock):</span>
            <div className="quick-mocks-chips">
              {sampleTickets.map((t) => (
                <button
                  key={t.id}
                  className={`mock-chip-btn ${t.id === currentTicket.id ? 'active' : ''}`}
                  onClick={() => selectMock(t.id)}
                >
                  <span className="chip-code">{t.id}</span>
                  <span className="chip-status">{t.status}</span>
                  {t.isOverdue && <span className="chip-overdue">ATRASADA</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {actionFeedback && (
          <div className={`tracking-toast ${actionFeedback.type}`}>
            <CheckCircle size={18} />
            <span>{actionFeedback.message}</span>
          </div>
        )}

        {/* Lifecycle Stepper Bar */}
        <div className="tracking-stepper-box glass-panel">
          <div className="stepper-title-row">
            <h3>Progreso del Ciclo de Vida de la Solicitud</h3>
            <span className="current-step-badge">Etapa {currentStep} de 5</span>
          </div>

          <div className="stepper-track">
            <div 
              className="stepper-progress-fill" 
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            ></div>

            <div className={`step-node ${currentStep >= 1 ? 'completed active' : ''}`}>
              <div className="step-circle">1</div>
              <span className="step-name">Recibida</span>
              <span className="step-sub">Origen WhatsApp</span>
            </div>

            <div className={`step-node ${currentStep >= 2 ? 'completed active' : ''}`}>
              <div className="step-circle">2</div>
              <span className="step-name">Asignada</span>
              <span className="step-sub">Coordinador Admin</span>
            </div>

            <div className={`step-node ${currentStep >= 3 ? 'completed active' : ''}`}>
              <div className="step-circle">3</div>
              <span className="step-name">En Proceso</span>
              <span className="step-sub">Técnico Ejecutor</span>
            </div>

            <div className={`step-node ${currentStep >= 4 ? 'completed active' : ''}`}>
              <div className="step-circle">4</div>
              <span className="step-name">Resuelta</span>
              <span className="step-sub">Solución Técnica</span>
            </div>

            <div className={`step-node ${currentStep >= 5 ? 'completed active' : ''}`}>
              <div className="step-circle">5</div>
              <span className="step-name">Cerrada</span>
              <span className="step-sub">Conformidad Cliente</span>
            </div>
          </div>
        </div>

        {/* Main Ticket Card & Details */}
        <div className="tracking-content-grid">
          {/* Left Column: Ticket Details & Actions */}
          <div className="tracking-details-card glass-panel">
            {/* Overdue Alert banner if applicable (Criterio 23) */}
            {currentTicket.isOverdue && (
              <div className="overdue-banner-alert">
                <AlertTriangle size={22} color="#ef4444" />
                <div>
                  <strong>⚠️ Criterio 23: Solicitud Atrasada (SLA Vencido)</strong>
                  <p>La fecha límite de atención ({currentTicket.deadline}) ha sido superada. Priorizada en bandeja de Mesa de Ayuda de Roberto Méndez.</p>
                </div>
              </div>
            )}

            {/* Header info */}
            <div className="ticket-main-header">
              <div className="ticket-badges-row">
                <span className="tracking-id-tag">{currentTicket.id}</span>
                <span 
                  className="ticket-status-pill"
                  style={{ 
                    backgroundColor: `${getStatusColor(currentTicket.status)}25`, 
                    color: getStatusColor(currentTicket.status),
                    borderColor: getStatusColor(currentTicket.status)
                  }}
                >
                  ● {currentTicket.status}
                </span>
                <span 
                  className="ticket-priority-pill"
                  style={{ color: getPriorityColor(currentTicket.priority) }}
                >
                  Prioridad: {currentTicket.priority}
                </span>
              </div>
              <span className="ticket-timestamp">
                <Clock size={14} /> Creado: {currentTicket.createdAt}
              </span>
            </div>

            <h1 className="tracking-ticket-title">{currentTicket.title}</h1>
            <p className="tracking-ticket-desc">{currentTicket.description}</p>

            {/* Technical Resolution Box (Criterio 31) */}
            {currentTicket.resolution && (
              <div className="resolution-highlight-box">
                <div className="resolution-header">
                  <CheckCircle size={20} color="#10b981" />
                  <h4>Propuesta de Solución Registrada (Criterio 31)</h4>
                </div>
                <p className="resolution-text">{currentTicket.resolution}</p>
                <div className="resolution-meta">
                  <span>Implementado por: <strong>{currentTicket.assignedTo}</strong></span>
                  <span>Última actualización: {currentTicket.updatedAt}</span>
                </div>
              </div>
            )}

            {/* Notification Alert (Criterio 28) */}
            {currentTicket.notificationMessage && (
              <div className="notification-preview-pill">
                <Bell size={17} color="#38bdf8" />
                <span><strong>Notificación Push:</strong> {currentTicket.notificationMessage}</span>
              </div>
            )}

            {/* Client Interactive Action Buttons based on status */}
            <div className="client-action-bar">
              {currentTicket.status === 'Resuelta' && (
                <div className="client-prompt-box">
                  <p className="client-prompt-text">
                    La empresa ha solucionado el requerimiento. Por favor confirma tu conformidad o solicita la reapertura del caso:
                  </p>
                  <div className="prompt-buttons-group">
                    <button className="btn-confirm-closure" onClick={handleConfirmClosure}>
                      <CheckCircle size={18} />
                      <span>Confirmar Conformidad (Cerrar Solicitud)</span>
                    </button>
                    <button className="btn-reopen" onClick={handleRequestReopen}>
                      <RefreshCw size={16} />
                      <span>Solicitar Reapertura</span>
                    </button>
                  </div>
                </div>
              )}

              {currentTicket.status === 'Pendiente de info' && (
                <div className="client-prompt-box warning">
                  <p className="client-prompt-text">
                    El técnico especialista <strong>{currentTicket.assignedTo}</strong> solicitó antecedentes adicionales para continuar (Criterio 22).
                  </p>
                  <button className="btn-respond-info" onClick={handleSendInfo}>
                    <Send size={16} />
                    <span>Enviar Archivos y Antecedentes Solicitados</span>
                  </button>
                </div>
              )}

              {currentTicket.status === 'Cerrada' && (
                <div className="closure-confirmed-box">
                  <CheckCircle size={20} color="#10b981" />
                  <span>Esta solicitud cuenta con cierre formal y conformidad confirmada por el cliente.</span>
                </div>
              )}
            </div>

            {/* Information Grid */}
            <div className="tracking-info-grid">
              <div className="t-info-item">
                <span className="t-info-label">Cliente Solicitante:</span>
                <span className="t-info-value">{currentTicket.client}</span>
                <span className="t-info-sub">{currentTicket.company} · {currentTicket.contact}</span>
              </div>
              <div className="t-info-item">
                <span className="t-info-label">Categoría del Servicio:</span>
                <span className="t-info-value">{currentTicket.category}</span>
                <span className="t-info-sub">Servicio: {currentTicket.service}</span>
              </div>
              <div className="t-info-item">
                <span className="t-info-label">Responsable Asignado:</span>
                <span className="t-info-value highlighted">{currentTicket.assignedTo}</span>
                <span className="t-info-sub">Mesa de Operaciones GSM</span>
              </div>
              <div className="t-info-item">
                <span className="t-info-label">Activo o URL Relacionada:</span>
                <span className="t-info-value">{currentTicket.asset}</span>
                <span className="t-info-sub">Ambiente de Operación</span>
              </div>
            </div>

            {/* Evidencia Entity Box (Criterio 3 / 11) */}
            <div className="evidence-attachment-box">
              <div className="evidence-header">
                <FileText size={16} />
                <span>Archivo o Evidencia Adjunta (EvidenciaEntity)</span>
              </div>
              <div className="evidence-chip-card">
                <div className="evidence-file-icon">
                  <FileText size={20} />
                </div>
                <div className="evidence-file-info">
                  <strong>{currentTicket.evidenceName || 'captura_evidencia_ficticia.png (320 KB)'}</strong>
                  <span>Formato permitido · URI local simulada en Room SQLite</span>
                </div>
                <span className="evidence-status-pill">VÁLIDA</span>
              </div>
            </div>

            {/* Share and WhatsApp Export Actions */}
            <div className="tracking-share-row">
              <button className="btn-share-link" onClick={handleCopyLink}>
                {copiedLink ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace de Seguimiento'}</span>
              </button>
              <button className="btn-share-wa" onClick={handleCopyWhatsApp}>
                {copiedWA ? <Check size={16} color="#10b981" /> : <MessageCircle size={16} />}
                <span>{copiedWA ? '¡Texto Copiado!' : 'Mensaje Estructurado para WhatsApp'}</span>
              </button>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-send-wa"
              >
                <Send size={15} />
                <span>Abrir en WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Immutable Audit History (HistorialEntity) */}
          <div className="tracking-history-card glass-panel">
            <div className="history-header">
              <div className="history-title-group">
                <Clock size={18} color="#00d2ff" />
                <h3>Historial Cronológico (HistorialEntity)</h3>
              </div>
              <span className="history-badge">Inmutable · {currentTicket.history.length} Eventos</span>
            </div>

            <p className="history-explanation">
              Registro auditado conforme a los requerimientos de trazabilidad del caso DSY1105. Cada cambio conserva autor, fecha y acción efectuada.
            </p>

            <div className="tracking-timeline-list">
              {currentTicket.history.map((h, idx) => (
                <div key={idx} className="timeline-entry">
                  <div className="timeline-node-pin"></div>
                  <div className="timeline-entry-card">
                    <div className="timeline-entry-top">
                      <div className="timeline-author-group">
                        <strong className="timeline-author">{h.user}</strong>
                        {h.role && (
                          <span className={`timeline-role-pill ${h.role.toLowerCase()}`}>
                            {h.role}
                          </span>
                        )}
                      </div>
                      <span className="timeline-time">{h.date}</span>
                    </div>

                    <div className="timeline-entry-badge-row">
                      <span className="timeline-action-tag">Acción: {h.action}</span>
                      <span 
                        className="timeline-status-tag"
                        style={{ color: getStatusColor(h.status) }}
                      >
                        ● {h.status}
                      </span>
                    </div>

                    <p className="timeline-comment">{h.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Test User Notice */}
            <div className="test-credentials-notice">
              <ShieldCheck size={18} color="#00d2ff" />
              <div>
                <strong>Acceso de Prueba del Caso DSY1105:</strong>
                <p>Contraseña general para todos los roles de prueba: <code>1234</code>. Sincronizado con repositorio <a href={corporateContacts.githubRepo} target="_blank" rel="noopener noreferrer">Liz-Elizabeth/GSM</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
