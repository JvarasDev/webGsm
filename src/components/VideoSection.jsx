import React from 'react';
import { 
  Play, Sparkles, CheckCircle2, ShieldCheck, 
  Smartphone, ArrowRight, ExternalLink 
} from 'lucide-react';
import { corporateContacts } from '../data/mockData';

export default function VideoSection({ onOpenSimulator }) {
  const videoHighlights = [
    {
      title: "Flujo Integral en Video",
      desc: "De la consulta desordenada en WhatsApp al ticket clasificado y priorizado con código único #SOL-2026."
    },
    {
      title: "Experiencia Cliente & Técnico",
      desc: "Visualización de las pantallas nativas en Kotlin para reportar incidencias, adjuntar evidencias y auditar avances."
    },
    {
      title: "Trazabilidad Inmutable",
      desc: "Demostración de la bitácora cronológica con confirmación formal de conformidad del servicio recibido."
    }
  ];

  return (
    <section id="video-demo" className="section-wrapper video-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Play size={14} />
            <span>Video Oficial & Presentación de Marketing</span>
          </div>
          <h2 className="section-title">
            Descubre el Impacto de <span className="gradient-text">GSM en Acción</span>
          </h2>
          <p className="section-subtitle">
            Mira la presentación audiovisual de nuestra solución para entender cómo optimizamos los tiempos de respuesta y resolvemos la pérdida de requerimientos en empresas TI.
          </p>
        </div>

        {/* Video Cinematic Showcase Container */}
        <div className="video-cinematic-card glass-panel">
          <div className="video-card-top-bar">
            <div className="traffic-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="video-title-pill">
              <span className="video-live-dot"></span>
              <span>GSM · Video Presentación Oficial (YouTube)</span>
            </div>
            <a 
              href="https://www.youtube.com/watch?v=gCpiClXfPAo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-yt-link"
              title="Abrir en YouTube"
            >
              <ExternalLink size={14} />
              <span>Ver en YouTube</span>
            </a>
          </div>

          {/* 16:9 Responsive Iframe Container */}
          <div className="video-aspect-container">
            <iframe 
              src="https://www.youtube.com/embed/gCpiClXfPAo?si=6jxdVwQi7eUmR4z5" 
              title="GSM - Video de Presentación y Marketing" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="responsive-yt-iframe"
            ></iframe>
          </div>

          {/* Under-video feature highlights row */}
          <div className="video-highlights-row">
            {videoHighlights.map((item, idx) => (
              <div key={idx} className="video-hl-card">
                <div className="hl-icon-check">
                  <CheckCircle2 size={18} color="#00d2ff" />
                </div>
                <div>
                  <h4 className="hl-card-title">{item.title}</h4>
                  <p className="hl-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA inside the video card */}
          <div className="video-cta-footer">
            <span>¿Listo para experimentar el sistema por tu cuenta?</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#simulador" className="btn-primary" onClick={onOpenSimulator}>
                <span>Probar Simulador en Vivo</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href={corporateContacts.githubRepo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-github"
              >
                <span>Ver Código en GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
