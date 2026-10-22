import React, { useState } from 'react';
import { 
  Code2, Smartphone, Database, Server, Layers, 
  Terminal, CheckCircle, Copy, Check, Sparkles 
} from 'lucide-react';
import { techStackDetails } from '../data/mockData';

export default function TechStackSection() {
  const [copiedCode, setCopiedCode] = useState(false);

  const kotlinSampleCode = `// GSM Mobile - Room Database Entities & Mock Seed (Duoc UC DSY1105)
// Repositorio Oficial: https://github.com/Liz-Elizabeth/GSM

package cl.duoc.gsm.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "solicitudes")
data class SolicitudEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val codigoSeguimiento: String, // ej: "SOL-2026-1001"
    val titulo: String,
    val descripcion: String,
    val categoria: String,         // INCIDENTE_TECNICO, SOPORTE_CORREO, etc.
    val clienteId: Int,            // FK -> UsuarioEntity (Camila Rojas)
    var tecnicoId: Int?,           // 3: Diego Soto (Soporte) | 4: Valentina Pino (Web)
    var estado: String,            // RECIBIDA -> EN_PROCESO -> RESUELTA -> CERRADA
    var prioridad: String,         // BAJA, MEDIA, ALTA, URGENTE
    val servicioRelacionado: String,
    val activoRelacionado: String?,
    val fechaLimite: Long,
    val fechaCreacion: Long = System.currentTimeMillis(),
    var fechaActualizacion: Long = System.currentTimeMillis()
)

// 1. Usuarios Ficticios de Prueba (Password para todos: "1234")
val usuariosMock = listOf(
    UsuarioEntity(id = 1, nombre = "Camila Rojas (Cliente Demo)", rol = "CLIENTE", empresa = "Pyme Soluciones Alfa Ltda."),
    UsuarioEntity(id = 2, nombre = "Roberto Méndez (Coordinador Admin)", rol = "ADMINISTRADOR", empresa = "GSM Servicios Digitales"),
    UsuarioEntity(id = 3, nombre = "Diego Soto (Técnico Soporte)", rol = "TECNICO", empresa = "GSM Área Infraestructura"),
    UsuarioEntity(id = 4, nombre = "Valentina Pino (Técnico Web)", rol = "TECNICO", empresa = "GSM Área Desarrollo Web")
)

// Derivación directa a WhatsApp con mensaje estructurado
fun compartirEnlaceSeguimientoWhatsApp(context: Context, solicitud: SolicitudEntity) {
    val mensaje = """
        🔔 *NUEVA SOLICITUD GSM [${'$'}{solicitud.codigoSeguimiento}]*
        📌 *Título:* ${'$'}{solicitud.titulo}
        🏷️ *Categoría:* ${'$'}{solicitud.categoria}
        ⚡ *Prioridad:* ${'$'}{solicitud.prioridad}
        🚦 *Estado:* ${'$'}{solicitud.estado}
        🔗 *Seguimiento:* https://github.com/Liz-Elizabeth/GSM
    """.trimIndent()

    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/?text=" + URLEncoder.encode(mensaje, "UTF-8")))
    context.startActivity(intent)
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(kotlinSampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="tecnologia" className="section-wrapper tech-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <Code2 size={14} />
            <span>Arquitectura Tecnológica</span>
          </div>
          <h2 className="section-title">
            Potencia Nativa con <span className="gradient-text">Kotlin & Jetpack Compose</span>
          </h2>
          <p className="section-subtitle">
            Diseñada siguiendo las mejores prácticas de ingeniería de software móvil: arquitectura MVVM limpia, persistencia offline con Room y microservicios con Spring Boot.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="tech-cards-grid">
          {techStackDetails.map((tech, idx) => (
            <div key={idx} className="tech-spec-card glass-panel">
              <div className="tech-card-header">
                <span className="tech-cat-badge">{tech.category}</span>
              </div>
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-desc">{tech.desc}</p>
            </div>
          ))}
        </div>

        {/* Kotlin Code Showcase */}
        <div className="code-showcase-box glass-panel">
          <div className="code-header-bar">
            <div className="code-tab-title">
              <Terminal size={16} />
              <span>TicketModel.kt · Kotlin Nativo & Room SQLite</span>
            </div>
            <button className="copy-code-btn" onClick={handleCopyCode}>
              {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copiedCode ? '¡Copiado!' : 'Copiar Kotlin'}</span>
            </button>
          </div>
          <pre className="code-pre-block">
            <code>{kotlinSampleCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
