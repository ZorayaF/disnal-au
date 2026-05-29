import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => (
  <div className="home-hero-wrapper">
    <section className="home-hero" aria-labelledby="home-hero-title">

      {/* ── Columna izquierda: texto ── */}
      <div className="home-hero__copy">

        {/* Badge */}
        <span className="home-hero__badge">Distribuimos</span>

        <h1 id="home-hero-title">
          Productos alimenticios de calidad para tu{' '}
          <span className="hero-accent">negocio</span> o consumo.
        </h1>

        <p>
          En <strong>Disnal AU</strong> ofrecemos una amplia variedad de harinas,
          quesos y otros productos seleccionados para garantizar frescura y{' '}
          <span className="hero-accent">calidad.</span>
        </p>

        <div className="home-hero__actions">
          {/* Botón primario con ícono de avión */}
          <Link className="home-hero__btn home-hero__btn--primary" to="/cart">
            <svg className="home-hero__btn-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13"/>
              <path d="M22 2 15 22 11 13 2 9l20-7z"/>
            </svg>
            Cotizar ahora
          </Link>

          {/* Botón secundario outline con ícono de catálogo */}
          <Link className="home-hero__btn home-hero__btn--outline" to="/catalog">
            <svg className="home-hero__btn-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Ver catálogo
          </Link>
        </div>
      </div>

      {/* ── Columna derecha: imagen ── */}
      <figure className="home-hero__media">
        <img src="/assets/images/panes.jpg" alt="Panes frescos de panadería" />
      </figure>

    </section>
  </div>
);
