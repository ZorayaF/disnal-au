// src/components/molecules/ProductCard.jsx
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@context/CartContext";
import { AuthContext } from "@context/AuthContext"; // 1. Importamos el contexto de autenticación
import { Button } from "@components/ui/Button";
import "./ProductCard.css";

const fallbackImage = "/assets/images/harina de trigo.png";

export const ProductCard = ({ producto, compact = false }) => {
  const { agregarProducto } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext); // 2. Extraemos el estado de sesión real
  const [wasAdded, setWasAdded] = useState(false);

  const image =
    Array.isArray(producto?.imagenes) && producto.imagenes[0]
      ? producto.imagenes[0]
      : fallbackImage;

  const disponible =
    producto?.estado === "disponible" && Number(producto?.cantidad) > 0;

  useEffect(() => {
    if (!wasAdded) return undefined;

    const timer = window.setTimeout(() => setWasAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [wasAdded]);

  const handleAddProduct = () => {
    if (!isAuthenticated) return; // Protección extra a nivel de función
    const added = agregarProducto(producto);
    if (added !== false) setWasAdded(true);
  };

  return (
    <article
      className={`product-card ${compact ? "product-card--compact" : ""} ${!isAuthenticated ? "product-card--guest" : ""}`}
    >
      {producto?.destacado && (
        <span className="product-card__badge">Más vendido</span>
      )}

      <Link
        to={`/product/${producto.id}`}
        className="product-card__image-link"
        aria-label={`Ver ${producto.nombre}`}
      >
        <img src={image} alt={producto.nombre} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <p className="product-card__brand">
          {producto.marca || producto.categoria || "Disnal"}
        </p>
        <h3>{producto.nombre}</h3>

        {/* Mostramos el estado de disponibilidad condicional según el rol */}
        <p className="product-card__status">
          {disponible
            ? isAuthenticated
              ? "Disponible"
              : "Existencias Protegidas 🔒"
            : "No disponible"}
        </p>

        <p className="product-card__detail">
          {producto.presentacion || "Presentación comercial"}
        </p>

        {/* 🔐 INTERFAZ DE ACCIÓN CONDICIONAL B2B */}
        {isAuthenticated ? (
          <Button
            size="sm"
            variant={wasAdded ? "primary" : "dark"}
            onClick={handleAddProduct}
            disabled={!disponible}
            aria-live="polite"
          >
            {wasAdded ? "Agregado ✓" : "Agregar"}
          </Button>
        ) : (
          <Link
            to="/login-cliente"
            className="product-card__login-link"
            aria-label="Iniciar sesión para cotizar este insumo"
          >
            Cotizar
          </Link>
        )}
      </div>
    </article>
  );
};
