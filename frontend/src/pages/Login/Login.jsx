// src/pages/Login.jsx
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="w-full max-w-md p-4 text-center bg-white text-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Bienvenido a Disnal
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Por favor selecciona tu tipo de cuenta para continuar
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Enlace Cliente */}
        <Link
          to="/login-cliente"
          className="group relative flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-red-500 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Portal de Clientes</h3>
            <p className="text-xs text-gray-500">
              Pedidos, facturas comerciales y catálogo completo.
            </p>
          </div>
        </Link>

        {/* Enlace Admin */}
        <Link
          to="/admin/login"
          className="group relative flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-red-500 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors group-hover:bg-zinc-800 group-hover:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Acceso Administrativo</h3>
            <p className="text-xs text-gray-500">
              Control logístico y configuración del sistema.
            </p>
          </div>
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        ¿No tienes cuenta corporativa?{" "}
        <Link
          to="/signup"
          className="font-semibold text-red-600 hover:underline"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};
