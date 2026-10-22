import React from 'react';
import { 
  Mail, ArrowUpRight, Award, 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { teamMembers } from '../data/mockData';

export default function TeamSection() {
  return (
    <section id="equipo" className="section-wrapper team-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Award size={14} />
            <span>Equipo de Desarrollo & Especialistas</span>
          </div>
          <h2 className="section-title">
            Talento Técnico a Cargo del <span className="gradient-text">Ecosistema GSM</span>
          </h2>
          <p className="section-subtitle">
            Ingenieros en informática, desarrolladores móviles y especialistas en infraestructura dedicados a optimizar el flujo operacional de servicios digitales.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member-card glass-panel">
              <div className="member-avatar-box">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="member-avatar-img" 
                />
                <div className="avatar-status-dot" title="Disponible para Proyectos"></div>
              </div>

              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-bio">{member.bio}</p>
              </div>

              {/* Action Buttons for GitHub, LinkedIn & Email */}
              <div className="member-social-actions">
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn github"
                  title={`Ver GitHub de ${member.name}`}
                >
                  <Github size={17} />
                  <span>GitHub</span>
                </a>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn linkedin"
                  title={`Ver LinkedIn de ${member.name}`}
                >
                  <Linkedin size={17} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={`mailto:${member.email}?subject=Contacto%20Proyecto%20GSM%20-%20Duoc%20UC`}
                  className="social-btn email"
                  title={`Enviar correo a ${member.email}`}
                >
                  <Mail size={17} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
