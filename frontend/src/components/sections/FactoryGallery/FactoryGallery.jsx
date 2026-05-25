import './FactoryGallery.css';

const spaces = [
  '/assets/images/proceso.jpg',
  '/assets/images/panaderia.jpg',
  '/assets/images/proceso pan.jpg',
  '/assets/images/senor en fabrica.jpg',
];

export const FactoryGallery = () => (
  <section className="factory-gallery" aria-labelledby="factory-gallery-title">
    <h2 id="factory-gallery-title">Nuestros Espacios</h2>
    <div className="factory-gallery__grid">
      {spaces.map((src, index) => (
        <img src={src} alt={`Espacio operativo Disnal ${index + 1}`} key={src} loading="lazy" />
      ))}
    </div>
  </section>
);
