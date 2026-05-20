// src/components/sections/CartList.jsx
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { useCartList } from "@hooks/useCartList";
import { Button } from "@components/ui/Button";
import { Title } from "@components/ui/Title";

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

  // Clasificación de insumos según el resultado del barrido de seguridad
  const productosDisponibles = carrito.filter(
    (item) => !item.conflicto && item.cantidadEnCarrito > 0,
  );
  const productosConConflicto = carrito.filter((item) => item.conflicto);

  if (carrito.length === 0) {
    return (
      <div className="text-center py-12 font-sans space-y-4">
        <p className="text-text-muted text-sm">
          Tu carrito de cotización está vacío.
        </p>
        <p className="text-xs text-text-muted">
          Explora el catálogo para añadir insumos al pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans space-y-8">
      {/* SECCIÓN 1: INSUMOS DISPONIBLES */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border-component pb-2">
          <Title text="1. Insumos Listos para Cotizar" level={3} />
          {productosDisponibles.length > 0 && (
            <button
              onClick={limpiarCarrito}
              className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
            >
              Vaciar Disponibles
            </button>
          )}
        </div>

        {productosDisponibles.length === 0 ? (
          <p className="text-xs text-text-muted italic bg-bg-main p-4 rounded-xl text-center">
            No tienes productos activos en este momento.
          </p>
        ) : (
          <div className="divide-y divide-border-component bg-bg-main rounded-xl overflow-hidden border border-border-component">
            {productosDisponibles.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-bg-surface"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-bg-main rounded-lg overflow-hidden border border-border-component flex-shrink-0">
                    {item.imagenes?.[0] && (
                      <img
                        src={item.imagenes[0]}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-text-body">
                      {item.nombre}
                    </h5>
                    <p className="text-xs text-text-muted">
                      Stock actual: {item.cantidad} und.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="flex items-center border border-border-component rounded-lg bg-bg-main overflow-hidden">
                    <button
                      onClick={() => restarProducto(item.id)}
                      disabled={validandoStock}
                      className="px-3 py-1 hover:bg-border-component text-sm font-bold transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-text-body bg-bg-surface h-full flex items-center">
                      {item.cantidadEnCarrito}
                    </span>
                    <button
                      onClick={() => agregarProducto(item)}
                      disabled={
                        item.cantidadEnCarrito >= item.cantidad ||
                        validandoStock
                      }
                      className="px-3 py-1 hover:bg-border-component text-sm font-bold transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => eliminarProducto(item.id)}
                    disabled={validandoStock}
                    className="text-xs text-text-muted hover:text-red-600 font-medium transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN 2: INSUMOS CON CONFLICTO (DESACTIVADOS O AGOTADOS) */}
      {productosConConflicto.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-dashed border-border-component">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-sm text-red-800">
                Insumos No Disponibles en Bodega
              </h4>
              <p className="text-xs text-text-muted">
                Estos artículos se agotaron o el administrador los inactivó. El
                sistema los retiene aquí para informarte, pero no se incluirán
                en el pedido final.
              </p>
            </div>

            <button
              onClick={() =>
                productosConConflicto.forEach((item) =>
                  eliminarProducto(item.id),
                )
              }
              disabled={validandoStock}
              className="text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-colors disabled:opacity-50 self-start sm:self-center cursor-pointer"
            >
              Limpiar Todo lo Agotado
            </button>
          </div>

          <div className="divide-y divide-border-component bg-red-50/30 rounded-xl overflow-hidden border border-red-100 opacity-75">
            {productosConConflicto.map((item) => (
              <div
                key={item.id}
                className="p-4 flex justify-between items-center gap-4 bg-bg-surface"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-bg-main rounded-lg overflow-hidden border border-border-component grayscale opacity-50 flex items-center justify-center text-[10px] text-text-muted">
                    {item.imagenes?.[0] ? (
                      <img
                        src={item.imagenes[0]}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Agotado"
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-text-muted line-through">
                      {item.nombre}
                    </h5>
                    <span className="inline-block mt-0.5 text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md">
                      {item.motivo === "eliminado"
                        ? "Retirado del Catálogo"
                        : "Sin Existencias / Desactivado"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => eliminarProducto(item.id)}
                  disabled={validandoStock}
                  className="text-xs text-red-600 hover:underline font-semibold disabled:opacity-50 cursor-pointer"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTONERA DE ACCIÓN INFERIOR */}
      <div className="flex justify-end pt-4 border-t border-border-component">
        <Button
          variant="primary"
          onClick={manejarContinuar}
          disabled={
            productosDisponibles.length === 0 ||
            productosConConflicto.length > 0 ||
            validandoStock
          }
        >
          {validandoStock
            ? "Reverificando inventario..."
            : productosConConflicto.length > 0
              ? "Remueve lo agotado para continuar"
              : "Continuar a Datos de Empresa"}
        </Button>
      </div>
    </div>
  );
};
