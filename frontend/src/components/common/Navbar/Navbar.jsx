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
      <NavLink
        className="main-navbar__brand"
        to="/"
        aria-label="Ir al inicio de Disnal AU"
      >
        <img src={LOGO_SRC} alt="Disnal AU" />
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
              ['main-navbar__link', item.isCart ? 'main-navbar__cart-link' : '', isActive ? 'active' : '']
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
    </header>
  );
};