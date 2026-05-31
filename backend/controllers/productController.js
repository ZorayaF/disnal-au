import db from "../config/db.js";

// 1. Obtener todos los productos desde la base de datos SQLite
export const obtenerProductos = (req, res) => {
  try {
    const productos = db
      .prepare("SELECT * FROM productos ORDER BY id DESC")
      .all();

    // Estructuramos la respuesta de forma híbrida
    const productosFormateados = productos.map((p) => {
      // Parseamos la cadena de texto JSON que viene de la columna detalles_tecnicos
      let detalles = {};
      try {
        detalles = p.detalles_tecnicos ? JSON.parse(p.detalles_tecnicos) : {};
      } catch (e) {
        console.error(
          "Error parseando detalles_tecnicos del producto ID:",
          p.id,
        );
      }

      return {
        ...p,
        destacado: p.destacado === 1,
        imagenes: p.imagen_url ? [p.imagen_url] : [], // Compatibilidad automática con tu frontend actual
        detallesTecnicos: detalles, // El frontend recibe su objeto limpio y dinámico
      };
    });

    res.json({ productos: productosFormateados });
  } catch (error) {
    console.error("❌ Error al obtener productos de SQLite:", error);
    res.status(500).json({ error: "Error interno al recuperar el catálogo." });
  }
};

// 2. Crear un nuevo producto en la tabla relacional
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
    url_manual,
    detallesTecnicos, // Capturamos el mapa dinámico de claves-valores
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

    // LÓGICA MULTIMEDIA INTELIGENTE PARA CREACIÓN
    let urlImagenFinal = null;

    if (req.file) {
      urlImagenFinal = `http://localhost:4000/uploads/${req.file.filename}`;
    } else if (url_manual && url_manual.trim() !== "") {
      urlImagenFinal = url_manual.trim();
    } else if (req.body.imagenes) {
      const imgs = req.body.imagenes;
      urlImagenFinal =
        Array.isArray(imgs) && imgs.length > 0
          ? imgs[0]
          : typeof imgs === "string"
            ? imgs
            : null;
    }

    // SERIALIZACIÓN: Convertimos el objeto que venga del front a texto plano para SQLite
    const stringDetalles =
      typeof detallesTecnicos === "string"
        ? detallesTecnicos
        : JSON.stringify(detallesTecnicos || {});

    const stmt = db.prepare(`
      INSERT INTO productos (
        nombre, estado, cantidad, categoria, marca, 
        presentacion, sku, descripcion, destacado, imagen_url, detalles_tecnicos
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      urlImagenFinal,
      stringDetalles,
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

// 3. Actualizar un producto existente de forma parcial (Lógica híbrida)
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
    url_manual,
    detallesTecnicos,
  } = req.body;

  try {
    // Obtener el producto de referencia actual
    const productoActual = db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(id);

    if (!productoActual) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Determinar cantidad y estado de manera cruzada
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

    // Formatear booleanos
    const esDestacado =
      destacado !== undefined
        ? destacado === "true" || destacado === true || destacado === 1
          ? 1
          : 0
        : productoActual.destacado;

    // LÓGICA MULTIMEDIA INTELIGENTE PARA ACTUALIZACIÓN
    let urlImagenFinal = productoActual.imagen_url;

    if (req.file) {
      urlImagenFinal = `http://localhost:4000/uploads/${req.file.filename}`;
    } else if (url_manual !== undefined) {
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

    // MANEJO DE SERIALIZACIÓN DINÁMICA DE ATRIBUTOS
    let stringDetalles = productoActual.detalles_tecnicos;
    if (detallesTecnicos !== undefined) {
      stringDetalles =
        typeof detallesTecnicos === "string"
          ? detallesTecnicos
          : JSON.stringify(detallesTecnicos || {});
    }

    // Variables de asignación directa o coalescencia manual
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
        imagen_url = ?,
        detalles_tecnicos = ?
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
      urlImagenFinal,
      stringDetalles,
      id,
    );

    res.json({ mensaje: "Producto actualizado con éxito en SQLite" });
  } catch (error) {
    console.error("❌ Error al actualizar producto en SQLite:", error);
    if (error.message.includes("UNIQUE constraint failed: productos.sku")) {
      return res.status(400).json({
        error: "El SKU ya se encuentra registrado por otro producto.",
      });
    }
    res
      .status(500)
      .json({ error: "Error al actualizar el producto en la base de datos." });
  }
};

// 4. Eliminar producto por ID
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
