// src/features/cart/components/CartList/CartList.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import { CartItemRow } from "../CartItemRow/CartItemRow";
import { useCartList } from "../../hooks/useCartList";
import "./CartList.css";

const SendIcon = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
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

      {/* Tabla/Grilla de Insumos */}
      <div className="cart-list-section__table" role="list">
        {/* ✅ Texto semántico explícito en el HTML en lugar de usar CSS ::before */}
        <div className="cart-list-section__topbar" aria-hidden="true">
          <span>Producto</span>
          <span className="text-right">Cantidad · Acciones</span>
        </div>

        {carrito.length === 0 ? (
          <div className="cart-list-section__empty">
            <p>No tienes productos agregados a la cotización.</p>
            <Link to="/catalog" className="text-disnal-red font-bold underline">
              Ir al catálogo
            </Link>
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

      {/* Bloque de retorno al Catálogo */}
      <div className="cart-list-section__actions">
        <span>¿Deseas agregar más productos?</span>
        <Link to="/catalog">
          {/* ✅ Ícono SVG nativo e incrustado en lugar de un data-url de CSS */}
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
            ></path>
          </svg>
          Seguir comprando
        </Link>
      </div>

      <hr className="cart-list-section__divider" />

      {/* Bloque Final de Despacho Operativo */}
      <footer className="cart-list-section__submit">
        <div className="cart-list-section__submit-icon">
          <SendIcon className="w-6 h-6 text-disnal-red" />
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
          <SendIcon className="w-4 h-4 shrink-0" />
          {validandoStock ? "Validando..." : "Enviar solicitud"}
        </button>
      </footer>
    </section>
  );
};
