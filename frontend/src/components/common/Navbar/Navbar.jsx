import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '@context/CartContext';
import './Navbar.css';

const LOGO_SRC = '/assets/images/logo disnal.png';

const NAV_ITEMS = [
  { label: 'Inicio',     to: '/',           end: true },
  { label: 'Catálogo',   to: '/catalog' },
  { label: 'Cotización', to: '/cart',        isCart: true },
  { label: 'Asesoría',   to: '/consulting' },
  { label: 'Legal',      to: '/legal' },
];

export const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="main-navbar" role="banner">

      {/* Logo — columna 1 */}
      <NavLink
        className="main-navbar__brand"
        to="/"
        aria-label="Ir al inicio de Disnal"
      >
        <img src={LOGO_SRC} alt="Disnal" />
      </NavLink>

      {/* Links de navegación — columna 2 */}
      <nav
        id="main-nav"
        className={`main-navbar__nav${isOpen ? ' is-open' : ''}`}
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              ['main-navbar__link', isActive ? 'active' : '']
                .filter(Boolean)
                .join(' ')
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

      {/* CTA + Hamburger — columna 3 */}
      <NavLink
        className="main-navbar__cta"
        to="/cart"
        aria-label="Cotizar ahora"
      >
        {/* Ícono carrito */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>Cotizar ahora</span>
      </NavLink>

      {/* Hamburger — solo visible en tablet/móvil */}
      <button
        className="main-navbar__toggle"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        aria-controls="main-nav"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

    </header>
  );
};
