import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@context/CartContext';
import { CartItemRow } from '@components/molecules/CartItemRow';
import { useCartList } from '@hooks/useCartList';
import './CartList.css';

export const CartList = ({ nextStep, reverificar }) => {
  const { carrito, agregarProducto, restarProducto, eliminarProducto } = useContext(CartContext);
  const { validandoStock, errorContinuar, manejarContinuar } = useCartList(nextStep, reverificar);

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

      <div className="cart-list-section__actions">
        <span>¿Deseas agregar más productos?</span>
        <Link to="/catalog">Seguir comprando</Link>
      </div>

      <footer className="cart-list-section__submit">
        <h2>Enviar solicitud de cotización</h2>
        <p>Completa tus datos para enviar la solicitud a un asesor</p>
        {errorContinuar && <small className="cart-list-section__error" role="alert">{errorContinuar}</small>}
        <button type="button" onClick={manejarContinuar} disabled={validandoStock || carrito.length === 0}>
          {validandoStock ? 'Validando' : 'Enviar solicitud'}
        </button>
      </footer>
    </section>
  );
};
