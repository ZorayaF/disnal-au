import { Button } from "@components/ui/Button";

export const RegisterFormSection = ({
  formulario,
  cargando,
  error,
  registroExitoso,
  onCambio,
  onEnviar,
}) => {
  if (registroExitoso) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md text-center space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
          ✓
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          ¡Solicitud Recibida Correctamente!
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Los datos de su organización han sido guardados en nuestro registro
          central de auditoría. Un agente de **Disnal AU** evaluará sus datos
          comerciales para habilitar sus credenciales del portal corporativo
          dentro de las próximas 24 horas.
        </p>
        <div className="pt-2">
          <p className="text-xs text-text-muted">
            Se enviará una notificación a:{" "}
            <strong className="text-gray-800">{formulario.correo}</strong>{" "}
            {/* 🎯 Actualizado a .correo */}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Formulario de Afiliación Comercial
        </h2>
        <p className="text-xs text-text-muted mt-1">
          Todos los campos marcados con (*) son obligatorios para verificación
          de crédito e inventario.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={onEnviar} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Razón Social *
            </label>
            <input
              type="text"
              name="nombre_empresa" // 🎯 Sincronizado con hook y BD
              value={formulario.nombre_empresa}
              onChange={onCambio}
              placeholder="Ej. Distribuidora Central S.A.S."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            />
          </div>

          {/* Tax Code Registration identifier */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              NIT / RUT (Con dígito verificación) *
            </label>
            <input
              type="text"
              name="nit_ruc" // 🎯 Sincronizado con hook y BD
              value={formulario.nit_ruc}
              onChange={onCambio}
              placeholder="Ej. 900123456-1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Corporate Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Correo Corporativo *
            </label>
            <input
              type="email"
              name="correo" // 🎯 Sincronizado con hook y BD
              value={formulario.correo}
              onChange={onCambio}
              placeholder="compras@tuempresa.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Teléfono de Contacto *
            </label>
            <input
              type="tel"
              name="telefono" // 🎯 Sincronizado con el hook
              value={formulario.telefono}
              onChange={onCambio}
              placeholder="Ej. +57 300 123 4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 🆕 NUEVO CAMPO: Contraseña Corporativa */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Contraseña del Portal *
            </label>
            <input
              type="password"
              name="password" // 🎯 Sincronizado con el hook
              value={formulario.password || ""}
              onChange={onCambio}
              placeholder="Cree una clave segura"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
              required
            />
          </div>

          {/* Copia Digital de NIT o RUC */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Copia Digital de NIT o RUC *
            </label>
            <input
              type="file"
              name="nitFile" // 🎯 Mapea con la propiedad de archivo binario en el hook
              accept="image/*,application/pdf"
              onChange={onCambio} // El hook ya procesa e.target.files de forma automática con nuestra actualización anterior
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Country Selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              País
            </label>
            <select
              name="pais"
              value={formulario.pais}
              onChange={onCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            >
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
              <option value="Chile">Chile</option>
              <option value="Perú">Perú</option>
            </select>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Ciudad *
            </label>
            <input
              type="text"
              name="ciudad" // 🎯 Sincronizado con hook y BD
              value={formulario.ciudad}
              onChange={onCambio}
              placeholder="Ej. Bogotá"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            />
          </div>

          {/* Commercial Sector Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Sector Comercial
            </label>
            <select
              name="sectorComercial"
              value={formulario.sectorComercial}
              onChange={onCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={cargando}
            >
              <option value="">Seleccione Sector</option>
              <option value="Retail">Retail / Detallista</option>
              <option value="Distribucion">Logística e Importaciones</option>
              <option value="Manufactura">Fábrica / Manufactura</option>
              <option value="Salud">Clínicas / Salud</option>
              <option value="Otro">Otro Sector</option>
            </select>
          </div>
        </div>

        {/* Optional Comments */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            Información adicional / Notas operativas
          </label>
          <textarea
            name="comentarios"
            value={formulario.comentarios}
            onChange={onCambio}
            rows="3"
            placeholder="Especifique volúmenes estimados de compra, sucursales o requerimientos especiales de despacho..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={cargando}
          ></textarea>
        </div>

        {/* Form Submission Actions */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={cargando}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {cargando ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                Procesando Alta Corporativa...
              </>
            ) : (
              "Enviar Solicitud de Registro"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
