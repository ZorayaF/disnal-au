import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@context/CartContext';
import './RelatedProductCard.css';

const FALLBACK_IMAGE = '/assets/images/donarepa.png';

export const RelatedProductCard = ({ producto }) => {
  const { agregarProducto } = useContext(CartContext);
  const [wasAdded, setWasAdded]   = useState(false);

  const image     = Array.isArray(producto?.imagenes) && producto.imagenes[0]
    ? producto.imagenes[0]
    : FALLBACK_IMAGE;
  const disponible = producto?.estado === 'disponible' && Number(producto?.cantidad) > 0;

  useEffect(() => {
    if (!wasAdded) return;
    const t = window.setTimeout(() => setWasAdded(false), 1400);
    return () => window.clearTimeout(t);
  }, [wasAdded]);

  const handleAdd = () => {
    const added = agregarProducto(producto);
    if (added !== false) setWasAdded(true);
  };

  return (
    <article className="rpc">
      {/* Imagen */}
      <Link to={`/product/${producto.id}`} className="rpc__image-link"
        aria-label={`Ver ${producto.nombre}`}>
        <img src={image} alt={producto?.nombre} loading="lazy" />
      </Link>

      {/* Cuerpo */}
      <div className="rpc__body">
        <h3 className="rpc__name">{producto?.nombre}</h3>
        <p className="rpc__meta">Marca: <span>{producto?.marca || '—'}</span></p>
        <p className="rpc__meta">Empaque: <span>{producto?.presentacion || '—'}</span></p>

        <Link to={`/product/${producto.id}`} className="rpc__btn">
          Ver producto
        </Link>
      </div>
    </article>
  );
};
