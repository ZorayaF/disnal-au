// src/components/sections/CartList.jsx
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { useCartList } from "@hooks/useCartList";
// 🌟 Importamos la nueva molécula modular
import { CartItemRow } from "@components/molecules/CartItemRow";

export const CartList = ({ nextStep, reverificar }) => {
  const {
    carrito,
    agregarProducto,
    restarProducto,
    eliminarProducto,
    limpiarCarrito,
  } = useContext(CartContext);

  const { validandoStock, manejarContinuar } = useCartList(
    nextStep,
    reverificar,
  );

  const productosDisponibles = carrito.filter(
    (item) => !item.conflicto && item.cantidadEnCarrito > 0,
  );
  const productosConConflicto = carrito.filter((item) => item.conflicto);

  if (carrito.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Tu carrito de cotización está vacío.</p>
      </div>
    );
  }

  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", background: "#fff" }}
    >
      <h2>Lista de Cotización</h2>
      <hr />

      {/* SECCION 1: INSUMOS DISPONIBLES */}
      <div style={{ margin: "20px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>1. Insumos Listos para Cotizar</h3>
          {productosDisponibles.length > 0 && (
            <button onClick={limpiarCarrito} style={{ color: "red" }}>
              Vaciar Disponibles
            </button>
          )}
        </div>

        {productosDisponibles.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>
            No tienes productos activos en este momento.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {/* 🌟 REEMPLAZO POR MOLÉCULA CLEAN */}
            {productosDisponibles.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                restarProducto={restarProducto}
                agregarProducto={agregarProducto}
                eliminarProducto={eliminarProducto}
                disabled={validandoStock}
              />
            ))}
          </div>
        )}
      </div>

      {/* SECCION 2: INSUMOS CON CONFLICTO */}
      {productosConConflicto.length > 0 && (
        <div
          style={{
            margin: "20px 0",
            borderTop: "1px dashed red",
            paddingTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ color: "red", margin: 0 }}>
                Insumos No Disponible en Bodega
              </h3>
              <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>
                Artículos agotados o inactivos. Deben removerse para poder
                continuar con el pedido.
              </p>
            </div>
            <button
              onClick={() =>
                productosConConflicto.forEach((item) =>
                  eliminarProducto(item.id),
                )
              }
              disabled={validandoStock}
              style={{
                background: "#fee",
                color: "red",
                border: "1px solid red",
                padding: "4px 8px",
              }}
            >
              Limpiar Todo lo Agotado
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {productosConConflicto.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #fcc",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff5f5",
                }}
              >
                {/* Nota: Dejamos el bloque de conflicto aquí directo ya que es un estado de error 
                    excepcional y tachado, pero también incluye la misma data de control */}
                <div>
                  <span
                    style={{ textDecoration: "line-through", color: "#999" }}
                  >
                    {item.nombre}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "11px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.motivo === "eliminado"
                      ? "Retirado del Catálogo"
                      : "Sin Existencias / Desactivado"}
                  </p>
                </div>
                <button
                  onClick={() => eliminarProducto(item.id)}
                  disabled={validandoStock}
                  style={{ color: "red" }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTONERA DE ACCION INFERIOR */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={manejarContinuar}
          disabled={
            productosDisponibles.length === 0 ||
            productosConConflicto.length > 0 ||
            validandoStock
          }
          style={{ padding: "10px 20px" }}
        >
          {validandoStock
            ? "Reverificando inventario..."
            : productosConConflicto.length > 0
              ? "Remueve lo agotado para continuar"
              : "Continuar a Datos de Empresa"}
        </button>
      </div>
    </div>
  );
};
