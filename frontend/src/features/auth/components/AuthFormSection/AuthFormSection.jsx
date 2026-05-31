// src/features/auth/components/AuthFormSection.jsx
import { Link } from "react-router-dom";

const LOGO_SRC = "/assets/images/png logo disnal.png";

export const AuthFormSection = ({
  credenciales,
  handleInputChange,
  error,
  cargando,
  handleSubmit,
  tituloInput,
  placeholderInput,
  nameInput,
}) => {
  return (
    <div className="w-full max-w-md p-2">
      {/* Eliminadas las variantes dark: de la tarjeta */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-300">
        {/* Card Header */}
        <div className="bg-white p-6 text-center border-b border-gray-300">
          <img
            src={LOGO_SRC}
            alt="Disnal AU"
            className="mx-auto h-16 w-auto object-contain"
          />
          <p className="mt-2 text-sm font-bold tracking-wide text-gray-800">
            Distribuidora Nacional de Alimentos
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Enlace volver */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors mb-5"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Cambiar tipo de acceso
          </Link>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Input Dinámico */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5"
                htmlFor="dynamic-input"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {tituloInput}
              </label>
              <input
                id="dynamic-input"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 disabled:opacity-50"
                type={nameInput === "correo" ? "email" : "text"}
                name={nameInput}
                placeholder={placeholderInput}
                value={credenciales[nameInput] || ""}
                onChange={handleInputChange}
                disabled={cargando}
                autoComplete={nameInput === "correo" ? "email" : "username"}
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5"
                htmlFor="login-contrasena"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Contraseña
              </label>
              <input
                id="login-contrasena"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 disabled:opacity-50"
                type="password"
                name="contrasena"
                placeholder="••••••••"
                value={credenciales.contrasena || ""}
                onChange={handleInputChange}
                disabled={cargando}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 shadow-md shadow-red-600/10"
              disabled={cargando}
            >
              {cargando ? "Verificando..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Footer Informativo */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
            <p>Acceso exclusivo para usuarios autorizados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
