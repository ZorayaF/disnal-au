import { Button } from '@components/ui/Button';
import { LineIcon } from '@components/ui/LineIcon';
import './CartItemRow.css'; //acá con líneas de importaciones

const fallbackImage = '/assets/images/harina de trigo.png'; //imagen

export const CartItemRow = ({ item, onIncrement, onDecrement, onRemove }) => {
  const image = Array.isArray(item.imagenes) && item.imagenes[0] ? item.imagenes[0] : fallbackImage; //función incrementar, decrementar para CardItemRow

  return (
    <article className={`cart-item-row ${item.conflicto ? 'cart-item-row--conflict' : ''}`}>
      <div className="cart-item-row__product">
        <img src={image} alt={item.nombre} loading="lazy" />
        <div>
          <h3>{item.nombre}</h3>
          <p>{item.presentacion || item.categoria || 'Insumo comercial'}</p>
          {item.conflicto && <strong>{item.motivo || 'Producto con conflicto'}</strong>}
        </div>
      </div> 
      <div className="cart-item-row__quantity" aria-label={`Cantidad de ${item.nombre}`}>
        <button type="button" onClick={() => onDecrement(item.id)} aria-label="Restar cantidad">−</button>
        <span>{item.cantidadEnCarrito}</span>
        <button type="button" onClick={() => onIncrement(item.id)} aria-label="Sumar cantidad">+</button>
      </div>

      <Button className="cart-item-row__delete" variant="ghost" size="sm" onClick={() => onRemove(item.id)} aria-label={`Eliminar ${item.nombre}`}>
        <LineIcon name="trash" />
      </Button>
    </article>
  ); //todo lo que devuelve la función de cartItemRow
};
