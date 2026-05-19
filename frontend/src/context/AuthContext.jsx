// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

// Crear el contexto nativo de React
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializar el estado buscando si ya existe una sesión guardada en el navegador
  const [token, setToken] = useState(() => {
    return localStorage.getItem("disnal_token") || null;
  });

  const [usuario, setUsuario] = useState(() => {
    const userStored = localStorage.getItem("disnal_user");
    return userStored ? JSON.parse(userStored) : null;
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Verificar si los datos locales son válidos al arrancar la app
    if (token) {
      localStorage.setItem("disnal_token", token);
      localStorage.setItem("disnal_user", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("disnal_token");
      localStorage.removeItem("disnal_user");
    }
    setCargando(false);
  }, [token, usuario]);

  // Función para iniciar sesión globalmente tras la respuesta exitosa del backend
  const loginGlobal = (dataAuth) => {
    setToken(dataAuth.token);
    setUsuario(dataAuth.user);
  };

  // Función para limpiar la sesión (Logout)
  const logoutGlobal = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("disnal_token");
    localStorage.removeItem("disnal_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        cargando,
        loginGlobal,
        logoutGlobal,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
