import { Link } from 'react-router-dom';
import './Footer.css';

const LOGO_SRC = '/assets/images/png logo disnal.png';

const NAV_LINKS = [
  { label: 'Inicio',     to: '/' },
  { label: 'Catálogo',   to: '/catalog' },
  { label: 'Cotización', to: '/cart' },
  { label: 'Asesoría',   to: '/consulting' },
  { label: 'Legal',      to: '/legal' },
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="site-footer__contact-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
      </svg>
    ),
    content: <a href="tel:+576011234567" className="site-footer__contact-text">+57 (601) 123 4567</a>,
  },
  {
    icon: (
      <svg className="site-footer__contact-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    content: <a href="mailto:comercial@disnalau.com" className="site-footer__contact-text">comercial@disnalau.com</a>,
  },
  {
    icon: (
      <svg className="site-footer__contact-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    content: <span className="site-footer__contact-text">Lun – Vie: 8:00 am – 5:00 pm</span>,
  },
  {
    icon: (
      <svg className="site-footer__contact-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    content: <span className="site-footer__contact-text">Bogotá, Colombia</span>,
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0e0e0e"/>
      </svg>
    ),
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">

      {/* ── BANDA PRINCIPAL ────────────────────────────── */}
      <div className="site-footer__main">

        {/* Columna 1 — Marca */}
        <div className="site-footer__brand">
          <img
            src={LOGO_SRC}
            alt="Disnal AU"
            className="site-footer__logo"
          />
          <p className="site-footer__tagline">
            Distribuimos productos alimenticios de calidad con compromiso, frescura y confianza.
          </p>

          {/* Íconos sociales compactos */}
          <div className="site-footer__social-row" aria-label="Redes sociales">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="site-footer__social-btn"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 — Menú rápido */}
        <nav className="site-footer__col" aria-label="Menú rápido">
          <span className="site-footer__col-title">Menú</span>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="site-footer__nav-link">
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="site-footer__admin-btn">
            Acceso Admin
          </Link>
        </nav>

        {/* Columna 3 — Contacto */}
        <div className="site-footer__col" aria-label="Contáctanos">
          <span className="site-footer__col-title">Contáctanos</span>
          {CONTACT_ITEMS.map((item, i) => (
            <div key={i} className="site-footer__contact-item">
              {item.icon}
              {item.content}
            </div>
          ))}
        </div>

        {/* Columna 4 — Redes (lista) */}
        <div className="site-footer__col" aria-label="Síguenos">
          <span className="site-footer__col-title">Síguenos</span>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-link"
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>

        {/* Columna 5 — Compromisos + legal */}
        <div className="site-footer__col">
          <span className="site-footer__col-title">Nuestros compromisos</span>
          <p className="site-footer__values-headline">
            Calidad,<br />
            confianza<br />
            y <em>servicio</em>
          </p>
          <p className="site-footer__values-sub">
            que impulsará tu negocio.
          </p>
          <Link to="/legal" className="site-footer__legal-link">Términos y condiciones</Link>
          <Link to="/legal" className="site-footer__legal-link">Política de privacidad</Link>
          <Link to="/legal" className="site-footer__legal-link">Aviso legal</Link>
        </div>

      </div>

      {/* ── BANDA COPYRIGHT ────────────────────────────── */}
      <div className="site-footer__bottom">
        <span className="site-footer__copyright">
          © {year} Disnal AU — Todos los derechos reservados
        </span>
      </div>

    </footer>
  );
};
