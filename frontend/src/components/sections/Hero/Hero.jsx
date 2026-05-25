import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__copy">
        <h1 id="home-hero-title">
          Distribuimos productos alimenticios de calidad para tu <span>negocio</span> o consumo.
        </h1>
        <p>
          En <strong>Disnal AU</strong> ofrecemos una amplia variedad de harinas, quesos y otros productos seleccionados para garantizar frescura y <span>calidad</span>.
        </p>
        <div className="home-hero__actions">
          <Link className="home-hero__button-link" to="/cart">Cotizar ahora</Link>
          <Link className="home-hero__button-link home-hero__button-link--dark" to="/catalog">Ver catálogo</Link>
        </div>
      </div>

      <figure className="home-hero__media">
        <img src="/assets/images/panes.jpg" alt="Panes frescos de panadería" />
      </figure>
    </section>
  );
};
