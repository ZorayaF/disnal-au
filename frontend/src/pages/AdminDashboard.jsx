// src/pages/AdminDashboard.jsx
import { useAdmin } from "@hooks/useAdmin";
import { AdminOverview } from "@sections/AdminOverview";
import { AdminManager } from "@sections/AdminManager";
import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";

export const AdminDashboard = () => {
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
            Control de stock, ingresos y galerías de insumos de Disnal AU.
          </p>
        </div>

        <div className="sm:self-center">
          <Button variant="secondary" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* SECCIÓN: Distribución de Componentes Modulares */}
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
    </div>
  );
};
