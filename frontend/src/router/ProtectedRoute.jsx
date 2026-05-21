// src/components/router/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/AuthContext"; // Ajusta las subcarpetas según tu árbol real

export const ProtectedRoute = () => {
  const { isAuthenticated, cargando } = useContext(AuthContext);

  // Muestra un estado de carga plano para validar si el contexto se queda atascado aquí
  if (cargando) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Cargando sistema de seguridad...</p>
      </div>
    );
  }

  // Si no está autenticado, lo rebota al login de forma limpia
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, da paso al panel de administración
  return <Outlet />;
};
