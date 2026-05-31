import { API_BASE_URL } from "@config/api";

// 1. Obtener todos los productos (Para el catálogo y el administrador)
export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`);
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Error al obtener productos");
    return data;
  } catch (error) {
    console.error("Error en productService (obtener):", error);
    throw error;
  }
};

// 2. Crear un nuevo producto (Recibe un objeto FormData atómico)
export const crearProducto = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al crear producto");
    return data;
  } catch (error) {
    console.error("Error en productService (crear):", error);
    throw error;
  }
};

// 3. Actualizar un producto existente (Recibe un objeto FormData atómico)
export const actualizarProducto = async (id, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Error al actualizar producto");
    return data;
  } catch (error) {
    console.error("Error en productService (actualizar):", error);
    throw error;
  }
};

// 4. Eliminar un producto (Solo Admin)
export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Error al eliminar producto");
    return data;
  } catch (error) {
    console.error("Error en productService (eliminar):", error);
    throw error;
  }
};
