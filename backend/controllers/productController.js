import db from "../config/db.js";

// Obtener todos los productos desde la base de datos SQLite
export const obtenerProductos = (req, res) => {
  try {
    const productos = db.prepare("SELECT * FROM productos").all();

    // Mapeamos de vuelta el entero de SQLite (0/1) al booleano que espera el frontend
    const productosFormateados = productos.map((p) => ({
      ...p,
      destacado: p.destacado === 1,
    }));

    res.json({ productos: productosFormateados });
  } catch (error) {
    console.error("❌ Error al obtener productos de SQLite:", error);
    res.status(500).json({ error: "Error interno al recuperar el catálogo." });
  }
};

// Crear un nuevo producto en la tabla relacional
export const crearProducto = (req, res) => {
  const {
    nombre,
    cantidad,
    estado,
    categoria,
    marca,
    presentacion,
    sku,
    descripcion,
    destacado,
    proteina,
    humedad,
    imagenes, // Si el nuevo modelo solo usa un string text para imagen_url
  } = req.body;

  if (!nombre || cantidad === undefined) {
    return res
      .status(400)
      .json({ error: "El nombre y la cantidad son obligatorios." });
  }

  try {
    // Definición de valores por defecto y fallbacks seguros
    const stockCantidad = Number(cantidad);
    const estadoFinal =
      estado || (stockCantidad > 0 ? "disponible" : "no disponible");
    const esDestacado = destacado === "true" || destacado === true ? 1 : 0;
    const itemSku = sku || `SKU-${Date.now()}`;
    const urlImagen =
      Array.isArray(imagenes) && imagenes.length > 0
        ? imagenes[0]
        : typeof imagenes === "string"
          ? imagenes
          : null;

    const stmt = db.prepare(`
      INSERT INTO productos (
        nombre, estado, cantidad, categoria, marca, 
        presentacion, sku, descripcion, destacado, proteina, humedad, imagen_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const resultado = stmt.run(
      nombre,
      estadoFinal,
      stockCantidad,
      categoria ? categoria.trim().toLowerCase() : "sin-categoria",
      marca || "Genérico",
      presentacion || "Unidad",
      itemSku,
      descripcion || "",
      esDestacado,
      proteina || null,
      humedad || null,
      urlImagen,
    );

    res.status(201).json({
      mensaje: "Producto creado con éxito en SQLite",
      productoId: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("❌ Error al crear producto en SQLite:", error);
    if (error.message.includes("UNIQUE constraint failed: productos.sku")) {
      return res
        .status(400)
        .json({ error: "El SKU ya se encuentra registrado." });
    }
    res.status(500).json({ error: "Error al guardar el producto." });
  }
};

// Actualizar un producto existente de forma parcial (Coalesce defensivo)
export const actualizarProducto = (req, res) => {
  const id = Number(req.params.id);
  const {
    nombre,
    cantidad,
    estado,
    categoria,
    marca,
    presentacion,
    sku,
    descripcion,
    destacado,
    proteina,
    humedad,
    imagenes,
  } = req.body;

  try {
    // 1. Obtener el producto actual para realizar la lógica cruzada de stock/estado
    const productoActual = db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(id);

    if (!productoActual) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // 2. Determinar cantidad y estado
    const nuevaCantidad =
      cantidad !== undefined ? Number(cantidad) : productoActual.cantidad;
    let nuevoEstado = productoActual.estado;

    if (estado !== undefined) {
      nuevoEstado =
        estado === "no disponible"
          ? "no disponible"
          : nuevaCantidad > 0
            ? "disponible"
            : "no disponible";
    } else if (cantidad !== undefined) {
      nuevoEstado = nuevaCantidad > 0 ? "disponible" : "no disponible";
    }

    // 3. Formatear booleanos y arreglos multimedia
    const esDestacado =
      destacado !== undefined
        ? destacado === "true" || destacado === true
          ? 1
          : 0
        : productoActual.destacado;
    const urlImagen =
      imagenes !== undefined
        ? Array.isArray(imagenes)
          ? imagenes[0]
          : imagenes
        : productoActual.imagen_url;

    const stmt = db.prepare(`
      UPDATE productos SET
        nombre = COALESCE(?, nombre),
        cantidad = ?,
        estado = ?,
        categoria = COALESCE(?, categoria),
        marca = COALESCE(?, marca),
        presentacion = COALESCE(?, presentacion),
        sku = COALESCE(?, sku),
        descripcion = COALESCE(?, descripcion),
        destacado = ?,
        proteina = COALESCE(?, proteina),
        humedad = COALESCE(?, humedad),
        imagen_url = COALESCE(?, imagen_url)
      WHERE id = ?
    `);

    stmt.run(
      nombre || null,
      nuevaCantidad,
      nuevoEstado,
      categoria ? categoria.trim().toLowerCase() : null,
      marca || null,
      presentacion || null,
      sku || null,
      descripcion || null,
      esDestacado,
      proteina || null,
      humedad || null,
      urlImagen || null,
      id,
    );

    res.json({ mensaje: "Producto actualizado con éxito en SQLite" });
  } catch (error) {
    console.error("❌ Error al actualizar producto en SQLite:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el producto en la base de datos." });
  }
};

// Eliminar producto por ID
export const eliminarProducto = (req, res) => {
  const id = Number(req.params.id);

  try {
    const stmt = db.prepare("DELETE FROM productos WHERE id = ?");
    const resultado = stmt.run(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json({ mensaje: "Producto eliminado con éxito de SQLite", id });
  } catch (error) {
    console.error("❌ Error al eliminar producto de SQLite:", error);
    res
      .status(500)
      .json({
        error:
          "No se puede eliminar el producto (puede estar asociado a un pedido activo).",
      });
  }
};
