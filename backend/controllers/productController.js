// backend/controllers/productController.js
import { leerDB, escribirDB } from "../data/database.js";

export const obtenerProductos = (req, res) => {
  const db = leerDB();
  res.json(db.productos);
};

export const crearProducto = (req, res) => {
  const { nombre, cantidad, imagenes, estado } = req.body;

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
    // Ahora 'estado' sí está definido, por lo que esta validación funcionará a la perfección
    estado: estado || (Number(cantidad) > 0 ? "disponible" : "no disponible"),
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
  const { nombre, cantidad, estado, imagenes } = req.body;

  const db = leerDB();
  const index = db.productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  // 1. Actualizar textos y multimedia básicos si vienen en la petición
  if (nombre !== undefined) db.productos[index].nombre = nombre;
  if (imagenes !== undefined) db.productos[index].imagenes = imagenes;

  // 2. Actualizar cantidad numérica de forma segura
  if (cantidad !== undefined) {
    db.productos[index].cantidad = Number(cantidad);
  }

  // 3. Lógica Cruzada de Estado y Disponibilidad
  if (estado !== undefined) {
    // Si el administrador apaga el Toggle explicitamente, el producto pasa a estar inactivo
    if (estado === "no disponible") {
      db.productos[index].estado = "no disponible";
    } else {
      // Si el Toggle está encendido, el estado final dependerá de si realmente queda stock
      const stockActual =
        cantidad !== undefined
          ? Number(cantidad)
          : db.productos[index].cantidad;
      db.productos[index].estado =
        stockActual > 0 ? "disponible" : "no disponible";
    }
  } else if (cantidad !== undefined) {
    // Salvaguarda: Si el frontend solo envía la cantidad, calculamos el estado con base en el número
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
