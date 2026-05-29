import { useState } from "react";

export const ClientProfileSettings = () => {
  // Datos simulados del cliente, en producción se alimentarán del AuthContext/useCompanyFormCRM
  const [perfil, setPerfil] = useState({
    nombre_empresa: "Pastelería y Panificadora del Norte",
    nit_ruc: "901234567-1",
    correo: "compras@panificadora.com",
    telefono: "+57 300 123 4567",
    direccion: "Avenida Principal #12-84 Parque Industrial Bodega 5",
    ciudad: "Bogotá",
  });

  const [guardado, setGuardado] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    // Aquí harías la petición PUT a /api/clientes/auth/actualizar si lo ves necesario
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <form
      onSubmit={guardarDatos}
      className="space-y-4 max-w-xl bg-white p-6 border border-border-component rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold text-text-main">
        🏢 Configuración del Cliente Corporativo
      </h2>

      {guardado && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-2 text-sm rounded">
          ¡Datos de envío y fiscales actualizados correctamente en el CRM!
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-text-muted mb-1">
            Razón Social / Nombre de Empresa:
          </label>
          <input
            type="text"
            value={perfil.nombre_empresa}
            disabled
            className="w-full p-2 bg-gray-50 border rounded text-gray-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">
            NIT / RUC:
          </label>
          <input
            type="text"
            value={perfil.nit_ruc}
            disabled
            className="w-full p-2 bg-gray-50 border rounded text-gray-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">
            Correo Corporativo:
          </label>
          <input
            type="email"
            value={perfil.correo}
            disabled
            className="w-full p-2 bg-gray-50 border rounded text-gray-500 cursor-not-allowed"
          />
        </div>
        <hr className="col-span-2 my-2" />
        <div className="col-span-2">
          <h3 className="font-semibold text-xs text-blue-600 uppercase tracking-wider">
            📍 Datos Base para Despacho y Fletes
          </h3>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">
            Ciudad Principal:
          </label>
          <input
            type="text"
            name="ciudad"
            value={perfil.ciudad}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">
            Teléfono Logístico:
          </label>
          <input
            type="text"
            name="telefono"
            value={perfil.telefono}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-text-muted mb-1">
            Dirección de Entrega Predeterminada (Bodega o Sucursal):
          </label>
          <input
            type="text"
            name="direccion"
            value={perfil.direccion}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded transition-colors"
      >
        Actualizar Datos Operativos
      </button>
    </form>
  );
};
