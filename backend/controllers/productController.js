import db from "../config/db.js";

// Obtener todos los productos desde la base de datos SQLite
export const obtenerProductos = (req, res) => {
  try {
    const productos = db
      .prepare("SELECT * FROM productos ORDER BY id DESC")
      .all();

    // 🟢 OPTIMIZACIÓN: Estructuramos la respuesta de forma híbrida
    // Mapeamos el booleano y devolvemos la url tanto en string como metida en un array
    const productosFormateados = productos.map((p) => ({
      ...p,
      destacado: p.destacado === 1,
      imagenes: p.imagen_url ? [p.imagen_url] : [], // ✨ Compatibilidad automática con tu frontend actual
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
    url_manual, // 🆕 Campo opcional por si pegan un enlace directo en texto
  } = req.body;

  if (!nombre || cantidad === undefined) {
    return res
      .status(400)
      .json({ error: "El nombre y la cantidad son obligatorios." });
  }

  try {
    const stockCantidad = Number(cantidad);
    const estadoFinal =
      estado || (stockCantidad > 0 ? "disponible" : "no disponible");
    const esDestacado =
      destacado === "true" || destacado === true || destacado === 1 ? 1 : 0;
    const itemSku = sku || `SKU-${Date.now()}`;

    // 🟢 LÓGICA MULTIMEDIA INTELIGENTE PARA CREACIÓN
    let urlImagenFinal = null;

    if (req.file) {
      // Caso A: El usuario arrastró/subió un archivo real binario
      urlImagenFinal = `http://localhost:4000/uploads/${req.file.filename}`;
    } else if (url_manual && url_manual.trim() !== "") {
      // Caso B: El usuario pegó una dirección web externa en el input de URL
      urlImagenFinal = url_manual.trim();
    } else if (req.body.imagenes) {
      // Caso C: Fallback por si el front sigue enviando el campo antiguo
      const imgs = req.body.imagenes;
      urlImagenFinal =
        Array.isArray(imgs) && imgs.length > 0
          ? imgs[0]
          : typeof imgs === "string"
            ? imgs
            : null;
    }

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
      urlImagenFinal,
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

// Actualizar un producto existente de forma parcial (Lógica híbrida)
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
    url_manual,
  } = req.body;

  try {
    // 1. Obtener el producto de referencia actual
    const productoActual = db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(id);

    if (!productoActual) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // 2. Determinar cantidad y estado de manera cruzada
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

    // 3. Formatear booleanos
    const esDestacado =
      destacado !== undefined
        ? destacado === "true" || destacado === true || destacado === 1
          ? 1
          : 0
        : productoActual.destacado;

    // 4. 🟢 LÓGICA MULTIMEDIA INTELIGENTE PARA ACTUALIZACIÓN
    let urlImagenFinal = productoActual.imagen_url; // Por defecto mantenemos la que ya está

    if (req.file) {
      // Si subieron un archivo nuevo, pisamos la anterior
      urlImagenFinal = `http://localhost:4000/uploads/${req.file.filename}`;
    } else if (url_manual !== undefined) {
      // Si mutaron el input de texto (incluso si lo vaciaron)
      urlImagenFinal =
        url_manual && url_manual.trim() !== "" ? url_manual.trim() : null;
    } else if (req.body.imagenes !== undefined) {
      const imgs = req.body.imagenes;
      urlImagenFinal =
        Array.isArray(imgs) && imgs.length > 0
          ? imgs[0]
          : typeof imgs === "string"
            ? imgs
            : null;
    }

    // 5. Variables de asignación directa
    const nuevoNombre = nombre !== undefined ? nombre : productoActual.nombre;
    const nuevaCategoria =
      categoria !== undefined
        ? categoria
          ? categoria.trim().toLowerCase()
          : "sin-categoria"
        : productoActual.categoria;
    const nuevaMarca = marca !== undefined ? marca : productoActual.marca;
    const nuevaPresentacion =
      presentacion !== undefined ? presentacion : productoActual.presentacion;
    const nuevoSku = sku !== undefined ? sku : productoActual.sku;
    const nuevaDescripcion =
      descripcion !== undefined ? descripcion : productoActual.descripcion;
    const nuevaProteina =
      proteina !== undefined ? proteina : productoActual.proteina;
    const nuevaHumedad =
      humedad !== undefined ? humedad : productoActual.humedad;

    const stmt = db.prepare(`
      UPDATE productos SET
        nombre = ?,
        cantidad = ?,
        estado = ?,
        categoria = ?,
        marca = ?,
        presentacion = ?,
        sku = ?,
        descripcion = ?,
        destacado = ?,
        proteina = ?,
        humedad = ?,
        imagen_url = ?
      WHERE id = ?
    `);

    stmt.run(
      nuevoNombre,
      nuevaCantidad,
      nuevoEstado,
      nuevaCategoria,
      nuevaMarca,
      nuevaPresentacion,
      nuevoSku,
      nuevaDescripcion,
      esDestacado,
      nuevaProteina,
      nuevaHumedad,
      urlImagenFinal,
      id,
    );

    res.json({ mensaje: "Producto actualizado con éxito en SQLite" });
  } catch (error) {
    console.error("❌ Error al actualizar producto en SQLite:", error);
    if (error.message.includes("UNIQUE constraint failed: productos.sku")) {
      return res
        .status(400)
        .json({
          error: "El SKU ya se encuentra registrado por otro producto.",
        });
    }
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
    res.status(500).json({
      error:
        "No se puede eliminar el producto (puede estar asociado a un pedido activo).",
    });
  }
};
