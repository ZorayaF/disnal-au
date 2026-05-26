import { Link } from 'react-router-dom';
import './Footer.css';

const LOGO_SRC = '/assets/images/logo disnal.png';

const NAV_LINKS = [
  { label: 'Inicio',     to: '/' },
  { label: 'Catálogo',   to: '/catalog' },
  { label: 'Cotización', to: '/cart' },
  { label: 'Asesoría',   to: '/consulting' },
  { label: 'Legal',      to: '/legal' },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0d0d0d" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Logo */}
      <div className="site-footer__logo-panel">
        <img src={LOGO_SRC} alt="Disnal AU — Soluciones, Innovación y Naturaleza" />
      </div>

      <div className="site-footer__content">
        {/* Menú rápido */}
        <section className="site-footer__menu" aria-label="Menú rápido">
          <h2 className="site-footer__section-title">Menú rápido</h2>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
          <Link className="site-footer__admin-link" to="/login">Acceso Admin</Link>
        </section>

        {/* Contáctanos */}
        <section className="site-footer__contact" aria-label="Contáctanos">
          <h2 className="site-footer__section-title">Contáctanos</h2>
          <a href="tel:+573118572322">Tel: (601) 123 4567</a>
          <a href="mailto:comercial@disnalau.com">comercial@disnalau.com</a>
          <p>Lunes a viernes</p>
          <p>8:00 am – 5:00 pm</p>
        </section>

        {/* Síguenos */}
        <section className="site-footer__social" aria-label="Redes sociales">
          <h2 className="site-footer__section-title">Síguenos</h2>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.icon}
              {s.label}
            </a>
          ))}
        </section>

        {/* Legal */}
        <section className="site-footer__legal" aria-label="Legal">
          <p className="site-footer__legal-tagline">
            Distribución de calidad<br />para tu negocio
          </p>
          <Link to="/legal">Términos y condiciones</Link>
          <Link to="/legal">Política de privacidad</Link>
          <Link to="/legal">Aviso legal</Link>
        </section>
      </div>

      {/* Copyright */}
      <div className="site-footer__bottom">
        © {year} Disnal AU — Todos los derechos reservados
      </div>
    </footer>
  );
};

