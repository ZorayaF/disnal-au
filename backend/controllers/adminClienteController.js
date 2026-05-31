import db from "../config/db.js";

/**
 * Obtener listado de clientes registrados filtrados por su estado (Pendiente, Aprobado, Rechazado)
 */
export const obtenerClientesAdmin = (req, res) => {
  const { estado } = req.query; // Ejemplo: /api/admin/clientes?estado=Pendiente

  try {
    let consulta =
      "SELECT id, nit_ruc, nombre_empresa, correo, telefono, direccion, ciudad, url_nit, estado FROM clientes";
    const parametros = [];

    if (estado) {
      const estadoFormateado =
        estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();

      // Validación defensiva de estados válidos en tu lógica B2B
      const estadosValidos = ["Pendiente", "Aprobado", "Rechazado"];
      if (!estadosValidos.includes(estadoFormateado)) {
        return res
          .status(400)
          .json({ error: "El estado de filtro proporcionado no es válido." });
      }

      consulta += " WHERE estado = ?";
      parametros.push(estadoFormateado);
    }

    consulta += " ORDER BY id DESC";

    const clientes = db.prepare(consulta).all(parametros);
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al obtener clientes para el CRM:", error);
    res
      .status(500)
      .json({ error: "Error al recuperar el listado de empresas." });
  }
};

/**
 * Actualizar el estatus de auditoría de una empresa corporativa (Aprobar o Rechazar)
 */
export const evaluarClienteB2B = (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body; // 'Aprobado' o 'Rechazado'

  if (
    !nuevoEstado ||
    (nuevoEstado !== "Aprobado" && nuevoEstado !== "Rechazado")
  ) {
    return res
      .status(400)
      .json({ error: "El estado de resolución enviado no es válido." });
  }

  try {
    const stmt = db.prepare(`
      UPDATE clientes 
      SET estado = ? 
      WHERE id = ?
    `);

    const resultado = stmt.run(nuevoEstado, id);

    if (resultado.changes === 0) {
      return res
        .status(404)
        .json({ error: "La empresa solicitada no existe en el sistema." });
    }

    res.json({
      mensaje: `La empresa ha sido resuelta como: ${nuevoEstado} con éxito.`,
      datos: { id, estado: nuevoEstado },
    });
  } catch (error) {
    console.error("❌ Error en la transacción de auditoría de cliente:", error);
    res.status(500).json({
      error: "Error interno al procesar el cambio de estatus corporativo.",
    });
  }
};
