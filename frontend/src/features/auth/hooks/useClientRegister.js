import { useState } from "react";
import { API_BASE_URL } from "@config/api";

const INITIAL_FORM_STATE = {
  nombre_empresa: "",
  nit_ruc: "",
  correo: "",
  password: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  nitFile: null,
};

export const useClientRegister = () => {
  const [formulario, setFormulario] = useState(INITIAL_FORM_STATE);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // Manejador dinámico inteligente (Soporta Inputs de texto e inputs de Archivos)
  const manejarCambio = (e) => {
    const { name, value, files } = e.target;

    setFormulario((prev) => ({
      ...prev,
      // Si el input es de tipo file, guardamos el archivo binario, si no, el valor de texto
      [name]: files ? files[0] : value,
    }));
  };

  // Validación en Frontend antes de disparar la red
  const validarFormulario = () => {
    if (!formulario.nombre_empresa.trim())
      return "La razón social o nombre de la empresa es requerido.";
    if (!formulario.nit_ruc.trim())
      return "El número de identificación fiscal (NIT/RUC) es obligatorio.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formulario.correo))
      return "Por favor introduce un correo corporativo válido.";

    if (!formulario.password || formulario.password.length < 4)
      return "La contraseña es obligatoria y debe tener un largo válido.";

    if (!formulario.telefono.trim())
      return "Un número telefónico de contacto es obligatorio.";

    if (!formulario.nitFile)
      return "Debe adjuntar obligatoriamente el documento digital de su NIT o RUC corporativo.";

    return null;
  };

  // Envío relacional mediante Multipart Form-Data hacia Express
  const enviarRegistro = async (e) => {
    if (e) e.preventDefault();
    setError(null);

    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setCargando(true);
    try {
      //  1. Construcción del contenedor FormData (Multer-ready)
      const datosFormulario = new FormData();
      datosFormulario.append("nit_ruc", formulario.nit_ruc);
      datosFormulario.append("nombre_empresa", formulario.nombre_empresa);
      datosFormulario.append("correo", formulario.correo);
      datosFormulario.append("password", formulario.password);
      datosFormulario.append("telefono", formulario.telefono);
      datosFormulario.append("direccion", formulario.direccion);
      datosFormulario.append("ciudad", formulario.ciudad);

      // El nombre del campo "nit" debe coincidir EXACTAMENTE con tu routes: upload.single("nit")
      datosFormulario.append("nit", formulario.nitFile);

      //  2. Fetch ajustado con el prefijo real de tu server.js y SIN headers manuales
      const respuesta = await fetch(`${API_BASE_URL}/clientes/auth/registrar`, {
        method: "POST",
        body: datosFormulario, // El navegador inyecta el boundary 'multipart/form-data' automáticamente
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error ||
            "Ocurrió un error inesperado durante el procesamiento del registro.",
        );
      }

      setRegistroExitoso(true);
      setFormulario(INITIAL_FORM_STATE); // Limpiamos el buffer del formulario
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
