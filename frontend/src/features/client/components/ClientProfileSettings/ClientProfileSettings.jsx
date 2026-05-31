import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "@config/api";
import { AuthContext } from "@context/AuthContext";

export const ClientProfileSettings = ({ clienteAutenticado }) => {
  const { loginGlobal } = useContext(AuthContext);

  const [perfil, setPerfil] = useState({
    id: 0,
    nombre_empresa: "",
    nit_ruc: "",
    correo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  const [cargando, setCargando] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    if (clienteAutenticado) {
      setPerfil({
        id: clienteAutenticado.id || 0,
        nombre_empresa: clienteAutenticado.nombre_empresa || clienteAutenticado.usuario || "",
        nit_ruc: clienteAutenticado.nit_ruc || "",
        correo: clienteAutenticado.correo || "",
        telefono: clienteAutenticado.telefono || "",
        direccion: clienteAutenticado.direccion || "",
        ciudad: clienteAutenticado.ciudad || "",
      });
    }
  }, [clienteAutenticado]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
    if (mensajeFeedback.texto) setMensajeFeedback({ texto: "", tipo: "" });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensajeFeedback({ texto: "", tipo: "" });

    try {
      const respuesta = await fetch(`${API_BASE_URL}/clientes/auth/actualizar-perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: perfil.id,
          telefono: perfil.telefono,
          direccion: perfil.direccion,
          ciudad: perfil.ciudad,
        }),
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "Fallo al procesar la actualización.");

      loginGlobal({
        cliente: {
          id: perfil.id,
          nombre_empresa: perfil.nombre_empresa,
          nit_ruc: perfil.nit_ruc,
          correo: perfil.correo,
          telefono: perfil.telefono,
          direccion: perfil.direccion,
          ciudad: perfil.ciudad,
        },
      });

      setMensajeFeedback({ texto: "Datos actualizados con éxito.", tipo: "exito" });
    } catch (error) {
      setMensajeFeedback({ texto: error.message, tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  const restablecer = () => {
    if (clienteAutenticado) {
      setPerfil({
        id: clienteAutenticado.id || 0,
        nombre_empresa: clienteAutenticado.nombre_empresa || clienteAutenticado.usuario || "",
        nit_ruc: clienteAutenticado.nit_ruc || "",
        correo: clienteAutenticado.correo || "",
        telefono: clienteAutenticado.telefono || "",
        direccion: clienteAutenticado.direccion || "",
        ciudad: clienteAutenticado.ciudad || "",
      });
      setMensajeFeedback({ texto: "", tipo: "" });
    }
  };

  const infoCompleta = perfil.ciudad && perfil.telefono && perfil.direccion;

  // Shared input style
  const inputBase =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-disnal-ink bg-white outline-none transition-all focus:border-disnal-red focus:ring-2 focus:ring-disnal-red/10";
  const inputDisabled =
    "w-full px-3 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── MAIN FORM ── */}
      <div className="lg:col-span-2">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black text-disnal-ink tracking-wide uppercase">Configuración Corporativa</h2>
            <p className="text-sm text-gray-500 mt-0.5">Administra los datos logísticos de tu empresa para despachos y fletes.</p>
            <div className="w-10 h-0.5 bg-disnal-red mt-1.5 rounded-full" />
          </div>
        </div>

        {/* Feedback */}
        {mensajeFeedback.texto && (
          <div className={`mb-4 p-3 rounded-lg text-sm border flex items-center gap-2 ${
            mensajeFeedback.tipo === "exito"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {mensajeFeedback.tipo === "exito" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            )}
            {mensajeFeedback.texto}
          </div>
        )}

        <form onSubmit={guardarDatos} noValidate>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Razón Social / Nombre de Empresa
            </label>
            <input
              type="text"
              value={perfil.nombre_empresa}
              disabled
              className={inputDisabled}
            />
          </div>

          {/* NIT + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">NIT / RUC</label>
              <input type="text" value={perfil.nit_ruc} disabled className={inputDisabled} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Correo Corporativo</label>
              <input type="email" value={perfil.correo} disabled className={inputDisabled} />
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 pt-1 border-t border-gray-100">
            <span className="inline-flex items-center gap-2 text-xs font-black text-disnal-red uppercase tracking-widest">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Datos Base para Despacho y Fletes
            </span>
          </div>

          {/* City + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Ciudad Principal</label>
              <input
                type="text"
                name="ciudad"
                value={perfil.ciudad}
                onChange={manejarCambio}
                className={inputBase}
                disabled={cargando}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Teléfono Logístico</label>
              <input
                type="text"
                name="telefono"
                value={perfil.telefono}
                onChange={manejarCambio}
                className={inputBase}
                disabled={cargando}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Dirección de Entrega Predeterminada (Bodega o Sucursal)
            </label>
            <input
              type="text"
              name="direccion"
              value={perfil.direccion}
              onChange={manejarCambio}
              className={inputBase}
              disabled={cargando}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={cargando}
              className="inline-flex items-center gap-2 bg-disnal-red text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors hover:bg-disnal-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              {cargando ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={restablecer}
              disabled={cargando}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />
              </svg>
              Restablecer
            </button>
          </div>
        </form>
      </div>

      {/* ── SUMMARY SIDEBAR ── */}
      <div>
        <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 sticky top-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black text-disnal-ink uppercase tracking-wider">Resumen de Información</p>
              <p className="text-xs text-gray-400 mt-0.5">Verifica que todos los datos estén correctos.</p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3.5">
            {[
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
                label: "Empresa",
                value: perfil.nombre_empresa || "—",
              },
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
                label: "NIT / RUC",
                value: perfil.nit_ruc || "—",
              },
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                label: "Correo Corporativo",
                value: perfil.correo || "—",
              },
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                label: "Ciudad",
                value: perfil.ciudad || "—",
              },
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.45h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                label: "Teléfono Logístico",
                value: perfil.telefono || "—",
              },
              {
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
                label: "Dirección de Entrega",
                value: perfil.direccion || "—",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-xs font-bold text-disnal-ink">{label}</p>
                  <p className="text-xs text-gray-500 break-all">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className={`mt-5 p-3 rounded-lg border text-xs flex items-start gap-2 ${
            infoCompleta
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-amber-50 border-amber-200 text-amber-700"
          }`}>
            {infoCompleta ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            )}
            <div>
              <p className="font-bold">
                {infoCompleta ? "Estado: Información completa" : "Estado: Datos incompletos"}
              </p>
              <p className="mt-0.5 opacity-80">
                {infoCompleta
                  ? "Todos los datos requeridos han sido diligenciados."
                  : "Por favor completa ciudad, teléfono y dirección."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
