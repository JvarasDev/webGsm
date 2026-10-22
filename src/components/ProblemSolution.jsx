import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle2, MessageSquare, ArrowRight, 
  Clock, ShieldAlert, Cpu, Sparkles, XCircle 
} from 'lucide-react';
import { problemsVsSolutions } from '../data/mockData';

export default function ProblemSolution() {
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'problem', 'solution'

  return (
    <section id="solucion" className="section-wrapper">
      <div className="container">
        {/* Section Title */}
        <div className="section-header-center">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Diagnóstico del Caso DSY1105</span>
          </div>
          <h2 className="section-title">
            De la Dispersión en Chats al <span className="gradient-text">Control Centralizado</span>
          </h2>
          <p className="section-subtitle">
            Las pymes y empresas de servicios digitales sufren pérdidas constantes por coordinaciones desordenadas en WhatsApp. GSM fue concebida para brindar orden riguroso y seguimiento formal.
          </p>
        </div>

        {/* View Toggle */}
        <div className="tab-pill-selector">
          <button 
            className={`pill-btn ${activeTab === 'both' ? 'active' : ''}`}
            onClick={() => setActiveTab('both')}
          >
            Vista Comparativa (Antes vs Después)
          </button>
          <button 
            className={`pill-btn ${activeTab === 'problem' ? 'active' : ''}`}
            onClick={() => setActiveTab('problem')}
          >
            Solo Problemas en WhatsApp
          </button>
          <button 
            className={`pill-btn ${activeTab === 'solution' ? 'active' : ''}`}
            onClick={() => setActiveTab('solution')}
          >
            Solo Solución GSM
          </button>
        </div>

        {/* Problem vs Solution Cards Grid */}
        <div className="comparison-grid">
          {problemsVsSolutions.map((item) => (
            <div key={item.id} className="comparison-card glass-panel">
              <div className="card-header-row">
                <h3 className="card-item-title">{item.title}</h3>
                <span className="impact-badge">{item.impact}</span>
              </div>

              <div className="card-body-split">
                {(activeTab === 'both' || activeTab === 'problem') && (
                  <div className="split-side problem-side">
                    <div className="side-label danger">
                      <XCircle size={15} />
                      <span>Sin GSM · WhatsApp Caótico</span>
                    </div>
                    <p className="side-text">{item.problem}</p>
                  </div>
                )}

                {(activeTab === 'both' || activeTab === 'solution') && (
                  <div className="split-side solution-side">
                    <div className="side-label success">
                      <CheckCircle2 size={15} />
                      <span>Con GSM Móvil · Flujo Seguro</span>
                    </div>
                    <p className="side-text">{item.solution}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Progression Banner */}
        <div className="workflow-flowchart glass-panel">
          <div className="flowchart-title">
            <span>Ciclo de Vida de una Solicitud con GSM</span>
          </div>
          <div className="flow-steps-row">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-title">Origen WhatsApp</div>
              <div className="step-desc">Cliente comunica necesidad</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-title">Registro & #ID</div>
              <div className="step-desc">Genera #GSM-XXXX</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-title">Priorización</div>
              <div className="step-desc">Coordinador asigna técnico</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-title">Resolución TI</div>
              <div className="step-desc">Técnico aporta evidencias</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-step">
              <div className="step-number">5</div>
              <div className="step-title">Cierre Formal</div>
              <div className="step-desc">Cliente valida conformidad</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
