// src/hooks/useAuthLogin.js
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";
import { loginAdmin } from "@services/authService";

export const useAuthLogin = () => {
  const { loginGlobal, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    if (!usuario.trim() || !contrasena.trim()) {
      setError("Por favor, completa todos los campos.");
      setCargando(false);
      return;
    }

    try {
      const data = await loginAdmin(usuario, contrasena);
      loginGlobal(data);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    error,
    cargando,
    handleSubmit,
  };
};
