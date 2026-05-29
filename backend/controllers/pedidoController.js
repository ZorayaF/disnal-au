import db from "../config/db.js";

/**
 * Crear una nueva cotización/pedido en el sistema CRM (Modo Web)
 */
export const crearPedidoCRM = (req, res) => {
  const {
    idPedido,
    cliente_id,
    necesidades_especificas,
    tipo_despacho,
    direccion_envio,
    ciudad_envio,
    items,
  } = req.body;

  // Validación defensiva incluyendo el nuevo parámetro obligatorio
  if (
    !idPedido ||
    !cliente_id ||
    !tipo_despacho ||
    !items ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({
        error: "Datos del pedido, tipo de despacho o insumos incompletos.",
      });
  }

  const fechaActual = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Transacción relacional segura
  const ejecutarTransaccion = db.transaction((pedidoData, listaItems) => {
    // 1. Insertar el encabezado del pedido con soporte logístico
    const stmtPedido = db.prepare(`
      INSERT INTO pedidos (id, cliente_id, fecha, necesidades_especificas, tipo_despacho, direccion_envio, ciudad_envio, estado, costo_flete)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pendiente', 0.0)
    `);

    stmtPedido.run(
      pedidoData.id,
      pedidoData.cliente_id,
      pedidoData.fecha,
      pedidoData.necesidades_especificas,
      pedidoData.tipo_despacho,
      pedidoData.direccion_envio || null, // NULL si es recogida en bodega
      pedidoData.ciudad_envio || null,
    );

    // 2. Insertar cada uno de los insumos en la tabla de detalles
    const stmtDetalle = db.prepare(`
      INSERT INTO detalles_pedido (pedido_id, producto_id, nombre_producto, presentacion, cantidad)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const item of listaItems) {
      stmtDetalle.run(
        pedidoData.id,
        item.id || item.producto_id,
        item.nombre,
        item.presentacion || null,
        item.cantidadEnCarrito || item.cantidad,
      );
    }
  });

  try {
    ejecutarTransaccion(
      {
        id: idPedido,
        cliente_id,
        fecha: fechaActual,
        necesidades_especificas,
        tipo_despacho,
        direccion_envio,
        ciudad_envio,
      },
      items,
    );

    res.status(201).json({
      mensaje: "Cotización recibida con éxito en el sistema CRM.",
      pedidoId: idPedido,
    });
  } catch (error) {
    console.error("❌ Error en la transacción de SQLite:", error);
    res.status(500).json({
      error: "Error interno del servidor al procesar la cotización relacional.",
    });
  }
};

/**
 * Obtener todos los pedidos (Para la tabla activa del Administrador)
 */
export const obtenerPedidosAdmin = (req, res) => {
  try {
    // Traemos la información completa incluyendo los nuevos campos logísticos
    const pedidos = db
      .prepare(
        `
      SELECT p.*, c.nombre_empresa, c.telefono, c.correo 
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.fecha DESC
    `,
      )
      .all();

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los pedidos para el panel." });
  }
};

/**
 * Cambiar el estado de un pedido e inyectar flete (Aprobar, Rechazar, etc.)
 */
export const actualizarEstadoPedido = (req, res) => {
  const { id } = req.params;
  const { estado, comentarios_admin, costo_flete } = req.body;

  if (!estado) {
    return res.status(400).json({ error: "El nuevo estado es requerido." });
  }

  try {
    // Usamos COALESCE para mantener los valores actuales si el admin no envía cambios en flete o comentarios
    const stmt = db.prepare(`
      UPDATE pedidos 
      SET estado = ?, 
          comentarios_admin = COALESCE(?, comentarios_admin),
          costo_flete = COALESCE(?, costo_flete)
      WHERE id = ?
    `);

    const resultado = stmt.run(
      estado,
      comentarios_admin || null,
      costo_flete !== undefined ? costo_flete : null,
      id,
    );

    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.json({
      mensaje: `Pedido actualizado con éxito.`,
      datosActualizados: { id, estado, costo_flete },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el estado del pedido." });
  }
};

/**
 * NUEVO: Subir comprobante de pago (Para cuando el cliente responda tras la aprobación)
 */
export const subirComprobanteCliente = (req, res) => {
  const { id } = req.params; // ID del pedido

  if (!req.file) {
    return res
      .status(400)
      .json({ error: "Debe adjuntar un archivo de comprobante válido." });
  }

  const urlComprobante = `/uploads/${req.file.filename}`;

  try {
    const stmt = db.prepare(`
      UPDATE pedidos 
      SET url_comprobante = ?, estado = 'Pago_En_Revision'
      WHERE id = ?
    `);

    const resultado = stmt.run(urlComprobante, id);

    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.json({
      mensaje:
        "Comprobante cargado correctamente. Estado cambiado a 'Pago_En_Revision'.",
      url_comprobante: urlComprobante,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir el comprobante." });
  }
};
