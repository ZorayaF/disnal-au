import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@context/CartContext';
import { Button } from '@components/ui/Button';
import './ProductCard.css';

const fallbackImage = '/assets/images/harina de trigo.png';

export const ProductCard = ({ producto, compact = false }) => {
  const { agregarProducto } = useContext(CartContext);
  const [wasAdded, setWasAdded] = useState(false);

  const image = Array.isArray(producto?.imagenes) && producto.imagenes[0]
    ? producto.imagenes[0]
    : fallbackImage;

  const disponible = producto?.estado === 'disponible' && Number(producto?.cantidad) > 0;

  useEffect(() => {
    if (!wasAdded) return undefined;

    const timer = window.setTimeout(() => setWasAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [wasAdded]);

  const handleAddProduct = () => {
    const added = agregarProducto(producto);
    if (added !== false) setWasAdded(true);
  };

  return (
    <article className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      {producto?.destacado && <span className="product-card__badge">Más vendido</span>}

      <Link
        to={`/product/${producto.id}`}
        className="product-card__image-link"
        aria-label={`Ver ${producto.nombre}`}
      >
        <img src={image} alt={producto.nombre} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <p className="product-card__brand">{producto.marca || producto.categoria || 'Disnal'}</p>
        <h3>{producto.nombre}</h3>
        <p className="product-card__status">{disponible ? 'Disponible' : 'No disponible'}</p>
        <p className="product-card__detail">{producto.presentacion || 'Presentación comercial'}</p>

        <Button
          size="sm"
          variant={wasAdded ? 'primary' : 'dark'}
          onClick={handleAddProduct}
          disabled={!disponible}
          aria-live="polite"
        >
          {wasAdded ? 'Agregado ✓' : 'Agregar'}
        </Button>
      </div>
    </article>
  );
};
