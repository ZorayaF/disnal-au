// src/hooks/useAuthLogin.js
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";
import { loginAdmin } from "@services/authService"; // Asegúrate de que este servicio apunte al nuevo endpoint de Express

const CREDENCIALES_INICIALES = {
  usuario: "",
  contrasena: "",
};

export const useAuthLogin = () => {
  const { loginGlobal, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Agrupamos los campos en un objeto para seguir el mismo patrón estructurado
  const [credenciales, setCredenciales] = useState(CREDENCIALES_INICIALES);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 🛡️ Redirección automática si el administrador ya tiene una sesión activa
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 2. Manejador dinámico universal para los inputs de inicio de sesión
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredenciales((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const { usuario, contrasena } = credenciales;

    if (!usuario.trim() || !contrasena.trim()) {
      setError("Por favor, completa todos los campos.");
      setCargando(false);
      return;
    }

    try {
      // 🟢 Consumimos el servicio que consulta la tabla 'usuarios' con bcrypt en SQLite
      const data = await loginAdmin(usuario, contrasena);

      // 🟢 Pasamos la respuesta completa al adaptador de tu AuthContext
      loginGlobal(data);

      // Redirigimos al panel de administración relacional de forma segura
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return {
    credenciales,
    handleInputChange,
    error,
    cargando,
    handleSubmit,
  };
};
