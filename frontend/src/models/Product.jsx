// src/models/Product.js

export const DEFAULT_PRODUCT_STATE = {
  nombre: "",
  cantidad: "",
  imagenes: [],
  imagen_url: "",
  estado: "disponible",
  categoria: "",
  marca: "",
  presentacion: "",
  sku: "",
  descripcion: "",
  destacado: false,
  detallesTecnicos: {},
};

// Función de fábrica para limpiar y asegurar la estructura de datos
export const crearEstructuraProducto = (datos = {}) => {
  // Si los datos vienen de SQLite, vendrán como 'imagen_url' (string).
  // Lo convertimos en el array 'imagenes' que espera tu ImageManager.jsx
  let listaImagenes = datos.imagenes || [];

  if (datos.imagen_url && (!datos.imagenes || datos.imagenes.length === 0)) {
    listaImagenes = [datos.imagen_url];
  }

  return {
    ...DEFAULT_PRODUCT_STATE,
    ...datos,

    // Mapeamos de forma segura ambas propiedades para que convivan en el frontend
    imagenes: Array.isArray(listaImagenes) ? listaImagenes : [listaImagenes],
    imagen_url:
      datos.imagen_url ||
      (Array.isArray(datos.imagenes) && datos.imagenes.length > 0
        ? datos.imagenes[0]
        : ""),

    // Aseguramos conversión de tipos correctos
    cantidad:
      datos.cantidad !== undefined && datos.cantidad !== ""
        ? Number(datos.cantidad)
        : "",
    destacado:
      datos.destacado === "true" ||
      datos.destacado === true ||
      datos.destacado === 1,
  };
};
