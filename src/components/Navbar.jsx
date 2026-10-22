import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Smartphone, MessageSquare, 
  ExternalLink, ShieldCheck, Mail 
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { corporateContacts } from '../data/mockData';

export default function Navbar({ onOpenDemo, onNavigateTracking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Problema & Solución', href: '#solucion' },
    { label: 'Video Demo', href: '#video-demo' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Perfiles', href: '#perfiles' },
    { label: 'Oficinas', href: '#galeria' },
    { label: 'Stack Kotlin', href: '#tecnologia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" aria-label="GSM Home">
          <div className="logo-icon-box">
            <span className="logo-letter">G</span>
            <div className="logo-glow-ring"></div>
          </div>
          <div className="brand-text">
            <div className="brand-name">
              GSM <span className="brand-dot">·</span> <span className="brand-sub">Móvil TI</span>
            </div>
            <span className="brand-tag">Gestión de Solicitudes</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions & Social Links */}
        <div className="nav-actions">
          <button 
            className="nav-btn-tracking"
            onClick={() => onNavigateTracking && onNavigateTracking('SOL-2026-1004')}
            title="Consultar seguimiento público (/seguimiento/SOL-2026-1004)"
          >
            <span>🔍 Seguimiento</span>
          </button>

          <a 
            href={corporateContacts.githubRepo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-link-btn"
            title="Ver Código Fuente en GitHub (Liz-Elizabeth/GSM)"
          >
            <Github size={19} />
          </a>
          <a 
            href={corporateContacts.linkedinOrg} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-link-btn"
            title="Conectar en LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a 
            href={`https://wa.me/56900002222?text=${encodeURIComponent('Hola equipo GSM, deseo consultar sobre la plataforma de gestión de solicitudes.')}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-btn-wa"
            title="Escribir por WhatsApp"
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>
          <a href="#simulador" className="nav-cta-btn">
            Probar Demo
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <ul className="mobile-nav-list">
            <li>
              <button 
                className="mobile-nav-link"
                style={{ color: '#00d2ff', textAlign: 'left', width: '100%' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTracking && onNavigateTracking('SOL-2026-1004');
                }}
              >
                🔍 Consultar Seguimiento (/seguimiento/SOL-2026-1004)
              </button>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <div className="mobile-social-row">
              <a href={corporateContacts.githubRepo} target="_blank" rel="noopener noreferrer" className="btn-github">
                <Github size={18} /> GitHub
              </a>
              <a href={corporateContacts.linkedinOrg} target="_blank" rel="noopener noreferrer" className="btn-linkedin">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
            <a 
              href={`https://wa.me/56900002222?text=${encodeURIComponent('Hola GSM, me gustaría conocer la app.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              <MessageSquare size={18} /> Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
