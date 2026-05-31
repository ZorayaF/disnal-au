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

export const crearEstructuraProducto = (datos = {}) => {
  let listaImagenes = datos.imagenes || [];

  if (datos.imagen_url && (!datos.imagenes || datos.imagenes.length === 0)) {
    listaImagenes = [datos.imagen_url];
  }

  return {
    ...DEFAULT_PRODUCT_STATE,
    ...datos,
    imagenes: Array.isArray(listaImagenes) ? listaImagenes : [listaImagenes],
    imagen_url:
      datos.imagen_url ||
      (Array.isArray(datos.imagenes) && datos.imagenes.length > 0
        ? datos.imagenes[0]
        : ""),

    detallesTecnicos:
      typeof datos.detallesTecnicos === "string"
        ? JSON.parse(datos.detallesTecnicos)
        : datos.detallesTecnicos || {},

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
