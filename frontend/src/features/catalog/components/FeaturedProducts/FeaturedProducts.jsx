// src/features/catalog/components/FeaturedProducts/FeaturedProducts.jsx
import { Link } from "react-router-dom";
import { useFeaturedProducts } from "@/features/catalog/hooks/useFeaturedProducts";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import "./FeaturedProducts.css";

export const FeaturedProducts = () => {
  const { productos, cargando, error } = useFeaturedProducts();

  return (
    <section className="featured-products disnal-section" aria-label="Productos destacados">
      <div className="featured-products__inner">
        <h2 className="featured-products__title">Productos Destacados</h2>

        {cargando && (
          <p className="featured-products__state">Cargando productos...</p>
        )}

        {error && (
          <p className="featured-products__state featured-products__state--error">
            No se pudieron cargar los productos.
          </p>
        )}

        {!cargando && !error && productos.length === 0 && (
          <p className="featured-products__state">
            No hay productos destacados por el momento.
          </p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <div className="featured-products__grid">
            {productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} compact />
            ))}
          </div>
        )}

        <div className="featured-products__cta">
          <Link to="/catalog" className="featured-products__btn">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
};