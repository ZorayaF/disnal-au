import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "@config/api";
import { AuthContext } from "@context/AuthContext";

export const ClientProfileSettings = ({ clienteAutenticado }) => {
  // Extraemos loginGlobal para actualizar el localStorage y la sesión reactiva de inmediato al guardar
  const { loginGlobal } = useContext(AuthContext);

  const [perfil, setPerfil] = useState({
    id: 0,
    nombre_empresa: "Cargando razón social...",
    nit_ruc: "Cargando identificador...",
    correo: "Cargando correo corporativo...",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  const [cargando, setCargando] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState({
    texto: "",
    tipo: "",
  });

  useEffect(() => {
    if (clienteAutenticado) {
      setPerfil({
        id: clienteAutenticado.id || 0,
        // Tu contexto guarda el nombre de la empresa tanto en 'usuario' como en 'nombre_empresa'
        nombre_empresa:
          clienteAutenticado.nombre_empresa ||
          clienteAutenticado.usuario ||
          "Empresa Corporativa",
        nit_ruc: clienteAutenticado.nit_ruc || "NIT no provisto",
        correo: clienteAutenticado.correo || "Sin correo",
        telefono: clienteAutenticado.telefono || "",
        direccion: clienteAutenticado.direccion || "",
        ciudad: clienteAutenticado.ciudad || "",
      });
    }
  }, [clienteAutenticado]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensajeFeedback({ texto: "", tipo: "" });

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/clientes/auth/actualizar-perfil`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: perfil.id,
            telefono: perfil.telefono,
            direccion: perfil.direccion,
            ciudad: perfil.ciudad,
          }),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "Fallo al procesar la actualización.");
      }

      // 🎯 MODIFICACIÓN CRÍTICA: Actualizamos la sesión global de React simulando la respuesta de la API.
      // De este modo la barra de navegación, el carrito y los fletes adoptan la nueva dirección sin desloguearse.
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

      setMensajeFeedback({
        texto:
          "¡Datos maestros y de despacho actualizados con éxito en el ecosistema B2B!",
        tipo: "exito",
      });
    } catch (error) {
      console.error("❌ Error al guardar perfil corporativo:", error);
      setMensajeFeedback({ texto: error.message, tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={guardarDatos}
      className="space-y-4 max-w-xl bg-white p-6 border border-border-component rounded-lg shadow-sm text-left"
    >
      <h2 className="text-xl font-bold text-text-main">
        🏢 Configuración del Cliente Corporativo
      </h2>

      {mensajeFeedback.texto && (
        <div
          className={`p-2.5 text-sm rounded border ${
            mensajeFeedback.tipo === "exito"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {mensajeFeedback.texto}
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={cargando}
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={cargando}
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={cargando}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded transition-colors disabled:opacity-50 cursor-pointer"
      >
        {cargando ? "Sincronizando..." : "Actualizar Datos Operativos"}
      </button>
    </form>
  );
};
