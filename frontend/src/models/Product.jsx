// src/models/Product.js

export const DEFAULT_PRODUCT_STATE = {
  nombre: "",
  cantidad: "",
  imagenes: [],
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
  return {
    ...DEFAULT_PRODUCT_STATE,
    ...datos,
    // Aseguramos conversión de tipos correctos
    cantidad:
      datos.cantidad !== undefined && datos.cantidad !== ""
        ? Number(datos.cantidad)
        : "",
    destacado: datos.destacado === "true" || datos.destacado === true,
  };
};
