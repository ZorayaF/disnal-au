// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializar estados de manera segura leyendo el disco una sola vez al arrancar
  const [token, setToken] = useState(() => {
    return localStorage.getItem("disnal_token") || null;
  });

  const [usuario, setUsuario] = useState(() => {
    const userStored = localStorage.getItem("disnal_user");
    return userStored ? JSON.parse(userStored) : null;
  });

  const [cargando, setCargando] = useState(true);

  // El useEffect ahora SOLO sirve para apagar la pantalla de carga inicial al montar el componente por primera vez
  useEffect(() => {
    setCargando(false);
  }, []);

  // Función para iniciar sesión de forma controlada
  const loginGlobal = (dataAuth) => {
    // 🎯 CORREGIDO: Mantenemos la normalización para el Navbar, pero anexamos de forma segura
    // la dirección, ciudad, teléfono y el nombre de empresa original.
    const datosNormalizados = dataAuth.user || {
      id: dataAuth.cliente.id,
      usuario: dataAuth.cliente.nombre_empresa,
      nombre_empresa: dataAuth.cliente.nombre_empresa, // 👈 Lo guardamos también con su llave original
      correo: dataAuth.cliente.correo,
      nit_ruc: dataAuth.cliente.nit_ruc,
      telefono: dataAuth.cliente.telefono || "", // 👈 Preservamos para el perfil
      direccion: dataAuth.cliente.direccion || "", // 👈 Preservamos para el perfil
      ciudad: dataAuth.cliente.ciudad || "", // 👈 Preservamos para el perfil
      rol: "cliente",
    };

    const tokenSeguro = dataAuth.token || "token-ficticio-b2b";

    localStorage.setItem("disnal_token", tokenSeguro);
    localStorage.setItem("disnal_user", JSON.stringify(datosNormalizados));

    setToken(tokenSeguro);
    setUsuario(datosNormalizados);
  };

  // Función para limpiar la sesión (Logout) de forma controlada
  const logoutGlobal = () => {
    // 1. Limpiamos el almacenamiento físico
    localStorage.removeItem("disnal_token");
    localStorage.removeItem("disnal_user");

    // 2. Reseteamos los estados del contexto
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        cargando,
        loginGlobal,
        logoutGlobal,
        isAuthenticated: !!token, // Retorna true si hay token, false si es null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
