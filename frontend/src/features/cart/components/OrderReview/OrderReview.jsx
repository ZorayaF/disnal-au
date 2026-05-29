import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { CheckoutStepper } from "@/features/cart/components/CheckoutStepper";
import "./OrderReview.css";

export const OrderReview = ({
  companyData,
  onConfirm,
  onBack,
  submitting = false,
}) => {
  const { carrito } = useContext(CartContext);
  const productos = carrito.filter(
    (item) => !item.conflicto && Number(item.cantidadEnCarrito) > 0,
  );
  const unidades = productos.reduce(
    (acc, item) => acc + Number(item.cantidadEnCarrito || 0),
    0,
  );

  return (
    <section
      className="order-review-section"
      aria-labelledby="order-review-title"
    >
      <CheckoutStepper currentStep={2} />
      <div className="order-review">
        <h1 id="order-review-title">Revisión de la orden</h1>
        <p>Verifica tus datos y productos antes de confirmar la solicitud</p>

        <div className="order-review__grid">
          <article>
            <h2>Datos de empresa</h2>
            <dl>
              <div>
                <dt>Empresa</dt>
                <dd>{companyData?.nombreEmpresa}</dd>
              </div>
              <div>
                <dt>RUC / NIT</dt>
                <dd>{companyData?.nitRuc}</dd>
              </div>
              <div>
                <dt>Contacto</dt>
                <dd>{companyData?.nombreContacto}</dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>{companyData?.correo}</dd>
              </div>
              <div>
                <dt>Teléfono</dt>
                <dd>{companyData?.telefono}</dd>
              </div>
            </dl>
          </article>

          <article>
            <h2>Resumen</h2>
            <dl>
              <div>
                <dt>Productos</dt>
                <dd>{productos.length}</dd>
              </div>
              <div>
                <dt>Unidades</dt>
                <dd>{unidades}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>Pendiente</dd>
              </div>
            </dl>
          </article>
        </div>

        {companyData?.necesidadesEspecificas && (
          <p className="order-review__comments">
            {companyData.necesidadesEspecificas}
          </p>
        )}

        <div className="order-review__products">
          {productos.map((item) => (
            <span key={item.id}>
              {item.nombre} · {item.cantidadEnCarrito} und.
            </span>
          ))}
        </div>

        <div className="order-review__actions">
          <button type="button" onClick={onBack} disabled={submitting}>
            Atrás
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting || productos.length === 0}
          >
            {submitting ? "Enviando" : "Confirmar"}
          </button>
        </div>
      </div>
    </section>
  );
};
