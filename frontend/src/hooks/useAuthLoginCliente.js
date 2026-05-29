// src/hooks/useAuthLoginCliente.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext"; // 🟢 Importamos tu contexto de autenticación global

export const useAuthLoginCliente = () => {
  const { loginGlobal } = useContext(AuthContext); // 🟢 Extraemos la función centralizada de login
  const [credenciales, setCredenciales] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 🟢 Corrección: Cambiado setFormData por setCredenciales para que coincida con el estado real
    setCredenciales((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:4000/api/clientes/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: credenciales.correo,
            password: credenciales.contrasena, // El backend espera 'password'
          }),
        },
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "Error al iniciar sesión corporativa");
      }

      // 🟢 Pasamos la respuesta del servidor al adaptador inteligente de tu contexto original
      loginGlobal(data);

      alert(`¡Bienvenido al portal, ${data.cliente.nombre_empresa}!`);
      navigate("/"); // Redirige al catálogo o inicio
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { credenciales, handleInputChange, error, cargando, handleSubmit };
};
