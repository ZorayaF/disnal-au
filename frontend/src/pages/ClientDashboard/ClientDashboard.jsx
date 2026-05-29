import { useNavigate } from "react-router-dom";
import { useClientDashboard } from "@hooks/useClientDashboard";
import { ClientOrdersTracker } from "@sections/ClientOrdersTracker";
import { ClientProfileSettings } from "@sections/ClientProfileSettings";
import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";
import "./ClientDashboard.css";

export const ClientDashboard = () => {
  const navigate = useNavigate();

  // Extraemos únicamente estructuras de datos y manejadores de interfaz
  const {
    activeTab,
    cambiarTab,
    ejecutarCerrarSesion,
    ...hookTrackerProps // Empaquetamos el resto de propiedades para enviarlas de forma limpia a la sección
  } = useClientDashboard();

  return (
    <div className="client-dashboard">
      {/* CABECERA E IDENTIDAD */}
      <header className="client-dashboard__header">
        <div className="client-dashboard__header-info">
          <Title text="Panel Corporativo de Clientes" level={1} />
          <p className="client-dashboard__header-subtitle">
            Siga el estado de sus solicitudes de insumos, fletes y cargue sus
            comprobantes de pago.
          </p>
        </div>
        <div className="client-dashboard__header-actions">
          <Button
            variant="secondary"
            onClick={() => ejecutarCerrarSesion(navigate)}
          >
            Salir del Panel
          </Button>
        </div>
      </header>

      {/* MENÚ DE PESTAÑAS */}
      <nav
        className="client-dashboard__tabs"
        role="tablist"
        aria-label="Opciones del panel"
      >
        <button
          role="tab"
          aria-selected={activeTab === "pedidos"}
          onClick={() => cambiarTab("pedidos")}
          className={`client-dashboard__tab-btn ${activeTab === "pedidos" ? "is-active" : ""}`}
        >
          📋 Mis Pedidos y Tracking
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "perfil"}
          onClick={() => cambiarTab("perfil")}
          className={`client-dashboard__tab-btn ${activeTab === "perfil" ? "is-active" : ""}`}
        >
          ⚙️ Datos de Despacho
        </button>
      </nav>

      {/* CONTENEDOR DINÁMICO DE SECCIONES */}
      <main className="client-dashboard__content">
        {activeTab === "pedidos" && (
          <ClientOrdersTracker {...hookTrackerProps} />
        )}

        {activeTab === "perfil" && <ClientProfileSettings />}
      </main>
    </div>
  );
};
