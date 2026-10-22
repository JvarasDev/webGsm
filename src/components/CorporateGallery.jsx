import React, { useState } from 'react';
import { 
  Building2, Users, Server, Smartphone, Maximize2, 
  X, Check, Sparkles, MapPin, Shield 
} from 'lucide-react';
import { galleryItems, corporateContacts } from '../data/mockData';

export default function CorporateGallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filters = [
    { id: 'ALL', label: 'Todas las Instalaciones' },
    { id: 'Instalaciones Corporativas', label: 'Sede & Oficinas' },
    { id: 'Equipo de Ingeniería', label: 'Equipo Técnico' },
    { id: 'Especialistas TI', label: 'Data Center & Servidores' },
    { id: 'Aplicación Nativa', label: 'App Móvil GSM' },
  ];

  const filteredItems = activeFilter === 'ALL' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="galeria" className="section-wrapper gallery-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Building2 size={14} />
            <span>Nuestras Instalaciones y Equipo</span>
          </div>
          <h2 className="section-title">
            Conoce el Entorno y Profesionales <span className="gradient-text">Detrás de GSM</span>
          </h2>
          <p className="section-subtitle">
            Instalaciones modernas de desarrollo y soporte TI en Puente Alto, preparadas para ofrecer continuidad operativa y excelencia en software móvil a pymes del país.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filter-bar">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`gallery-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-card glass-panel"
              onClick={() => setLightboxImage(item)}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-img" 
                  loading="lazy"
                />
                <div className="gallery-hover-overlay">
                  <div className="zoom-icon-box">
                    <Maximize2 size={20} />
                  </div>
                  <span className="zoom-text">Ampliar Fotografía</span>
                </div>
                <span className="gallery-category-pill">{item.category}</span>
              </div>
              <div className="gallery-info-box">
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Location Banner */}
        <div className="location-banner glass-panel">
          <div className="location-content">
            <div className="loc-icon-box">
              <MapPin size={24} color="#00d2ff" />
            </div>
            <div>
              <h4>Centro de Operaciones & Vinculación CITT</h4>
              <p>{corporateContacts.address}</p>
            </div>
          </div>
          <div className="location-badges">
            <span className="verified-badge">
              <Shield size={14} /> Sede Autorizada Duoc UC
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn"
              onClick={() => setLightboxImage(null)}
              aria-label="Cerrar modal"
            >
              <X size={22} />
            </button>
            <div className="lightbox-media-container">
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.title} 
                className="lightbox-img" 
              />
            </div>
            <div className="lightbox-caption">
              <div className="lightbox-meta">
                <span className="gallery-category-pill">{lightboxImage.category}</span>
              </div>
              <h3>{lightboxImage.title}</h3>
              <p>{lightboxImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
