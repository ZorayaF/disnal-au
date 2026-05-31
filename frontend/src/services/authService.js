// frontend/src/services/authService.js
import { API_BASE_URL } from "@config/api";

export const loginAdmin = async (usuario, contrasena) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, contrasena }),
    });

    //  Validación defensiva: Verificamos si la respuesta es realmente un JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "El servidor no devolvió un JSON válido. Verifica las rutas del backend.",
      );
    }

    const data = await response.json();

    if (!response.ok) {
      // Si el servidor responde con error (401, 404, etc.), lanzamos el mensaje
      throw new Error(data.error || "Error al iniciar sesión");
    }

    return data; // Devuelve el objeto con el token y los datos del usuario
  } catch (error) {
    console.error("Error en authService:", error.message);
    throw error;
  }
};
