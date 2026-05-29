// src/sections/AuthFormSection.jsx
import { Link } from "react-router-dom";
import "./Login.css"; // Mantenemos tu CSS intacto

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
    <div className="login-page">
      <div className="login-card">
        {/* ── Header rojo con logo ── */}
        <div className="login-card__header">
          <img src={LOGO_SRC} alt="Disnal AU" className="login-card__logo" />
          <p className="login-card__subtitle">
            Distribuidora Nacional de Alimentos
          </p>
        </div>

        {/* ── Cuerpo oscuro ── */}
        <div className="login-card__body">
          {/* Error */}
          {error && (
            <div className="login-card__error">
              <svg
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
              {error}
            </div>
          )}

          {/* Botón volver */}
          <Link to="/" className="login-back-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 14, height: 14 }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver al inicio
          </Link>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Campo Dinámico: Usuario o Correo */}
            <div className="login-field">
              <label className="login-field__label" htmlFor="login-dinamico">
                <svg
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
                {tituloInput}
              </label>
              <div className="login-field__input-wrap">
                <svg
                  className="login-field__input-icon"
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
                <input
                  id="login-dinamico"
                  className="login-field__input"
                  type="text"
                  name={nameInput} // Cambia entre 'usuario' o 'correo'
                  placeholder={placeholderInput}
                  value={credenciales[nameInput] || ""}
                  onChange={handleInputChange}
                  disabled={cargando}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Campo Fijo: Contraseña */}
            <div className="login-field">
              <label className="login-field__label" htmlFor="login-contrasena">
                <svg
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
                Contraseña
              </label>
              <div className="login-field__input-wrap">
                <svg
                  className="login-field__input-icon"
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
                <input
                  id="login-contrasena"
                  className="login-field__input"
                  type="password"
                  name="contrasena"
                  placeholder="••••••••"
                  value={credenciales.contrasena}
                  onChange={handleInputChange}
                  disabled={cargando}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-card__submit"
              disabled={cargando}
            >
              <svg
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
            </button>
          </form>

          {/* Footer */}
          <div className="login-card__footer">
            <svg
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
