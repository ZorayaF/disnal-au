// src/features/cart/components/CartItemRow/CartItemRow.jsx
import { Button } from "@components/ui/Button/Button";
import { LineIcon } from "@components/ui/LineIcon/LineIcon";
import "./CartItemRow.css";

const FALLBACK_IMAGE = "/assets/images/harina de trigo.png";

// 🎯 CORREGIDO: Añadimos 'onUpdateQuantity' a la firma de las props recibidas
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

      {/* Control de Cantidades Mayoristas */}
      <div
        className="cart-item-row__quantity flex items-center justify-between px-3 py-1.5 border border-neutral-200 rounded-full bg-neutral-50 w-fit"
        aria-label={`Cantidad de ${item.nombre}`}
      >
        {/* Botón de Restar */}
        <button
          type="button"
          onClick={() => onDecrement(item.id)}
          disabled={item.cantidadEnCarrito <= 1}
          className="w-7 h-7 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-600 font-bold text-sm transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Restar cantidad"
        >
          −
        </button>

        {/* 🎯 INPUT NUMÉRICO SINCRONIZADO */}
        <input
          type="number"
          min="1"
          max={item.cantidad || 999} // 🎯 CORREGIDO: Usamos 'item.cantidad' que viene directo de tu base de datos SQLite
          value={item.cantidadEnCarrito}
          onChange={(e) => {
            const valor = parseInt(e.target.value, 10);
            if (!isNaN(valor) && valor >= 1) {
              onUpdateQuantity?.(item.id, valor);
            }
          }}
          className="w-12 text-center font-black text-[#0b0b0b] bg-transparent border-0 outline-none p-0 font-sans text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Botón de Sumar */}
        <button
          type="button"
          onClick={() => onIncrement(item.id)}
          disabled={item.cantidadEnCarrito >= (item.cantidad || 999)} // 🎯 CORREGIDO: Tope dinámico al stock real
          className="w-7 h-7 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-600 font-bold text-sm transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Sumar cantidad"
        >
          +
        </button>
      </div>

      {/* Acción de descarte */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.id)}
        aria-label={`Eliminar ${item.nombre}`}
        className="!p-1 min-h-0 cursor-pointer hover:!bg-red-50 hover:!text-red-600 rounded-lg transition-colors cart-item-row__delete"
      >
        <LineIcon name="trash" className="h-4 w-4 shrink-0" />
      </Button>
    </article>
  );
};
