import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@components/molecules/ProductCard';
import { useProductGrid } from '@hooks/useProductGrid';
import { FALLBACK_PRODUCTS } from '@data/fallbackProducts';
import './FeaturedProducts.css';


export const FeaturedProducts = () => {
  const { productos = [], cargando } = useProductGrid({}, '', 'alfabetico-az');

  const destacados = useMemo(() => {
    const real = productos.filter((product) => product.destacado || product.estado === 'disponible').slice(0, 5);
    return real.length ? real : FALLBACK_PRODUCTS;
  }, [productos]);

  return (
    <section className="featured-products" aria-labelledby="featured-products-title">
      <h2 id="featured-products-title">Productos Destacados</h2>
      {cargando ? <p>Cargando destacados...</p> : null}
      <div className="featured-products__grid">
        {destacados.map((product) => <ProductCard key={product.id} producto={product} compact />)}
      </div>
      <Link className="featured-products__catalog" to="/catalog">Ver catálogo</Link>
    </section>
  );
};
