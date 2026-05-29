import db from "../config/db.js";

/**
 * Crear una nueva cotización/pedido en el sistema CRM (Modo Web)
 */
export const crearPedidoCRM = (req, res) => {
  const {
    idPedido,
    cliente_id,
    needs_especificas, // mapeado según venga en tu body
    necesidades_especificas,
    tipo_despacho,
    direccion_envio,
    ciudad_envio,
    items,
  } = req.body;

  if (
    !idPedido ||
    !cliente_id ||
    !tipo_despacho ||
    !items ||
    items.length === 0
  ) {
    return res.status(400).json({
      error: "Datos del pedido, tipo de despacho o insumos incompletos.",
    });
  }

  const fechaActual = new Date().toISOString().split("T")[0];

  const ejecutarTransaccion = db.transaction((pedidoData, listaItems) => {
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
      pedidoData.direccion_envio || null,
      pedidoData.ciudad_envio || null,
    );

    // Nota: precio_unitario se inserta vacío (NULL) por defecto ya que es una cotización B2B entrante
    const stmtDetalle = db.prepare(`
      INSERT INTO detalles_pedido (pedido_id, producto_id, nombre_producto, presentacion, cantidad, precio_unitario)
      VALUES (?, ?, ?, ?, ?, NULL)
    `);

    for (const item of listaItems) {
      stmtDetalle.run(
        pedidoData.id,
        String(item.id || item.producto_id),
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
        necesidades_especificas: necesidades_especificas || needs_especificas,
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
 * Obtener todos los pedidos incluyendo sus productos relacionales (Para el Administrador)
 */
export const obtenerPedidosAdmin = (req, res) => {
  try {
    // 1. Obtener los encabezados de los pedidos junto con los datos de contacto de la empresa
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

    // 2. Mapear e inyectar el array de productos correspondientes desde detalles_pedido
    const pedidosConProductos = pedidos.map((pedido) => {
      const productos = db
        .prepare(
          `
        SELECT 
          producto_id AS id_producto, 
          nombre_producto AS nombre, 
          presentacion, 
          cantidad, 
          precio_unitario AS precio_b2b_asignado
        FROM detalles_pedido
        WHERE pedido_id = ?
      `,
        )
        .all(pedido.id);

      return {
        ...pedido,
        productos, // Formato exacto que espera tu frontend renderizar
      };
    });

    res.json(pedidosConProductos);
  } catch (error) {
    console.error("❌ Error al recuperar listado relacional:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los pedidos para el panel." });
  }
};

/**
 * Cambiar el estado del pedido, inyectar flete y asignar precios B2B por cada ítem
 */
export const actualizarEstadoPedido = (req, res) => {
  const { id } = req.params;
  const { estado, comentarios_admin, costo_flete, productos } = req.body;

  if (!estado) {
    return res.status(400).json({ error: "El nuevo estado es requerido." });
  }

  // Envoltura transaccional de better-sqlite3 para asegurar consistencia absoluta
  const ejecutarActualizacionTransaccional = db.transaction(() => {
    // 1. Si el estado es 'Completado', ejecutamos el descuento automático de Stock
    if (estado === "Completado") {
      // Traemos los productos asociados a este pedido específico
      const itemsPedido = db
        .prepare(
          `
        SELECT producto_id, cantidad, nombre_producto 
        FROM detalles_pedido 
        WHERE pedido_id = ?
      `,
        )
        .all(id);

      // Preparamos los statements de lectura de stock y actualización
      const stmtConsultarStock = db.prepare(
        "SELECT cantidad, nombre FROM productos WHERE id = ?",
      );
      const stmtRestarStock = db.prepare(
        "UPDATE productos SET cantidad = cantidad - ? WHERE id = ?",
      );

      for (const item of itemsPedido) {
        const productoInventario = stmtConsultarStock.get(item.producto_id);

        if (!productoInventario) {
          throw new Error(`PRODUCTO_NO_EXISTE:${item.nombre_producto}`);
        }

        // Validación defensiva B2B: Evitar que el inventario quede en negativo
        if (productoInventario.cantidad < item.cantidad) {
          throw new Error(
            `STOCK_INSUFICIENTE:${item.nombre_producto}:Disponibles:${productoInventario.cantidad}`,
          );
        }

        // Restamos las unidades del almacén
        stmtRestarStock.run(item.cantidad, item.producto_id);
      }
    }

    // 2. Actualizar los datos maestros del pedido (Estado, flete, etc.)
    const stmtPedido = db.prepare(`
      UPDATE pedidos 
      SET estado = ?, 
          comentarios_admin = COALESCE(?, comentarios_admin),
          costo_flete = COALESCE(?, costo_flete)
      WHERE id = ?
    `);

    const resultadoPedido = stmtPedido.run(
      estado,
      comentarios_admin !== undefined ? comentarios_admin : null,
      costo_flete !== undefined ? costo_flete : null,
      id,
    );

    if (resultadoPedido.changes === 0) {
      throw new Error("PEDIDO_NO_ENCONTRADO");
    }

    // 3. Si se envían productos con cotización de precios (por ejemplo, en la fase de Aprobado)
    if (productos && productos.length > 0) {
      const stmtDetalle = db.prepare(`
        UPDATE detalles_pedido
        SET precio_unitario = ?
        WHERE pedido_id = ? AND producto_id = ?
      `);

      for (const prod of productos) {
        stmtDetalle.run(
          prod.precio_b2b_asignado !== undefined
            ? parseFloat(prod.precio_b2b_asignado)
            : null,
          id,
          String(prod.id_producto),
        );
      }
    }
  });

  try {
    ejecutarActualizacionTransaccional();

    res.json({
      mensaje: "Pedido procesado y stock actualizado en el almacén con éxito.",
      datosActualizados: { id, estado, costo_flete },
    });
  } catch (error) {
    console.error("❌ Error en actualización relacional/stock:", error);

    // Control de errores semánticos para responderle cosas útiles al frontend
    if (error.message.startsWith("STOCK_INSUFICIENTE")) {
      const [_, nombre, __, disponibles] = error.message.split(":");
      return res.status(400).json({
        error: `No hay stock suficiente de "${nombre}". Solo quedan ${disponibles} unidades disponibles en bodega.`,
      });
    }
    if (error.message.startsWith("PRODUCTO_NO_EXISTE")) {
      const [_, nombre] = error.message.split(":");
      return res
        .status(404)
        .json({ error: `El insumo "${nombre}" ya no existe en el catálogo.` });
    }
    if (error.message === "PEDIDO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ error: "Pedido no encontrado en la base de datos." });
    }

    res
      .status(500)
      .json({ error: "Error interno al actualizar el estado y el stock." });
  }
};

/**
 * Subir comprobante de pago
 */
export const subirComprobanteCliente = (req, res) => {
  const { id } = req.params;

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
