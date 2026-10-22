import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Phone, MapPin, 
  Send, CheckCircle, Copy, ExternalLink, ShieldAlert, Sparkles 
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { corporateContacts } from '../data/mockData';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Evaluación Académica / Ver Demo APK',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/Liz-Elizabeth/GSM.git');
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <section id="contacto" className="section-wrapper contact-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Mail size={14} />
            <span>Canales Oficiales & Conexión</span>
          </div>
          <h2 className="section-title">
            Contáctanos o Explora el <span className="gradient-text">Proyecto en GitHub</span>
          </h2>
          <p className="section-subtitle">
            ¿Deseas probar el APK de Android, evaluar la arquitectura Kotlin o consultar sobre la implementación para tu empresa? Comunícate directamente con nuestro equipo.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Direct Corporate Channels & GitHub Card */}
          <div className="contact-info-column">
            {/* Direct Email Cards */}
            <div className="corporate-channel-cards">
              <a 
                href={`mailto:${corporateContacts.generalEmail}?subject=Consulta%20Proyecto%20GSM`}
                className="channel-card glass-panel"
              >
                <div className="channel-icon-box cyan">
                  <Mail size={22} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Correo General & Proyectos</span>
                  <strong className="channel-value">{corporateContacts.generalEmail}</strong>
                  <span className="channel-action">Click para enviar correo ➔</span>
                </div>
              </a>

              <a 
                href={`mailto:${corporateContacts.supportEmail}?subject=Mesa%20de%20Ayuda%20GSM`}
                className="channel-card glass-panel"
              >
                <div className="channel-icon-box purple">
                  <Mail size={22} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Mesa de Soporte TI</span>
                  <strong className="channel-value">{corporateContacts.supportEmail}</strong>
                  <span className="channel-action">Click para soporte técnico ➔</span>
                </div>
              </a>

              <a 
                href={`https://wa.me/56984521190?text=${encodeURIComponent('Hola equipo GSM, vengo desde la web corporativa para consultar sobre el proyecto.')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-card glass-panel"
              >
                <div className="channel-icon-box green">
                  <MessageSquare size={22} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">WhatsApp Corporativo</span>
                  <strong className="channel-value">{corporateContacts.whatsapp}</strong>
                  <span className="channel-action">Abrir chat en WhatsApp ➔</span>
                </div>
              </a>
            </div>

            {/* GitHub Project Showcase Box */}
            <div className="github-showcase-box glass-panel">
              <div className="git-box-header">
                <div className="git-title-group">
                  <Github size={24} />
                  <div>
                    <h4>Repositorio Oficial del Proyecto</h4>
                    <span className="git-repo-name">Liz-Elizabeth / GSM</span>
                  </div>
                </div>
                <a 
                  href={corporateContacts.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-github-pill"
                >
                  <ExternalLink size={14} />
                  <span>Ver en GitHub</span>
                </a>
              </div>
              <p className="git-box-desc">
                Código fuente oficial en Kotlin nativo para Android: Room Database (Usuario, Solicitud, Historial, Evidencia, Notificación), Jetpack Compose y arquitectura MVVM para Duoc UC.
              </p>
              <div className="git-clone-row">
                <code className="clone-code">git clone https://github.com/Liz-Elizabeth/GSM.git</code>
                <button className="copy-clone-btn" onClick={handleCopyClone} title="Copiar comando">
                  {copiedClone ? <CheckCircle size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="linkedin-showcase-box glass-panel">
              <div className="linkedin-header">
                <Linkedin size={24} color="#0077b5" />
                <div>
                  <h4>Red Profesional en LinkedIn</h4>
                  <p>Conecta con nuestros desarrolladores y coordinadores de proyecto.</p>
                </div>
              </div>
              <a 
                href={corporateContacts.linkedinOrg} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-linkedin"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Linkedin size={18} />
                <span>Seguir GSM IT Services en LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Request Demo Form */}
          <div className="contact-form-column">
            <div className="form-card glass-panel">
              <div className="form-card-header">
                <h3>Envíanos un Mensaje Directo</h3>
                <p>Respondemos en menos de 24 horas hábiles.</p>
              </div>

              {formSubmitted ? (
                <div className="form-success-box">
                  <div className="success-icon-ring">
                    <CheckCircle size={42} color="#10b981" />
                  </div>
                  <h3>¡Mensaje Enviado con Éxito!</h3>
                  <p>
                    Gracias por tu interés en GSM. Hemos registrado tu contacto para <strong>{formData.email}</strong> y un coordinador te enviará el enlace del APK o resolverá tus dudas a la brevedad.
                  </p>
                  <div className="success-actions">
                    <button 
                      className="btn-secondary" 
                      onClick={() => setFormSubmitted(false)}
                    >
                      Enviar otro mensaje
                    </button>
                    <a 
                      href={`mailto:${corporateContacts.generalEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="btn-primary"
                    >
                      Abrir en mi Correo
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="actual-contact-form">
                  <div className="form-group">
                    <label>Nombre y Apellido *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Correo Electrónico *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="tu.correo@empresa.cl"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Empresa / Institución</label>
                      <input 
                        type="text" 
                        name="company" 
                        placeholder="Pyme, Organización o Duoc UC"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Motivo de Contacto</label>
                    <select 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Evaluación Académica / Ver Demo APK">Evaluación Académica / Ver Demo APK</option>
                      <option value="Consulta sobre Código Fuente Kotlin">Consulta sobre Código Fuente Kotlin</option>
                      <option value="Implementación en mi Empresa / Pyme">Implementación en mi Empresa / Pyme</option>
                      <option value="Contacto con el Equipo CITT">Contacto con el Equipo CITT</option>
                      <option value="Otro">Otro requerimiento</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mensaje o Consulta</label>
                    <textarea 
                      name="message" 
                      rows="4"
                      placeholder="Cuéntanos cómo podemos colaborar contigo..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={18} />
                    <span>Enviar Mensaje al Equipo</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
