import React from 'react';
import { 
  ArrowRight, ShieldCheck, Smartphone, CheckCircle, 
  Sparkles, Terminal, MessageCircle, Play 
} from 'lucide-react';
import { Github } from './SocialIcons';
import { enterpriseInfo, corporateContacts } from '../data/mockData';

export default function Hero({ onOpenSimulator, onNavigateTracking }) {
  return (
    <section id="hero" className="hero-section">
      {/* Ambient background glows */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Academic & Tech Badge */}
          <div className="hero-badge-pill">
            <span className="badge-pulse-dot"></span>
            <span className="badge-text">
              Duoc UC · CITT Puente Alto · Caso DSY1105
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            De la Incertidumbre en <span className="whatsapp-highlight">WhatsApp</span> a la{' '}
            <span className="gradient-text">Trazabilidad Total</span> en Solicitudes TI
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            <strong>GSM (Gestión de Solicitudes Móviles)</strong> es la solución nativa en Android Kotlin desarrollada para poner fin a los requerimientos perdidos, la falta de responsables y la desorganización en servicios informáticos y soporte digital.
          </p>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <button 
              className="btn-primary" 
              onClick={() => onNavigateTracking && onNavigateTracking('SOL-2026-1004')}
              title="Ir a la página de seguimiento /seguimiento/SOL-2026-1004"
            >
              <span>Consultar Seguimiento (/SOL-2026-1004)</span>
              <ArrowRight size={18} />
            </button>
            <a 
              href={corporateContacts.githubRepo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-github"
            >
              <Github size={18} />
              <span>Ver en GitHub</span>
            </a>
            <a href="#simulador" className="btn-secondary" onClick={onOpenSimulator}>
              <span>Simulador</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <CheckCircle size={17} className="trust-icon" />
              <span>Código Único #SOL-2026</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={17} className="trust-icon" />
              <span>3 Perfiles Blindados</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={17} className="trust-icon" />
              <span>Historial Inmutable</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-card">
            <div className="card-top-bar">
              <div className="traffic-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="mockup-chip">GSM Mobile Native · Android Jetpack Compose</span>
            </div>
            
            <div className="image-frame">
              <img 
                src="/images/gsm_app_mockup.jpg" 
                alt="Aplicación Móvil GSM en Android" 
                className="hero-main-img" 
              />
              <div className="image-overlay-vignette"></div>

              {/* Floating Interactive Badge 1 - Clickable */}
              <div 
                className="floating-badge badge-ticket"
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigateTracking && onNavigateTracking('SOL-2026-1002')}
                title="Hacer clic para abrir seguimiento de #SOL-2026-1002"
              >
                <div className="badge-icon-box">
                  <Smartphone size={18} />
                </div>
                <div>
                  <div className="badge-small-label">Ticket Activo (Ver ➔)</div>
                  <div className="badge-bold-value">#SOL-2026-1002</div>
                </div>
                <span className="status-indicator-pill resuelta">En Proceso</span>
              </div>

              {/* Floating Interactive Badge 2 */}
              <div className="floating-badge badge-sla">
                <div className="badge-icon-box green">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="badge-small-label">Trazabilidad</div>
                  <div className="badge-bold-value">100% Auditada</div>
                </div>
              </div>

              {/* Floating WhatsApp Bridge Badge */}
              <div className="floating-badge badge-wa">
                <MessageCircle size={18} className="wa-icon" />
                <span>Mensaje Estructurado OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Row */}
      <div className="container hero-stats-container">
        <div className="stats-grid">
          {enterpriseInfo.stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-detail">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
