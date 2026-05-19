// frontend/src/services/productService.js
import { API_BASE_URL } from "./config";

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

// 2. Crear un nuevo producto (Solo Admin)
export const crearProducto = async (productoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoData), // Recibe { nombre, cantidad }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al crear producto");
    return data;
  } catch (error) {
    console.error("Error en productService (crear):", error);
    throw error;
  }
};

// 3. Actualizar un producto existente (Solo Admin)
export const actualizarProducto = async (id, camposAActualizar) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camposAActualizar), // Puede recibir { nombre, cantidad, estado }
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
