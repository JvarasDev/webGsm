import React from 'react';
import { 
  Mail, MessageSquare, Shield, 
  Heart, ArrowUp, ExternalLink 
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { enterpriseInfo, corporateContacts } from '../data/mockData';

export default function Footer({ onNavigateTracking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="logo-icon-box small">
                <span className="logo-letter">G</span>
              </div>
              <span className="footer-brand-title">GSM Móvil TI</span>
            </div>
            <p className="footer-brand-desc">
              Plataforma para la gestión y seguimiento formal de solicitudes originadas en WhatsApp para empresas de servicios informáticos y digitales.
            </p>
            <div className="footer-social-row">
              <a 
                href={corporateContacts.githubRepo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href={corporateContacts.linkedinOrg} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={`mailto:${corporateContacts.generalEmail}`}
                className="footer-social-link"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href={`https://wa.me/56900002222`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link wa"
                title="WhatsApp"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Nav Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  onClick={() => onNavigateTracking && onNavigateTracking('SOL-2026-1004')}
                  style={{ color: '#00d2ff', fontSize: '0.88rem', fontWeight: 'bold', textAlign: 'left', cursor: 'pointer' }}
                >
                  🔍 Portal Seguimiento (/SOL-2026-1004)
                </button>
              </li>
              <li><a href="#hero">Inicio</a></li>
              <li><a href="#solucion">Problema & Solución</a></li>
              <li><a href="#simulador">Simulador en Vivo</a></li>
              <li><a href="#perfiles">Perfiles & Seguridad</a></li>
              <li><a href="#galeria">Instalaciones & Oficinas</a></li>
              <li><a href="#tecnologia">Stack Android Kotlin</a></li>
            </ul>
          </div>

          {/* Academic Context Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contexto Académico</h4>
            <ul className="footer-academic-list">
              <li><strong>Institución:</strong> {enterpriseInfo.academicContext.institution}</li>
              <li><strong>Sede / CITT:</strong> {enterpriseInfo.academicContext.center}</li>
              <li><strong>Asignatura:</strong> {enterpriseInfo.academicContext.subject}</li>
              <li><strong>Coordinador:</strong> {enterpriseInfo.academicContext.coordinator}</li>
              <li><strong>Alcance:</strong> Examen Transversal (MVP Ficticio)</li>
            </ul>
          </div>

          {/* Contact Direct Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto Directo</h4>
            <div className="footer-contact-block">
              <p><strong>Email General:</strong><br />{corporateContacts.generalEmail}</p>
              <p><strong>Mesa de Ayuda:</strong><br />{corporateContacts.supportEmail}</p>
              <p><strong>WhatsApp:</strong><br />{corporateContacts.whatsapp}</p>
              <p><strong>Sede:</strong><br />Puente Alto, Santiago de Chile</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <span>© 2026 GSM IT & Digital Services · Todos los derechos reservados.</span>
            <span className="privacy-badge">Datos 100% ficticios y seguros conforme a bases DSY1105</span>
          </div>

          <button 
            className="scroll-top-btn" 
            onClick={scrollToTop} 
            title="Volver arriba"
          >
            <ArrowUp size={16} />
            <span>Subir</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
