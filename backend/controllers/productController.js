// src/controllers/productos.controller.js (o tu ruta correspondiente)
import db from "../config/db.js";

// 1. Obtener todos los productos desde la base de datos SQLite
export const obtenerProductos = (req, res) => {
  try {
    const productos = db
      .prepare("SELECT * FROM productos ORDER BY id DESC")
      .all();

    const productosFormateados = productos.map((p) => {
      // Parseamos los detalles técnicos
      let detalles = {};
      try {
        detalles = p.detalles_tecnicos ? JSON.parse(p.detalles_tecnicos) : {};
      } catch (e) {
        console.error(
          "Error parseando detalles_tecnicos del producto ID:",
          p.id,
        );
      }

      // 🎯 CORREGIDO: Parseamos de forma segura el array de imágenes guardado como JSON texto
      let arrayImagenes = [];
      try {
        if (p.imagen_url) {
          // Si el texto empieza con "[" asumimos que es el array serializado JSON
          if (p.imagen_url.startsWith("[")) {
            arrayImagenes = JSON.parse(p.imagen_url);
          } else {
            // Retrocompatibilidad: si era una URL simple antigua, la metemos en un array
            arrayImagenes = [p.imagen_url];
          }
        }
      } catch (e) {
        console.error(
          "Error parseando el array de imágenes del producto ID:",
          p.id,
        );
        arrayImagenes = p.imagen_url ? [p.imagen_url] : [];
      }

      return {
        ...p,
        destacado: p.destacado === 1,
        imagenes: arrayImagenes, // 🎯 El frontend recibe ahora todas las imágenes intactas
        detallesTecnicos: detalles,
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
    detallesTecnicos,
    imagenes, // Capturamos el array completo enviado por el front
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

    // 🎯 LÓGICA MULTIMEDIA MULTI-IMAGEN CORREGIDA
    let imagenesA_Guardar = [];

    // 1. Si subieron un archivo físico por Multer, lo agregamos primero
    if (req.file) {
      imagenesA_Guardar.push(
        `http://localhost:4000/uploads/${req.file.filename}`,
      );
    }

    // 2. Si enviaron una URL manual en texto, la agregamos
    if (url_manual && url_manual.trim() !== "") {
      imagenesA_Guardar.push(url_manual.trim());
    }

    // 3. 🎯 PROCESAMIENTO SEGURO DEL ARRAY DE IMÁGENES DEL FORM DATA
    if (req.body.imagenes) {
      try {
        let imgsInput = req.body.imagenes;

        // Si viene como string (común en FormData), intentamos parsearlo
        if (typeof imgsInput === "string") {
          // Si parece un JSON válido, lo parseamos
          if (imgsInput.trim().startsWith("[")) {
            imgsInput = JSON.parse(imgsInput);
          } else {
            // Si es una sola URL de texto separada por comas u obtenida directamente
            imgsInput = imgsInput.split(",").map((i) => i.trim());
          }
        }

        if (Array.isArray(imgsInput)) {
          imagenesA_Guardar = [...imagenesA_Guardar, ...imgsInput];
        } else if (typeof imgsInput === "string" && imgsInput.trim() !== "") {
          imagenesA_Guardar.push(imgsInput.trim());
        }
      } catch (e) {
        console.error(
          "⚠️ Error limpiando el input de imágenes en la creación:",
          e,
        );
      }
    }

    // Limpiamos duplicados y elementos vacíos
    imagenesA_Guardar = [...new Set(imagenesA_Guardar)].filter(Boolean);

    // Ahora sí, lo convertimos en un JSON perfecto de texto plano para SQLite
    const stringImagenes = JSON.stringify(imagenesA_Guardar);

    // Serialización de detalles técnicos
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
      stringImagenes, // 🎯 Guardamos la cadena JSON del array de imágenes
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

// 3. Actualizar un producto existente de forma parcial
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
    imagenes, // Capturamos el array completo en la actualización
  } = req.body;

  try {
    const productoActual = db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(id);

    if (!productoActual) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

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

    const esDestacado =
      destacado !== undefined
        ? destacado === "true" || destacado === true || destacado === 1
          ? 1
          : 0
        : productoActual.destacado;

    // 🎯 LÓGICA MULTIMEDIA MULTI-IMAGEN CORREGIDA PARA ACTUALIZACIÓN
    let imagenesA_Guardar = [];

    // Intentamos recuperar las imágenes que ya tenía el producto originalmente
    try {
      if (productoActual.imagen_url) {
        if (productoActual.imagen_url.startsWith("[")) {
          imagenesA_Guardar = JSON.parse(productoActual.imagen_url);
        } else {
          imagenesA_Guardar = [productoActual.imagen_url];
        }
      }
    } catch (e) {
      imagenesA_Guardar = [];
    }

    // 1. Si se sube un nuevo archivo por Multer, lo anexamos a la colección
    if (req.file) {
      imagenesA_Guardar.push(
        `http://localhost:4000/uploads/${req.file.filename}`,
      );
    }

    // 2. Si mandaron URL manual, la anexamos
    if (
      url_manual !== undefined &&
      url_manual !== null &&
      url_manual.trim() !== ""
    ) {
      imagenesA_Guardar.push(url_manual.trim());
    }

    // 3. 🎯 PROCESAMIENTO SEGURO EN ACTUALIZACIÓN
    if (req.body.imagenes !== undefined && req.body.imagenes !== null) {
      try {
        let imgsInput = req.body.imagenes;

        if (typeof imgsInput === "string") {
          if (imgsInput.trim().startsWith("[")) {
            imgsInput = JSON.parse(imgsInput);
          } else {
            imgsInput = imgsInput.split(",").map((i) => i.trim());
          }
        }

        if (Array.isArray(imgsInput)) {
          // Reemplazamos la colección por las nuevas imágenes enviadas
          imagenesA_Guardar = imgsInput;
        } else if (typeof imgsInput === "string" && imgsInput.trim() !== "") {
          imagenesA_Guardar = [imgsInput.trim()];
        }
      } catch (e) {
        console.error(
          "⚠️ Error limpiando el input de imágenes en la actualización:",
          e,
        );
      }
    }

    // Limpiamos duplicados y vacíos
    imagenesA_Guardar = [...new Set(imagenesA_Guardar)].filter(Boolean);

    const stringImagenes = JSON.stringify(imagenesA_Guardar);

    // Manejo de especificaciones
    let stringDetalles = productoActual.detalles_tecnicos;
    if (detallesTecnicos !== undefined) {
      stringDetalles =
        typeof detallesTecnicos === "string"
          ? detallesTecnicos
          : JSON.stringify(detallesTecnicos || {});
    }

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
      stringImagenes, // 🎯 Guardamos el string JSON de todas las imágenes
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
