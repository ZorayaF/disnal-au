import { Link } from 'react-router-dom';
import './Footer.css';

const LOGO_SRC = '/assets/images/logo disnal.png';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__logo-panel">
        <img src={LOGO_SRC} alt="Disnal AU" />
      </div>

      <div className="site-footer__content">
        <section>
          <h2>Menú rápido</h2>
          <Link to="/">Inicio</Link>
          <Link to="/catalog">Catálogo</Link>
          <Link to="/cart">Cotización</Link>
          <Link to="/consulting">Asesoría</Link>
          <Link to="/legal">Legal</Link>
          <Link className="site-footer__admin-link" to="/login">Acceso a Admin</Link>
        </section>

        <section>
          <h2>Contacto comercial</h2>
          <a href="https://wa.me/573118572322" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="tel:+573118572322">Teléfono</a>
          <a href="mailto:comercial@disnalau.com">Correo</a>
        </section>

        <section className="site-footer__legal">
          <Link to="/legal">Política de privacidad</Link>
          <Link to="/legal">Aviso legal</Link>
          <Link to="/legal">Términos y condiciones</Link>
        </section>
      </div>
    </footer>
  );
};
