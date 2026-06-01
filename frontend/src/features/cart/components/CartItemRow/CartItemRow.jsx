// src/features/cart/components/CartItemRow/CartItemRow.jsx
import "./CartItemRow.css";

const FALLBACK_IMAGE = "/assets/images/harina de trigo.png";

export const CartItemRow = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onUpdateQuantity,
}) => {
  const image =
    Array.isArray(item.imagenes) && item.imagenes[0]
      ? item.imagenes[0]
      : FALLBACK_IMAGE;

  return (
    <article
      className={`cart-item-row ${item.conflicto ? "cart-item-row--conflict" : ""}`}
    >
      {/* Información del Insumo Comercial */}
      <div className="cart-item-row__product">
        <img src={image} alt={item.nombre} loading="lazy" />
        <div>
          <h3>{item.nombre}</h3>
          <p>{item.presentacion || item.categoria || "Insumo comercial"}</p>
          {item.conflicto && (
            <strong>{item.motivo || "Producto con conflicto"}</strong>
          )}
        </div>
      </div>

      {/* Control de Cantidades */}
      <div
        className="cart-item-row__quantity"
        aria-label={`Cantidad de ${item.nombre}`}
      >
        <button
          type="button"
          onClick={() => onDecrement(item.id)}
          disabled={item.cantidadEnCarrito <= 1}
          aria-label="Restar cantidad"
        >
          −
        </button>

        <input
          type="number"
          min="1"
          max={item.cantidad || 999}
          value={item.cantidadEnCarrito}
          onChange={(e) => {
            const valor = parseInt(e.target.value, 10);
            if (!isNaN(valor) && valor >= 1) {
              onUpdateQuantity?.(item.id, valor);
            }
          }}
        />

        <button
          type="button"
          onClick={() => onIncrement(item.id)}
          disabled={item.cantidadEnCarrito >= (item.cantidad || 999)}
          aria-label="Sumar cantidad"
        >
          +
        </button>
      </div>

      {/* Acción de descarte */}
      <button
        type="button"
        className="cart-item-row__delete"
        onClick={() => onRemove(item.id)}
        aria-label={`Eliminar ${item.nombre}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </article>
  );
};