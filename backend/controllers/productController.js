// backend/controllers/productController.js
import { leerDB, escribirDB } from "../data/database.js";

// Obtener todos los productos (Sincronizado con la estructura del JSON)
export const obtenerProductos = (req, res) => {
  const db = leerDB();
  res.json({ productos: db.productos });
};

// Crear un nuevo producto con la taxonomía completa de Figma
export const crearProducto = (req, res) => {
  const {
    nombre,
    cantidad,
    imagenes,
    estado,
    categoria,
    marca,
    presentacion,
    sku,
    descripcion,
    destacado,
    detallesTecnicos,
  } = req.body;

  if (!nombre || cantidad === undefined) {
    return res
      .status(400)
      .json({ error: "El nombre y la cantidad son obligatorios." });
  }

  const db = leerDB();
  const nuevoId =
    db.productos.length > 0
      ? Math.max(...db.productos.map((p) => p.id)) + 1
      : 1;

  const nuevoProducto = {
    id: nuevoId,
    nombre,
    cantidad: Number(cantidad),
    estado: estado || (Number(cantidad) > 0 ? "disponible" : "no disponible"),
    categoria: categoria ? categoria.trim().toLowerCase() : "sin-categoria",
    marca: marca || "Genérico",
    presentacion: presentacion || "Unidad",
    sku: sku || `SKU-${nuevoId}`,
    descripcion: descripcion || "",
    destacado: destacado === "true" || destacado === true,
    detallesTecnicos: detallesTecnicos || {},
    imagenes: Array.isArray(imagenes) ? imagenes : [],
  };

  db.productos.push(nuevoProducto);
  escribirDB(db);

  res
    .status(201)
    .json({ mensaje: "Producto creado con éxito", producto: nuevoProducto });
};

// Actualizar un producto existente (Soporta edición parcial de campos nuevos)
export const actualizarProducto = (req, res) => {
  const id = Number(req.params.id);
  const {
    nombre,
    cantidad,
    estado,
    imagenes,
    categoria,
    marca,
    presentacion,
    sku,
    descripcion,
    destacado,
    detallesTecnicos,
  } = req.body;

  const db = leerDB();
  const index = db.productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  // 1. Actualizar textos, multimedia y atributos nuevos si vienen en la petición
  if (nombre !== undefined) db.productos[index].nombre = nombre;
  if (imagenes !== undefined) db.productos[index].imagenes = imagenes;
  if (marca !== undefined) db.productos[index].marca = marca;
  if (presentacion !== undefined)
    db.productos[index].presentacion = presentacion;
  if (sku !== undefined) db.productos[index].sku = sku;
  if (descripcion !== undefined) db.productos[index].descripcion = descripcion;
  if (detallesTecnicos !== undefined)
    db.productos[index].detallesTecnicos = detallesTecnicos;

  if (categoria !== undefined) {
    db.productos[index].categoria = categoria
      ? categoria.trim().toLowerCase()
      : "sin-categoria";
  }

  if (destacado !== undefined) {
    db.productos[index].destacado = destacado === "true" || destacado === true;
  }

  // 2. Actualizar cantidad numérica de forma segura
  if (cantidad !== undefined) {
    db.productos[index].cantidad = Number(cantidad);
  }

  // 3. Lógica Cruzada de Estado y Disponibilidad
  if (estado !== undefined) {
    if (estado === "no disponible") {
      db.productos[index].estado = "no disponible";
    } else {
      const stockActual =
        cantidad !== undefined
          ? Number(cantidad)
          : db.productos[index].cantidad;
      db.productos[index].estado =
        stockActual > 0 ? "disponible" : "no disponible";
    }
  } else if (cantidad !== undefined) {
    db.productos[index].estado =
      Number(cantidad) > 0 ? "disponible" : "no disponible";
  }

  // 4. Persistir los cambios en el archivo JSON
  escribirDB(db);

  res.json({
    mensaje: "Producto actualizado con éxito",
    producto: db.productos[index],
  });
};

// Eliminar producto
export const eliminarProducto = (req, res) => {
  const id = Number(req.params.id);

  const db = leerDB();
  const existe = db.productos.some((p) => p.id === id);

  if (!existe) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  db.productos = db.productos.filter((p) => p.id !== id);
  escribirDB(db);

  res.json({ mensaje: "Producto eliminado con éxito", id });
};
