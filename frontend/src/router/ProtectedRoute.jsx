import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, usuario, cargando } = useContext(AuthContext);

  if (cargando) {
    return (
      <div className="w-full max-w-md mx-auto my-12 p-6 text-center bg-white rounded-xl flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>
        <p className="text-sm font-medium text-gray-500 font-sans">
          Verificando credenciales de acceso...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario?.rol)) {
    return usuario?.rol === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/mi-panel" replace />
    );
  }

  return <Outlet />;
};
