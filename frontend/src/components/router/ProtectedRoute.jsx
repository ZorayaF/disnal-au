// frontend/src/components/router/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, cargando } = useContext(AuthContext);

  // Mientras verifica el localStorage, mostramos una pantalla de carga limpia
  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <p className="font-sans text-text-body font-medium animate-pulse">
          Cargando sistema de seguridad...
        </p>
      </div>
    );
  }

  // Si no está autenticado, lo rebota al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, le permite el paso a las páginas hijas (Outlet)
  return <Outlet />;
};
