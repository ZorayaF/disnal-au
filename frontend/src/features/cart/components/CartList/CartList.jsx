import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import { CartItemRow } from "@/features/cart/components/CartItemRow";
import { useCartList } from "@/features/cart/hooks/useCartList";
import "./CartList.css";

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const CartList = ({ nextStep, reverificar }) => {
  const { carrito, agregarProducto, restarProducto, eliminarProducto } =
    useContext(CartContext);
  const { validandoStock, errorContinuar, manejarContinuar } = useCartList(
    nextStep,
    reverificar,
  );

  return (
    <section className="cart-list-section" aria-labelledby="cart-list-title">
      <header className="cart-list-section__header">
        <h1 id="cart-list-title">Lista de cotización</h1>
        <p>Revisa bien los productos agregados para realizar la solicitud</p>
      </header>

      <div className="cart-list-section__table" role="list">
        <div className="cart-list-section__topbar" aria-hidden="true" />
        {carrito.length === 0 ? (
          <div className="cart-list-section__empty">
            <p>No tienes productos agregados a la cotización.</p>
            <Link to="/catalog">Ir al catálogo</Link>
          </div>
        ) : (
          carrito.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrement={() => agregarProducto(item)}
              onDecrement={restarProducto}
              onRemove={eliminarProducto}
            />
          ))
        )}
      </div>

      {/* Acciones */}
      <div className="cart-list-section__actions">
        <span>¿Deseas agregar más productos?</span>
        <Link to="/catalog">Seguir comprando</Link>
      </div>

      <hr className="cart-list-section__divider" />

      {/* Submit */}
      <footer className="cart-list-section__submit">
        {/* ← Ícono avión en círculo rosa */}
        <div className="cart-list-section__submit-icon">
          <SendIcon />
        </div>

        <h2>Enviar solicitud de cotización</h2>
        <p>Completa tus datos para enviar la solicitud a un asesor</p>

        {errorContinuar && (
          <small className="cart-list-section__error" role="alert">
            {errorContinuar}
          </small>
        )}

        <button
          type="button"
          onClick={manejarContinuar}
          disabled={validandoStock || carrito.length === 0}
        >
          <SendIcon /> {/* ← Ícono dentro del botón */}
          {validandoStock ? "Validando..." : "Enviar solicitud"}
        </button>
      </footer>
    </section>
  );
};
