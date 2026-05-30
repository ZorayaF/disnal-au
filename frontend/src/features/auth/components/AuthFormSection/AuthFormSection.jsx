// src/sections/AuthFormSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

const LOGO_SRC = "/assets/images/png logo disnal.png";

export const AuthFormSection = ({
  tituloInput,
  placeholderInput,
  nameInput,
  credenciales,
  handleInputChange,
  error,
  cargando,
  handleSubmit,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-disnal-dark p-4 font-sans select-none">
      <div className="w-full max-w-md bg-disnal-black rounded-lg overflow-hidden border border-disnal-line/10 shadow-disnal-deep">
        {/* ── Header rojo con logo ── */}
        <div className="bg-disnal-red p-6 text-center flex flex-col items-center justify-center gap-2">
          <img
            src={LOGO_SRC}
            alt="Disnal AU"
            className="h-14 w-auto object-contain drop-shadow-md"
          />
          <p className="text-white/90 text-xs font-black uppercase tracking-disnal">
            Distribuidora Nacional de Alimentos
          </p>
        </div>

        {/* ── Cuerpo oscuro ── */}
        <div className="p-6 space-y-6">
          {/* Alerta de Error */}
          {error && (
            <div
              className="flex items-center gap-2 bg-disnal-red/10 border-l-4 border-disnal-red p-3 rounded text-red-300 text-xs font-bold"
              role="alert"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Botón volver */}
          <Link
            to="/"
            className={`
              inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider 
              text-disnal-gray hover:text-white transition-colors
            `
              .trim()
              .replace(/\s+/g, " ")}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver al inicio
          </Link>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Campo Dinámico: Usuario o Correo (Mapeado a login oscuro administrativo) */}
            <InputField
              id="login-dinamico"
              type="text"
              name={nameInput}
              label={tituloInput}
              placeholder={placeholderInput}
              value={credenciales[nameInput] || ""}
              onChange={handleInputChange}
              disabled={cargando}
              autoComplete="username"
              theme="dark"
              required
              icon={
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {/* Campo Fijo: Contraseña */}
            <InputField
              id="login-contrasena"
              type="password"
              name="contrasena"
              label="Contraseña"
              placeholder="••••••••"
              value={credenciales.contrasena || ""}
              onChange={handleInputChange}
              disabled={cargando}
              autoComplete="current-password"
              theme="dark"
              required
              icon={
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
            />

            {/* Submit mediante botón maestro */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={cargando}
              className="w-full justify-center gap-2 mt-2"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {cargando ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* ── SECCIÓN: Redirección Alta de Clientes B2B ── */}
          <div className="mt-6 pt-5 border-t border-dashed border-white/10 text-center space-y-2">
            <p className="text-disnal-gray text-xs font-medium">
              ¿Su empresa aún no comercializa con nosotros?
            </p>
            <Link
              to="/signup"
              className={`
                inline-flex items-center justify-center gap-1.5 text-sm font-black 
                text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider
              `
                .trim()
                .replace(/\s+/g, " ")}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              Solicitar Alta Comercial B2B
            </Link>
          </div>

          {/* Footer Informativo Resguardado */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-disnal-gray/70 pt-2">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p>Acceso exclusivo para usuarios autorizados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
