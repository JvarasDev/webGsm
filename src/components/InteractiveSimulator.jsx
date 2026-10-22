import React, { useState } from 'react';
import { 
  Play, PlusCircle, CheckCircle, Clock, Send, MessageCircle, 
  Copy, Check, FileText, UserCheck, AlertTriangle, RefreshCw, 
  Search, Shield, ChevronRight, Layers, Tag, Key, AlertCircle, Bell
} from 'lucide-react';
import { 
  statusesList, categoriesList, prioritiesList, 
  sampleTickets, usuariosMock, corporateContacts 
} from '../data/mockData';

export default function InteractiveSimulator({ onNavigateTracking }) {
  const [tickets, setTickets] = useState(sampleTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(sampleTickets[0].id);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [copiedWA, setCopiedWA] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Form State for new ticket
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categoriesList[0]);
  const [newPriority, setNewPriority] = useState('ALTA');
  const [newClient, setNewClient] = useState('Camila Rojas (Cliente Demo)');
  const [newCompany, setNewCompany] = useState('Pyme Soluciones Alfa Ltda.');
  const [newAsset, setNewAsset] = useState('https://tienda.pymealfa-ficticia.cl');
  const [newDescription, setNewDescription] = useState('');
  const [newEvidence, setNewEvidence] = useState('captura_error_500_ficticia.png');

  // Find currently selected ticket
  const currentTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  // Helper to get status color
  const getStatusColor = (statusLabel) => {
    const s = statusesList.find(item => item.label.toLowerCase() === statusLabel?.toLowerCase() || item.code.toLowerCase() === statusLabel?.toLowerCase());
    return s ? s.color : '#38bdf8';
  };

  // Helper to get priority color
  const getPriorityColor = (pLevel) => {
    const p = prioritiesList.find(item => item.level.toUpperCase() === pLevel?.toUpperCase());
    return p ? p.color : '#f59e0b';
  };

  // Handle Create Ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nextNumber = 1000 + tickets.length + 1;
    const newId = `SOL-2026-${nextNumber}`;
    const now = new Date();
    const dateStr = `Hoy a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const createdTicket = {
      id: newId,
      title: newTitle,
      client: newClient,
      company: newCompany,
      contact: '+56900001111',
      category: newCategory,
      priority: newPriority,
      status: 'Recibida',
      statusCode: 'RECIBIDA',
      service: newCategory,
      asset: newAsset || 'https://pymealfa-ficticia.cl',
      assignedTo: 'Sin Asignar (Coordinador Roberto Méndez)',
      assignedTechId: null,
      createdAt: dateStr,
      updatedAt: dateStr,
      deadline: 'En 24 horas',
      isOverdue: false,
      description: newDescription || 'Solicitud de soporte ingresada para atención técnica.',
      evidenceName: `${newEvidence} (320 KB)`,
      history: [
        {
          date: dateStr,
          user: `${newClient} (CLIENTE)`,
          role: 'CLIENTE',
          action: 'CREACION',
          status: 'Recibida',
          comment: 'Solicitud registrada formalmente desde mensaje de WhatsApp.'
        }
      ]
    };

    setTickets([createdTicket, ...tickets]);
    setSelectedTicketId(newId);
    setShowCreateModal(false);

    // Reset Form
    setNewTitle('');
    setNewDescription('');
  };

  // Handle Advance Status Simulator
  const handleAdvanceStatus = (nextStatus, nextAction, nextUser, nextRole, nextTech, customComment) => {
    const now = new Date();
    const dateStr = `Hoy a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = tickets.map(t => {
      if (t.id === currentTicket.id) {
        return {
          ...t,
          status: nextStatus,
          assignedTo: nextTech || t.assignedTo,
          updatedAt: dateStr,
          isOverdue: nextStatus === 'Resuelta' || nextStatus === 'Cerrada' ? false : t.isOverdue,
          history: [
            ...t.history,
            {
              date: dateStr,
              user: nextUser,
              role: nextRole,
              action: nextAction,
              status: nextStatus,
              comment: customComment || `Transición a ${nextStatus} realizada por ${nextUser}.`
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
  };

  // Build Structured WhatsApp Message
  const buildWhatsAppMessage = () => {
    return `🔔 *NUEVA SOLICITUD GSM [${currentTicket.id}]*\n` +
      `📌 *Título:* ${currentTicket.title}\n` +
      `🏢 *Cliente:* ${currentTicket.client} (${currentTicket.company || 'Pyme Alfa'})\n` +
      `🏷️ *Categoría:* ${currentTicket.category}\n` +
      `⚡ *Prioridad:* ${currentTicket.priority}\n` +
      `🚦 *Estado:* ${currentTicket.status}\n` +
      `🔗 *Seguimiento:* https://github.com/Liz-Elizabeth/GSM/track/${currentTicket.id}\n` +
      `_Mensaje estructurado generado por App GSM Android (Room SQLite)_`;
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage());
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2500);
  };

  // Filtered tickets list
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (t.company && t.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="simulador" className="section-wrapper simulator-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Play size={14} />
            <span>Simulador Interactivo con Mock Kotlin Seed</span>
          </div>
          <h2 className="section-title">
            Flujo de Datos y Solicitudes <span className="gradient-text">Sincronizado con Room DB</span>
          </h2>
          <p className="section-subtitle">
            Interactúa con los mismos datos inicializados en la base de datos Kotlin de <strong>GSM</strong>: solicitudes SOL-2026-1001 a 1004, usuarios de prueba (password: 1234) y trazabilidad inmutable.
          </p>
        </div>

        {/* Simulator Box */}
        <div className="simulator-workbench glass-panel">
          {/* Top Bar with actions */}
          <div className="workbench-header">
            <div className="workbench-title-group">
              <span className="live-pulse"></span>
              <h3>Entorno de Pruebas DSY1105 · Android Room DB (Duoc UC)</h3>
            </div>
            <div className="workbench-actions" style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                onClick={() => setShowUsersModal(true)}
              >
                <Key size={14} />
                <span>Usuarios de Prueba (1234)</span>
              </button>
              <button 
                className="btn-primary-small"
                onClick={() => setShowCreateModal(true)}
              >
                <PlusCircle size={16} />
                <span>Crear Nueva Solicitud</span>
              </button>
            </div>
          </div>

          <div className="simulator-grid-layout">
            {/* Left Column: Tickets List */}
            <div className="tickets-sidebar">
              <div className="sidebar-search-box">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar SOL-2026, título..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="status-quick-filters">
                <button 
                  className={`filter-chip ${filterStatus === 'ALL' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('ALL')}
                >
                  Todos ({tickets.length})
                </button>
                <button 
                  className={`filter-chip ${filterStatus === 'Recibida' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Recibida')}
                >
                  Recibida
                </button>
                <button 
                  className={`filter-chip ${filterStatus === 'En proceso' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('En proceso')}
                >
                  En proceso
                </button>
                <button 
                  className={`filter-chip ${filterStatus === 'Resuelta' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Resuelta')}
                >
                  Resuelta
                </button>
              </div>

              <div className="tickets-list-scroll">
                {filteredTickets.map((t) => (
                  <div 
                    key={t.id} 
                    className={`ticket-summary-card ${t.id === currentTicket.id ? 'active' : ''}`}
                    onClick={() => setSelectedTicketId(t.id)}
                  >
                    <div className="summary-row-top">
                      <span className="ticket-id-tag">{t.id}</span>
                      <span 
                        className="ticket-status-pill"
                        style={{ backgroundColor: `${getStatusColor(t.status)}22`, color: getStatusColor(t.status), borderColor: getStatusColor(t.status) }}
                      >
                        {t.status}
                      </span>
                    </div>
                    <div className="summary-title">{t.title}</div>
                    <div className="summary-row-bottom">
                      <span className="summary-client">{t.client.split(' ')[0]} ({t.company ? 'Pyme Alfa' : ''})</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {t.isOverdue && (
                          <span style={{ fontSize: '0.68rem', background: '#ef444425', color: '#ef4444', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold' }}>
                            ATRASADA
                          </span>
                        )}
                        <span 
                          className="summary-priority"
                          style={{ color: getPriorityColor(t.priority) }}
                        >
                          ● {t.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Ticket Detail, State Machine & WhatsApp Message */}
            <div className="ticket-detail-view">
              {/* Ticket Hero Banner */}
              <div className="detail-hero-box">
                {currentTicket.isOverdue && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.88rem',
                    fontWeight: '600'
                  }}>
                    <AlertTriangle size={18} color="#ef4444" />
                    <span>⚠️ <strong>Criterio 23: SOLICITUD ATRASADA</strong> (Fecha límite vencida hace 5 horas). Requiere atención urgente del Coordinador Roberto Méndez.</span>
                  </div>
                )}

                <div className="detail-meta-row">
                  <div className="id-with-badge">
                    <span className="current-id-big">{currentTicket.id}</span>
                    <span 
                      className="current-status-large"
                      style={{ 
                        backgroundColor: `${getStatusColor(currentTicket.status)}20`, 
                        color: getStatusColor(currentTicket.status),
                        border: `1px solid ${getStatusColor(currentTicket.status)}55`
                      }}
                    >
                      {currentTicket.status}
                    </span>
                    <span 
                      className="current-priority-tag"
                      style={{ 
                        backgroundColor: `${getPriorityColor(currentTicket.priority)}20`,
                        color: getPriorityColor(currentTicket.priority)
                      }}
                    >
                      Prioridad {currentTicket.priority}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div className="detail-date">
                      <Clock size={14} />
                      <span>Creado: {currentTicket.createdAt}</span>
                    </div>
                    <button 
                      className="btn-secondary" 
                      style={{ 
                        padding: '4px 10px', 
                        fontSize: '0.75rem', 
                        borderColor: 'rgba(0, 210, 255, 0.4)', 
                        color: 'var(--brand-cyan)',
                        borderRadius: '6px'
                      }}
                      onClick={() => onNavigateTracking && onNavigateTracking(currentTicket.id)}
                      title={`Ver en página pública de seguimiento (/seguimiento/${currentTicket.id})`}
                    >
                      <span>🔍 Abrir /seguimiento/{currentTicket.id}</span>
                    </button>
                  </div>
                </div>

                <h3 className="detail-title">{currentTicket.title}</h3>
                <p className="detail-description">{currentTicket.description}</p>

                {currentTicket.resolution && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    margin: '14px 0',
                    fontSize: '0.9rem'
                  }}>
                    <strong style={{ color: '#10b981' }}>Solución Registrada (Criterio 31):</strong>
                    <p style={{ color: '#e2e8f0', marginTop: '4px' }}>{currentTicket.resolution}</p>
                  </div>
                )}

                {currentTicket.notificationMessage && (
                  <div style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    margin: '12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.85rem'
                  }}>
                    <Bell size={16} color="#38bdf8" />
                    <span><strong>Notificación Push:</strong> {currentTicket.notificationMessage}</span>
                  </div>
                )}

                <div className="detail-info-grid">
                  <div className="info-cell">
                    <span className="cell-label">Cliente / Pyme:</span>
                    <span className="cell-value">{currentTicket.client}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{currentTicket.company} · {currentTicket.contact}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-label">Categoría:</span>
                    <span className="cell-value">{currentTicket.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Servicio: {currentTicket.service}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-label">Responsable Asignado:</span>
                    <span className="cell-value highlighted">{currentTicket.assignedTo}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-label">Activo Relacionado:</span>
                    <span className="cell-value">{currentTicket.asset}</span>
                  </div>
                </div>
              </div>

              {/* State Machine Transition Simulator */}
              <div className="state-machine-box">
                <div className="sub-box-title">
                  <Layers size={16} />
                  <span>Transición de Estados (Simulación de Roles de Prueba)</span>
                </div>
                <div className="state-controls-row">
                  {currentTicket.status === 'Recibida' && (
                    <>
                      <button 
                        className="action-step-btn assign"
                        onClick={() => handleAdvanceStatus(
                          'Asignada', 
                          'ASIGNACION', 
                          'Roberto Méndez (ADMINISTRADOR)', 
                          'ADMINISTRADOR', 
                          'Diego Soto (Técnico Soporte)', 
                          'Asignado con prioridad ALTA a Diego Soto (Infraestructura)'
                        )}
                      >
                        <UserCheck size={16} />
                        <span>Roberto Méndez: Asignar a Diego Soto</span>
                      </button>
                      <button 
                        className="action-step-btn assign"
                        style={{ background: '#7c3aed' }}
                        onClick={() => handleAdvanceStatus(
                          'Asignada', 
                          'ASIGNACION', 
                          'Roberto Méndez (ADMINISTRADOR)', 
                          'ADMINISTRADOR', 
                          'Valentina Pino (Técnico Web)', 
                          'Asignado a Valentina Pino (Desarrollo Web)'
                        )}
                      >
                        <UserCheck size={16} />
                        <span>Roberto Méndez: Asignar a Valentina Pino</span>
                      </button>
                    </>
                  )}

                  {(currentTicket.status === 'Recibida' || currentTicket.status === 'Asignada') && (
                    <button 
                      className="action-step-btn process"
                      onClick={() => handleAdvanceStatus(
                        'En proceso', 
                        'AVANCE', 
                        currentTicket.assignedTo.includes('Valentina') ? 'Valentina Pino (TECNICO)' : 'Diego Soto (TECNICO)', 
                        'TECNICO', 
                        null, 
                        'Iniciando diagnóstico técnico y revisión de logs.'
                      )}
                    >
                      <Play size={16} />
                      <span>Técnico: Iniciar Ejecución (En proceso)</span>
                    </button>
                  )}

                  {currentTicket.status === 'En proceso' && (
                    <>
                      <button 
                        className="action-step-btn"
                        style={{ background: '#f59e0b' }}
                        onClick={() => handleAdvanceStatus(
                          'Pendiente de info', 
                          'SOLICITUD_INFO', 
                          currentTicket.assignedTo.includes('Valentina') ? 'Valentina Pino (TECNICO)' : 'Diego Soto (TECNICO)', 
                          'TECNICO', 
                          null, 
                          'Por favor adjuntar información adicional o antecedentes requeridos (Criterio 22).'
                        )}
                      >
                        <AlertCircle size={16} />
                        <span>Técnico: Pedir Info al Cliente</span>
                      </button>
                      <button 
                        className="action-step-btn resolve"
                        onClick={() => handleAdvanceStatus(
                          'Resuelta', 
                          'RESOLUCION', 
                          currentTicket.assignedTo.includes('Valentina') ? 'Valentina Pino (TECNICO)' : 'Diego Soto (TECNICO)', 
                          'TECNICO', 
                          null, 
                          'Solución implementada y validada en entorno de pruebas. A la espera de conformidad.'
                        )}
                      >
                        <CheckCircle size={16} />
                        <span>Técnico: Marcar como Resuelta</span>
                      </button>
                    </>
                  )}

                  {currentTicket.status === 'Pendiente de info' && (
                    <button 
                      className="action-step-btn process"
                      onClick={() => handleAdvanceStatus(
                        'En proceso', 
                        'RESPUESTA_CLIENTE', 
                        'Camila Rojas (CLIENTE)', 
                        'CLIENTE', 
                        null, 
                        'Cliente adjuntó los datos solicitados y aprobó continuar la atención.'
                      )}
                    >
                      <Check size={16} />
                      <span>Camila Rojas (Cliente): Enviar Antecedentes</span>
                    </button>
                  )}

                  {currentTicket.status === 'Resuelta' && (
                    <>
                      <button 
                        className="action-step-btn close"
                        onClick={() => handleAdvanceStatus(
                          'Cerrada', 
                          'CONFORMIDAD_CIERRE', 
                          'Camila Rojas (CLIENTE)', 
                          'CLIENTE', 
                          null, 
                          'Cliente confirmó conformidad del servicio recibido. Cierre formal registrado.'
                        )}
                      >
                        <Check size={16} />
                        <span>Camila Rojas (Cliente): Confirmar Conformidad</span>
                      </button>
                      <button 
                        className="action-step-btn"
                        style={{ background: '#e11d48' }}
                        onClick={() => handleAdvanceStatus(
                          'En proceso', 
                          'REAPERTURA', 
                          'Camila Rojas (CLIENTE)', 
                          'CLIENTE', 
                          null, 
                          'Cliente solicitó reapertura del caso por persistencia de la incidencia.'
                        )}
                      >
                        <RefreshCw size={14} />
                        <span>Solicitar Reapertura</span>
                      </button>
                    </>
                  )}

                  {currentTicket.status === 'Cerrada' && (
                    <div className="status-closed-notice">
                      <CheckCircle size={18} color="#10b981" />
                      <span>Solicitud cerrada formalmente con conformidad de Camila Rojas.</span>
                    </div>
                  )}

                  <button 
                    className="action-step-btn reset"
                    title="Reiniciar a Recibida para probar de nuevo"
                    onClick={() => handleAdvanceStatus('Recibida', 'REINICIO', 'Sistema (Admin)', 'ADMINISTRADOR', 'Sin Asignar (Coordinador Roberto Méndez)', 'Reinicio de prueba manual.')}
                  >
                    <RefreshCw size={14} />
                    <span>Reiniciar Estado</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Structured Message Section */}
              <div className="whatsapp-preview-box">
                <div className="wa-box-header">
                  <div className="wa-title">
                    <MessageCircle size={18} className="wa-icon-green" />
                    <span>Mensaje Estructurado para WhatsApp Business (Link Oficial)</span>
                  </div>
                  <div className="wa-action-buttons">
                    <button className="copy-wa-btn" onClick={handleCopyWhatsApp}>
                      {copiedWA ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                      <span>{copiedWA ? '¡Copiado!' : 'Copiar Texto'}</span>
                    </button>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="open-wa-btn"
                    >
                      <Send size={14} />
                      <span>Enviar a WhatsApp</span>
                    </a>
                  </div>
                </div>
                <pre className="wa-chat-bubble">{buildWhatsAppMessage()}</pre>
              </div>

              {/* Immutable Audit Trail History */}
              <div className="audit-history-box">
                <div className="sub-box-title">
                  <Clock size={16} />
                  <span>Historial Cronológico Inmutable (HistorialEntity · Trazabilidad)</span>
                </div>
                <div className="audit-timeline">
                  {currentTicket.history.map((event, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-user">{event.user}</span>
                          <span className="timeline-date">{event.date}</span>
                          <span 
                            className="timeline-badge"
                            style={{ color: getStatusColor(event.status) }}
                          >
                            ● {event.status} ({event.action})
                          </span>
                        </div>
                        <div className="timeline-action">{event.comment}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Ticket */}
      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog glass-panel">
            <div className="modal-header">
              <h3>Crear Nueva Solicitud en GSM (Room DB)</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="modal-form">
              <div className="form-group">
                <label>Título del Requerimiento *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Falla en pasarela de pagos Webpay"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoría del Servicio</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-select"
                  >
                    {categoriesList.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Prioridad Sugerida</label>
                  <select 
                    value={newPriority} 
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="form-select"
                  >
                    {prioritiesList.map((p, i) => (
                      <option key={i} value={p.level}>{p.level} ({p.sla})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cliente Ficticio (UsuarioEntity)</label>
                  <input 
                    type="text" 
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Empresa Solicitante</label>
                  <input 
                    type="text" 
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Activo / URL / Servicio Relacionado</label>
                <input 
                  type="text" 
                  value={newAsset}
                  onChange={(e) => setNewAsset(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Descripción Detallada del Problema</label>
                <textarea 
                  rows="3"
                  placeholder="Describe qué ocurrió, errores mostrados o cambios deseados..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Evidencia Ficticia Adjunta (EvidenciaEntity)</label>
                <div className="simulated-file-chip">
                  <FileText size={16} />
                  <span>{newEvidence} (320 KB - PENDIENTE_REVISION)</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <PlusCircle size={16} />
                  <span>Insertar en Base de Datos</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Demo Test Users (Password: 1234) */}
      {showUsersModal && (
        <div className="modal-backdrop" onClick={() => setShowUsersModal(false)}>
          <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={20} color="#00d2ff" />
                <h3>Usuarios Ficticios de Prueba (Kotlin Mock)</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setShowUsersModal(false)}
              >
                ✕
              </button>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px' }}>
              Credenciales preconfiguradas en <code>UsuarioEntity</code> para la evaluación del examen transversal. <strong>Contraseña para todos: <code style={{ color: '#00d2ff' }}>1234</code></strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {usuariosMock.map((u) => (
                <div key={u.id} style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${u.badgeColor}40`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{u.nombre}</strong>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        background: `${u.badgeColor}20`, 
                        color: u.badgeColor,
                        fontWeight: 'bold' 
                      }}>
                        {u.rol}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      <span>Correo: <code style={{ color: '#e2e8f0' }}>{u.correo}</code></span> · 
                      <span> Tel: {u.telefono}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                      {u.empresa} {u.serviciosAsociados ? `(${u.serviciosAsociados})` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Password</span>
                    <strong style={{ color: '#00d2ff', fontFamily: 'monospace' }}>1234</strong>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setShowUsersModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
