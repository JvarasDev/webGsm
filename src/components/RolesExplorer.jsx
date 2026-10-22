import React, { useState } from 'react';
import { 
  Users, User, ShieldCheck, Wrench, CheckCircle, 
  XCircle, Lock, Eye, AlertOctagon, Smartphone 
} from 'lucide-react';
import { systemRoles } from '../data/mockData';

export default function RolesExplorer() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = systemRoles[activeRoleIndex];

  return (
    <section id="perfiles" className="section-wrapper roles-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Users size={14} />
            <span>Matriz de Perfiles y Seguridad</span>
          </div>
          <h2 className="section-title">
            Tres Roles Claramente <span className="gradient-text">Delimitados</span>
          </h2>
          <p className="section-subtitle">
            Basado en las directrices del caso DSY1105, la solución garantiza la estricta separación de responsabilidades, impidiendo la manipulación de datos sensibles y asegurando la integridad del historial.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="role-tabs-bar">
          {systemRoles.map((role, idx) => (
            <button
              key={role.id}
              className={`role-tab-btn ${activeRoleIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveRoleIndex(idx)}
            >
              <div className="role-tab-indicator" style={{ backgroundColor: role.color }}></div>
              <div className="role-tab-info">
                <span className="role-tab-name">{role.name}</span>
                <span className="role-tab-badge">{role.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Role Showcase Card */}
        <div className="role-details-card glass-panel">
          <div className="role-card-banner">
            <div className="role-banner-left">
              <span 
                className="role-pill-chip"
                style={{ backgroundColor: `${activeRole.color}22`, color: activeRole.color, borderColor: activeRole.color }}
              >
                {activeRole.badge}
              </span>
              <h3 className="role-headline">{activeRole.name}</h3>
              <p className="role-bio">{activeRole.description}</p>
            </div>
            <div className="role-banner-right">
              <div className="role-security-badge">
                <ShieldCheck size={20} color={activeRole.color} />
                <span>Control de Acceso Rol (RBAC)</span>
              </div>
            </div>
          </div>

          <div className="role-permissions-grid">
            {/* Can Do */}
            <div className="permissions-column can-do">
              <div className="perm-header">
                <div className="perm-icon-box success">
                  <CheckCircle size={18} />
                </div>
                <h4>Funciones Permitidas</h4>
              </div>
              <ul className="perm-list">
                {activeRole.canDo.map((item, idx) => (
                  <li key={idx} className="perm-item">
                    <CheckCircle size={15} className="item-icon success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cannot Do / Restrictions */}
            <div className="permissions-column cannot-do">
              <div className="perm-header">
                <div className="perm-icon-box danger">
                  <Lock size={18} />
                </div>
                <h4>Restricciones de Seguridad del MVP</h4>
              </div>
              <ul className="perm-list">
                {activeRole.cannotDo.map((item, idx) => (
                  <li key={idx} className="perm-item restricted">
                    <XCircle size={15} className="item-icon danger" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
