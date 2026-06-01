import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import { AuthContext } from "@context/AuthContext";
import "./Navbar.css";

const LOGO_SRC = "/assets/images/logo disnal.png";

export const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const {
    usuario,
    isAuthenticated,
    logoutGlobal: cerrarSesion,
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const esZonaAdmin = location.pathname.startsWith("/admin");

  const navItems = [
    { label: "Inicio", to: "/", end: true },
    { label: "Catálogo", to: "/catalog" },

    // 🎯 CORREGIDO: Cambiamos 'cliente' por 'client' para hacer match con el AuthContext
    ...(isAuthenticated && usuario?.rol === "client"
      ? [
          { label: "Cotización", to: "/cart", isCart: true },
          { label: "Mi Panel B2B", to: "/mi-panel" },
        ]
      : []),

    ...(isAuthenticated && usuario?.rol === "admin"
      ? [{ label: "Panel Administración", to: "/admin" }]
      : []),

    { label: "Asesoría", to: "/consulting" },
    { label: "Legal", to: "/legal" },
  ];

  return (
    <header className="main-navbar" role="banner">
      {/* Logo — columna 1 */}
      <NavLink
        className="main-navbar__brand"
        to="/"
        onClick={() => setIsOpen(false)}
        aria-label="Ir al inicio de Disnal"
      >
        <img src={LOGO_SRC} alt="Disnal" />
      </NavLink>

      {/* Links de navegación — columna 2 */}
      <nav
        id="main-nav"
        className={`main-navbar__nav ${isOpen ? "is-open" : ""}`}
        aria-label="Navegación principal"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `main-navbar__link ${isActive ? "active" : ""}`
            }
          >
            <span>{item.label}</span>
            {item.isCart && totalItems > 0 && (
              <strong
                className="main-navbar__cart-badge"
                aria-label={`${totalItems} productos en cotización`}
              >
                {totalItems}
              </strong>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── CTA columna 3 ── */}
      <div className="main-navbar__actions">
        {isAuthenticated && usuario ? (
          <>
            {/* Botón perfil/empresa */}
            <NavLink
              to={
                usuario.rol === "admin" || esZonaAdmin ? "/admin" : "/mi-panel"
              }
              onClick={() => setIsOpen(false)}
              className={`main-navbar__cta ${
                usuario.rol === "admin" || esZonaAdmin
                  ? ""
                  : "main-navbar__cta--profile"
              }`}
              aria-label={`Ver panel de ${usuario.usuario}`}
              style={
                usuario.rol === "admin" || esZonaAdmin
                  ? { background: "#1e293b", borderColor: "#1e293b" }
                  : {}
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-3.5 h-3.5 shrink-0"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="font-semibold whitespace-nowrap">
                {usuario.nombre_empresa || usuario.usuario || "Usuario B2B"}
              </span>
            </NavLink>

            {/* Botón cerrar sesión */}
            <button
              onClick={() => {
                cerrarSesion();
                setIsOpen(false);
              }}
              className="main-navbar__cta main-navbar__cta--logout"
              aria-label="Cerrar sesión"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-3.5 h-3.5 shrink-0"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </>
        ) : (
          /* Guest — Iniciar sesión */
          <NavLink
            className="main-navbar__cta"
            to={esZonaAdmin ? "/admin/login" : "/login-cliente"}
            onClick={() => setIsOpen(false)}
            aria-label="Iniciar Sesión"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-3.5 h-3.5 shrink-0"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>Iniciar Sesión</span>
          </NavLink>
        )}
      </div>

      {/* Hamburger */}
      <button
        className="main-navbar__toggle"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="main-nav"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};
