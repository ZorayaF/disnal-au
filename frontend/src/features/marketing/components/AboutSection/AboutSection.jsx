import { Link } from 'react-router-dom';
import './AboutSection.css';

export const AboutSection = () => (
  <section className="about-section" aria-labelledby="about-section-title">
    <figure>
      <img src="/assets/images/panaderia.jpg" alt="Instalaciones de Disnal AU" loading="lazy" />
      <figcaption>Sobre Disnal AU</figcaption>
    </figure>
    <div>
      <h2 id="about-section-title">Sobre Disnal AU</h2>
      <p>Somos una empresa dedicada a la distribución de productos alimenticios de calidad. Nos enfocamos en ofrecer variedad, buen servicio y disponibilidad para nuestros clientes.</p>
      <Link to="/consulting">Conoce más</Link>
    </div>
  </section>
);
