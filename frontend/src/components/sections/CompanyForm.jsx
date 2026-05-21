// src/components/sections/CompanyForm.jsx
import { useCompanyForm } from "@hooks/useCompanyForm";

export const CompanyForm = ({ nextStep, prevStep }) => {
  const { datosEmpresa, handleInputChange, manejarEnvioPedido } =
    useCompanyForm(nextStep);

  // Control de seguridad por si el objeto datosEmpresa no se ha inicializado todavía
  if (!datosEmpresa) return <p>Cargando datos del formulario...</p>;

  return (
    <form
      onSubmit={manejarEnvioPedido}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        background: "#fff",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <h3>Formulario de Datos Comerciales (Cotización B2B)</h3>
      <hr />

      {/* Nombre Empresa */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Nombre de la Empresa / Panadería *
        </label>
        <input
          type="text"
          name="nombreEmpresa"
          placeholder="Ej: Panadería El Maná"
          value={datosEmpresa.nombreEmpresa || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Razón Social */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Razón Social
        </label>
        <input
          type="text"
          name="razonSocial"
          placeholder="Ej: Distribuidores El Maná S.A.S."
          value={datosEmpresa.razonSocial || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* NIT / RUC */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          NIT / RUC
        </label>
        <input
          type="text"
          name="nitRuc"
          placeholder="Ej: 900123456-1"
          value={datosEmpresa.nitRuc || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Nombre Contacto */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Nombre de Contacto *
        </label>
        <input
          type="text"
          name="nombreContacto"
          placeholder="Ej: Carlos Pérez"
          value={datosEmpresa.nombreContacto || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Correo */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Correo Electrónico
        </label>
        <input
          type="email"
          name="correo"
          placeholder="Ej: contacto@empresa.com"
          value={datosEmpresa.correo || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Teléfono */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Número de Teléfono / WhatsApp *
        </label>
        <input
          type="text"
          name="telefono"
          placeholder="Ej: 3123456789"
          value={datosEmpresa.telefono || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Ciudad */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Ciudad *
        </label>
        <input
          type="text"
          name="ciudad"
          placeholder="Ej: Bogotá"
          value={datosEmpresa.ciudad || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      {/* Necesidades Especificas */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Necesidades Comerciales Específicas
        </label>
        <textarea
          name="necesidadesEspecificas"
          placeholder="Observaciones o solicitudes sobre empaque, despacho, etc."
          value={datosEmpresa.necesidadesEspecificas || ""} // 🌟 Blindado
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px", minHeight: "60px" }}
        />
      </div>

      {/* Controles del flujo de pasos */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={prevStep}
          style={{ padding: "8px 16px" }}
        >
          Atrás
        </button>
        <button type="submit" style={{ padding: "8px 16px", width: "100%" }}>
          Confirmar y Enviar Pedido a WhatsApp
        </button>
      </div>
    </form>
  );
};
