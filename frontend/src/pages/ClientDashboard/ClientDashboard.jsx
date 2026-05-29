import { useNavigate } from "react-router-dom";
import { useClientDashboard } from "@hooks/useClientDashboard";
import { ClientOrdersTracker } from "@sections/ClientOrdersTracker";
import { ClientProfileSettings } from "@sections/ClientProfileSettings";
import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";
import "./ClientDashboard.css";

export const ClientDashboard = () => {
  const navigate = useNavigate();

  // 🎯 CORREGIDO: Desestructuramos 'clienteLogueado' que ahora expone tu hook
  const {
    activeTab,
    cambiarTab,
    ejecutarCerrarSesion,
    clienteLogueado, // 👈 Extraemos el nodo con los datos reales del cliente
    ...hookTrackerProps
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

        {/* ACCIONES DE CABECERA AUTOMATIZADAS */}
        <div className="client-dashboard__header-actions">
          <Button
            variant="secondary"
            onClick={() => ejecutarCerrarSesion(navigate)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 15, height: 15 }}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
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

        {activeTab === "perfil" && (
          /* 🎯 CORREGIDO: Le pasamos la propiedad mapeada del hook */
          <ClientProfileSettings clienteAutenticado={clienteLogueado} />
        )}
      </main>
    </div>
  );
};
