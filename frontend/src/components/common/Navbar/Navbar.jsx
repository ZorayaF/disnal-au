import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '@context/CartContext';
import './Navbar.css';

const LOGO_SRC = '/assets/images/logo disnal.png';

const NAV_ITEMS = [
  { label: 'Inicio', to: '/', end: true },
  { label: 'Catálogo', to: '/catalog' },
  { label: 'Cotización', to: '/cart', isCart: true },
  { label: 'Asesoría', to: '/consulting' },
  { label: 'Legal', to: '/legal' },
];

export const Navbar = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <header className="main-navbar" role="banner">
      <NavLink className="main-navbar__brand" to="/" aria-label="Ir al inicio de Disnal AU">
        <img src={LOGO_SRC} alt="Disnal AU" />
      </NavLink>

      <nav className="main-navbar__nav" aria-label="Navegación principal">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'main-navbar__link',
                item.isCart ? 'main-navbar__cart-link' : '',
                isActive ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <span>{item.label}</span>
            {item.isCart && totalItems > 0 && (
              <strong className="main-navbar__cart-badge" aria-label={`${totalItems} productos en cotización`}>
                {totalItems}
              </strong>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
