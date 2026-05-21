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
    // 1. Guardamos de inmediato en el almacenamiento físico
    localStorage.setItem("disnal_token", dataAuth.token);
    localStorage.setItem("disnal_user", JSON.stringify(dataAuth.user));

    // 2. Modificamos el estado para notificar a la aplicacion de forma limpia
    setToken(dataAuth.token);
    setUsuario(dataAuth.user);
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
