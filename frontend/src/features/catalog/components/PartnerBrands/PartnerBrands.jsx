import './PartnerBrands.css';

const brands = [
  { src: '/assets/images/Olimpica.png', alt: 'Olímpica' },
  { src: '/assets/images/exito logo.png', alt: 'Éxito' },
  { src: '/assets/images/carulla.png', alt: 'Carulla' },
];

export const PartnerBrands = () => (
  <section className="partner-brands" aria-labelledby="partner-brands-title">
    <h2 id="partner-brands-title">Marcas Aliadas</h2>
    <div className="partner-brands__grid">
      {brands.map((brand) => <img key={brand.alt} src={brand.src} alt={brand.alt} loading="lazy" />)}
    </div>
  </section>
);
