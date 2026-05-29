import { useState } from "react";
import { API_BASE_URL } from "@config/api";

const INITIAL_FORM_STATE = {
  nombreEmpresa: "",
  nit: "", // Tax identity number (RUT / NIT / Corporate Identifier)
  email: "",
  telefono: "",
  pais: "Colombia",
  ciudad: "",
  sectorComercial: "",
  comentarios: "",
};

export const useClientRegister = () => {
  const [formulario, setFormulario] = useState(INITIAL_FORM_STATE);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // Updates form field state variables dynamically
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simplistic frontend validation rule verification layer
  const validarFormulario = () => {
    if (!formulario.nombreEmpresa.trim())
      return "La razón social o nombre de la empresa es requerido.";
    if (!formulario.nit.trim())
      return "El número de identificación fiscal (NIT/RUT) es obligatorio.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formulario.email))
      return "Por favor introduce un correo corporativo válido.";
    if (!formulario.telefono.trim())
      return "Un número telefónico de contacto es obligatorio.";

    return null;
  };

  // Submits payload configuration to the server instances
  const enviarRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE_URL}/clientes/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formulario,
          estado: "Pendiente", // Enters admin panel audit layout automatically
          fechaSolicitud: new Date().toISOString(),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error ||
            "Ocurrió un error inesperado durante el procesamiento del registro.",
        );
      }

      setRegistroExitoso(true);
      setFormulario(INITIAL_FORM_STATE); // Wipes configuration state clean
    } catch (err) {
      console.error("❌ Error en useClientRegister:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return {
    formulario,
    cargando,
    error,
    registroExitoso,
    manejarCambio,
    enviarRegistro,
  };
};
