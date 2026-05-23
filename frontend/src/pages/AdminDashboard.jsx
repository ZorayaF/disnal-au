// src/pages/AdminDashboard.jsx
import { useState } from "react"; // 🌟 Importamos useState para manejar las pestañas
import { useAdmin } from "@hooks/useAdmin";
import { AdminOverview } from "@sections/AdminOverview";
import { AdminManager } from "@sections/AdminManager";
import { AdminChatPanel } from "@sections/AdminChatPanel"; // 🌟 Importamos la sección del Chat
import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";

export const AdminDashboard = () => {
  // Estado local para alternar entre 'inventario' y 'soporte'
  const [activeTab, setActiveTab] = useState("inventario");

  // Extraemos toda la data y funciones del hook controlador
  const {
    productos,
    productoEnEdicion,
    manejarCerrarSesion,
    gestionarGuardar,
    gestionarEliminar,
    cancelarEdicion,
    seleccionarParaEditar,
  } = useAdmin();

  return (
    <div className="min-h-screen bg-bg-main p-6 md:p-10 font-sans space-y-10">
      {/* SECCIÓN: Cabecera e Identidad Visual */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-component pb-4">
        <div>
          <Title text="Panel de Administración General" level={1} />
          <p className="text-text-muted text-sm mt-1">
            Control de stock, ingresos y soporte B2B en tiempo real de Disnal
            AU.
          </p>
        </div>

        <div className="sm:self-center">
          <Button variant="secondary" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* 🌟 NUEVA SECCIÓN: Menú de Pestañas (Navegación del Admin) */}
      <div className="flex gap-4 border-b border-border-component pb-2">
        <button
          onClick={() => setActiveTab("inventario")}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${
            activeTab === "inventario"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          📦 Gestión de Inventario
        </button>
        <button
          onClick={() => setActiveTab("soporte")}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${
            activeTab === "soporte"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          💬 Soporte en Vivo
        </button>
      </div>

      {/* SECCIÓN: Distribución Dinámica de Componentes */}
      {activeTab === "inventario" ? (
        /* VISTA ORIGINAL DE INVENTARIO */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Formulario de Registro/Edición (Izquierda) */}
          <div className="xl:col-span-1">
            <AdminManager
              productoAEditar={productoEnEdicion}
              onGuardar={gestionarGuardar}
              onCancelar={cancelarEdicion}
            />
          </div>

          {/* Tabla / Vista del Inventario Existente (Derecha) */}
          <div className="xl:col-span-2">
            <AdminOverview
              productos={productos}
              onEditar={seleccionarParaEditar}
              onEliminar={gestionarEliminar}
            />
          </div>
        </div>
      ) : (
        /* VISTA DEL PANEL DE CHAT WEBSOCKET */
        <div className="w-full shadow-md rounded-lg overflow-hidden">
          <AdminChatPanel />
        </div>
      )}
    </div>
  );
};
