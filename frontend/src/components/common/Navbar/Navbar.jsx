import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import "./Navbar.css";

const LOGO_SRC = "/assets/images/logo disnal.png";

// Elementos base de navegación común
const BASE_NAV_ITEMS = [
  { label: "Inicio", to: "/", end: true },
  { label: "Catálogo", to: "/catalog" },
  { label: "Cotización", to: "/cart", isCart: true },
  { label: "Asesoría", to: "/consulting" },
  { label: "Legal", to: "/legal" },
];
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import { AuthContext } from "@context/AuthContext";
import "./Navbar.css";

const LOGO_SRC = "/assets/images/logo disnal.png";

export const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const { usuario, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Evaluamos si el usuario se encuentra explorando rutas del panel administrativo
  const esZonaAdmin = location.pathname.startsWith("/admin");

  // 📝 CONSTRUCCIÓN DECLARATIVA DEL MENÚ SEGÚN EL ROL REAL
  const navItems = [
    { label: "Inicio", to: "/", end: true },
    { label: "Catálogo", to: "/catalog" },

    // 🏢 RUTA EXCLUSIVA CLIENTE: Cotización y Panel de Compras B2B
    ...(isAuthenticated && usuario?.rol === "cliente"
      ? [
          { label: "Cotización", to: "/cart", isCart: true },
          { label: "Mi Panel B2B", to: "/mi-panel" },
        ]
      : []),

    // 🛠️ RUTA EXCLUSIVA ADMIN: Se activa dinámicamente si el rol es 'admin'
    ...(isAuthenticated && usuario?.rol === "admin"
      ? [{ label: "Panel Administración", to: "/admin" }]
      : []),

    { label: "Asesoría", to: "/consulting" },
    { label: "Legal", to: "/legal" },
  ];

  // 🔌 CONEXIÓN AUTH (Simulada): Cuando conectes useAuthLoginCliente, estas variables
  // vendrán de tu Contexto global. Por ahora, las dejamos listas para simular la sesión.
  const clienteAutenticado = true; // Cambia a false para probar cómo se ve sin iniciar sesión
  const datosCliente = { nombre_empresa: "Empresa de Prueba B2B" };

  // Construcción dinámica de items: Si está autenticado, inyectamos "Mi Panel B2B" al menú
  const navItems = [...BASE_NAV_ITEMS];
  if (clienteAutenticado) {
    // Insertamos la nueva pestaña antes de Asesoría/Legal o al final si prefieres
    navItems.splice(3, 0, { label: "Mi Panel B2B", to: "/mi-panel" });
  }

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

      {/* Links de navegación dinámicos — columna 2 */}
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

      {/* ── CTA Iniciar Sesión / Perfil Dinámico Activo — Columna 3 ── */}
      {isAuthenticated && usuario ? (
        <NavLink
          // Verificación de enrutamiento seguro para Administradores o Clientes
          to={
            usuario.rol === "admin" ||
            usuario.usuario?.toLowerCase() === "admin" ||
            esZonaAdmin
              ? "/admin"
              : "/mi-panel"
          }
          onClick={() => setIsOpen(false)}
          className={`main-navbar__cta ${
            usuario.rol === "admin" ||
            usuario.usuario?.toLowerCase() === "admin" ||
            esZonaAdmin
              ? ""
              : "main-navbar__cta--profile"
          }`}
          aria-label={`Ver panel de ${usuario.usuario}`}
          style={
            usuario.rol === "admin" ||
            usuario.usuario?.toLowerCase() === "admin" ||
            esZonaAdmin
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
            {/* Si es cliente pintamos su razón social (usuario), si es admin su identificador */}
            {usuario.nombre_empresa || usuario.usuario || "Usuario B2B"}
          </span>
        </NavLink>
      ) : (
        /* Guest View / Not Logged In — Botón corregido sin duplicaciones */
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
