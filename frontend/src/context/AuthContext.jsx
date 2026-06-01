import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("disnal_token") || null;
  });

  // Mantenemos tu estado "usuario" para no romper otras partes de la app
  const [usuario, setUsuario] = useState(() => {
    const userStored = localStorage.getItem("disnal_user");
    return userStored ? JSON.parse(userStored) : null;
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(false);
  }, []);

  {
    /* 🎯 MEJORA: Añadimos 'rolForzado' como segundo parámetro opcional */
  }
  const loginGlobal = (dataAuth, rolForzado = null) => {
    let datosNormalizados = {};

    if (rolForzado === "admin" || dataAuth.user?.rol === "admin") {
      // Estructura si es Administrador
      datosNormalizados = {
        id: dataAuth.user?.id || "admin-id",
        usuario: dataAuth.user?.username || dataAuth.user?.usuario || "Admin",
        rol: "admin",
      };
    } else {
      // Estructura si es Cliente (Tu lógica original intacta)
      datosNormalizados = dataAuth.user || {
        id: dataAuth.cliente.id,
        usuario: dataAuth.cliente.nombre_empresa,
        nombre_empresa: dataAuth.cliente.nombre_empresa,
        correo: dataAuth.cliente.correo,
        nit_ruc: dataAuth.cliente.nit_ruc,
        telefono: dataAuth.cliente.telefono || "",
        direccion: dataAuth.cliente.direccion || "",
        ciudad: dataAuth.cliente.ciudad || "",
        rol: "client", // 👈 Usamos 'client' para hacer match con el AppRouter
      };
    }

    const tokenSeguro = dataAuth.token || "token-ficticio-b2b";

    localStorage.setItem("disnal_token", tokenSeguro);
    localStorage.setItem("disnal_user", JSON.stringify(datosNormalizados));

    setToken(tokenSeguro);
    setUsuario(datosNormalizados);
  };

  const logoutGlobal = () => {
    localStorage.removeItem("disnal_token");
    localStorage.removeItem("disnal_user");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario, // 👈 Se expone "usuario"
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
