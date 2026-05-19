// backend/controllers/productController.js
import { leerDB, escribirDB } from "../data/database.js";

export const obtenerProductos = (req, res) => {
  const db = leerDB();
  res.json(db.productos);
};

export const crearProducto = (req, res) => {
  // 1. Recibimos 'imagenes' desde el cuerpo de la petición
  const { nombre, cantidad, imagenes } = req.body;

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
    estado: Number(cantidad) > 0 ? "disponible" : "no disponible",
    // 2. Si no envían imágenes, guardamos un array vacío por defecto para evitar romper el frontend
    imagenes: Array.isArray(imagenes) ? imagenes : [],
  };

  db.productos.push(nuevoProducto);
  escribirDB(db);

  res
    .status(201)
    .json({ mensaje: "Producto creado con éxito", producto: nuevoProducto });
};

export const actualizarProducto = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, cantidad, estado, imagenes } = req.body; // 1. Añadir imagenes al body

  const db = leerDB();
  const index = db.productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  if (nombre !== undefined) db.productos[index].nombre = nombre;
  if (imagenes !== undefined) db.productos[index].imagenes = imagenes; // 2. Actualizar galería

  if (cantidad !== undefined) {
    db.productos[index].cantidad = Number(cantidad);
    db.productos[index].estado =
      Number(cantidad) > 0 ? "disponible" : "no disponible";
  }
  if (estado !== undefined && cantidad === undefined)
    db.productos[index].estado = estado;

  escribirDB(db);
  res.json({
    mensaje: "Producto actualizado con éxito",
    producto: db.productos[index],
  });
};

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
