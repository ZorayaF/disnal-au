import { useEffect } from "react";
import { useCartCheckout } from "@/features/cart/hooks/useCartCheckout";
import { CartList } from "@/features/cart/components/CartList";
import "./Cart.css";

export const Cart = () => {
  const {
    notificaciones,
    sincronizando,
    enviando,
    errorEnvio,
    step,
    datosEnvio,
    manejarCambioEnvio,
    avanzarPaso,
    ejecutarBarrido,
    enviarPedidoCRM,
  } = useCartCheckout();

  useEffect(() => {
    document.title = "Disnal AU - Sistema de Cotización CRM";
  }, []);

  return (
    <div className="cart-page">

      {/* ── Encabezado ── */}
      <div className="cart-page__header">
        <h1 className="cart-page__title">Mi Carrito de Cotización</h1>
      </div>

      {/* ── Alerta de cambios en inventario ── */}
      {notificaciones.length > 0 && step === 1 && (
        <div className="cart-alert cart-alert--warning">
          <span className="cart-alert__title">
            Cambios en tu inventario detectados
          </span>
          <ul>
            {notificaciones.map((nota, idx) => (
              <li key={idx}>{nota}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Alerta de error de envío ── */}
      {errorEnvio && (
        <div className="cart-alert cart-alert--error">
          <span className="cart-alert__title">Error del Servidor</span>
          <span>{errorEnvio}</span>
        </div>
      )}

      {/* ── Panel principal (dark card) ── */}
      <div className="cart-panel">

        {/* Barra roja de encabezado — varía según el paso activo */}
        {!sincronizando && (
          <div className="cart-panel__header">
            <div>
              <p className="cart-panel__step-label">
                Paso {step} de 4
              </p>
              <h2 className="cart-panel__step-title">
                {step === 1 && "Revisión de Productos"}
                {step === 2 && "Datos de Logística"}
                {step === 3 && "Revisión Final"}
                {step === 4 && "Solicitud Confirmada"}
              </h2>
            </div>
            {/* Ícono decorativo SVG */}
            <svg
              className="cart-panel__header-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {step <= 2 ? (
                /* Camión */
                <>
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </>
              ) : step === 3 ? (
                /* Portapapeles */
                <>
                  <path d="M9 2h6a1 1 0 0 1 1 1v1H8V3a1 1 0 0 1 1-1z" />
                  <rect x="4" y="4" width="16" height="18" rx="2" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="16" y2="14" />
                  <line x1="8" y1="18" x2="12" y2="18" />
                </>
              ) : (
                /* Check */
                <>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M7 12l3.5 3.5L17 8" />
                </>
              )}
            </svg>
          </div>
        )}

        <div className="cart-panel__body">
          {sincronizando ? (
            <p className="cart-panel__loading">
              Verificando disponibilidad y existencias en tiempo real…
            </p>
          ) : (
            <>
              {/* ════════════════════════════════════════
                  PASO 1: Lista del Carrito
                  ════════════════════════════════════════ */}
              {step === 1 && (
                <CartList
                  nextStep={() => avanzarPaso(2)}
                  reverificar={ejecutarBarrido}
                />
              )}

              {/* ════════════════════════════════════════
                  PASO 2: Información Logística de Envío
                  ════════════════════════════════════════ */}
              {step === 2 && (
                <div className="shipping-step">

                  {/* Modalidad de entrega */}
                  <div className="shipping-field">
                    <label className="shipping-field__label">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      Modalidad de Entrega
                    </label>
                    <select
                      className="shipping-field__select"
                      name="tipo_despacho"
                      value={datosEnvio.tipo_despacho}
                      onChange={manejarCambioEnvio}
                    >
                      <option value="Gestionado por Distribuidora">
                        Envío Gestionado por Distribuidora (Requiere cotizar flete)
                      </option>
                      <option value="Contraentrega">
                        Flete Contraentrega (Pagas a la transportadora al recibir)
                      </option>
                      <option value="Recogida">
                        Recogida en Bodega / camión propio ($0 flete)
                      </option>
                    </select>
                  </div>

                  {/* Ciudad + Dirección (solo si no es Recogida) */}
                  {datosEnvio.tipo_despacho !== "Recogida" && (
                    <div className="shipping-row">
                      {/* Ciudad */}
                      <div className="shipping-field">
                        <label className="shipping-field__label">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          Ciudad de Destino
                        </label>
                        <div className="shipping-field__input-wrap">
                          <svg className="shipping-field__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          <input
                            className="shipping-field__input"
                            type="text"
                            name="ciudad_envio"
                            value={datosEnvio.ciudad_envio}
                            onChange={manejarCambioEnvio}
                            placeholder="Ej: Bogotá"
                            required
                          />
                        </div>
                      </div>

                      {/* Dirección */}
                      <div className="shipping-field">
                        <label className="shipping-field__label">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          Dirección de Entrega
                        </label>
                        <div className="shipping-field__input-wrap">
                          <svg className="shipping-field__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          <input
                            className="shipping-field__input"
                            type="text"
                            name="direccion_envio"
                            value={datosEnvio.direccion_envio}
                            onChange={manejarCambioEnvio}
                            placeholder="Ej: Calle 45 #12-34 Bodega 2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notas opcionales */}
                  <div className="shipping-field">
                    <label className="shipping-field__label">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                      </svg>
                      Notas o Necesidades Especiales{" "}
                      <span style={{ color: "#555", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>
                        (Opcional)
                      </span>
                    </label>
                    <textarea
                      className="shipping-field__textarea"
                      name="necesidades_especificas"
                      value={datosEnvio.necesidades_especificas}
                      onChange={manejarCambioEnvio}
                      placeholder="Especificaciones de empaque, horarios de entrega, etc..."
                    />
                  </div>

                  {/* Acciones */}
                  <div className="cart-actions">
                    <button
                      className="cart-btn--back"
                      onClick={() => avanzarPaso(1)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Atrás
                    </button>
                    <button
                      className="cart-btn--primary"
                      onClick={() => avanzarPaso(3)}
                      disabled={
                        datosEnvio.tipo_despacho !== "Recogida" &&
                        (!datosEnvio.ciudad_envio || !datosEnvio.direccion_envio)
                      }
                    >
                      Continuar a Revisión
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════
                  PASO 3: Revisión Final
                  ════════════════════════════════════════ */}
              {step === 3 && (
                <div className="review-step">
                  <p className="review-step__desc">
                    Tu solicitud será procesada de inmediato por el personal del CRM.
                  </p>

                  <div className="review-summary">
                    <h4 className="review-summary__title">Resumen del Despacho</h4>

                    <div className="review-summary__row">
                      <span className="review-summary__key">Modalidad</span>
                      <span className="review-summary__val">{datosEnvio.tipo_despacho}</span>
                    </div>

                    {datosEnvio.tipo_despacho !== "Recogida" && (
                      <>
                        <div className="review-summary__row">
                          <span className="review-summary__key">Destino</span>
                          <span className="review-summary__val">{datosEnvio.ciudad_envio}</span>
                        </div>
                        <div className="review-summary__row">
                          <span className="review-summary__key">Dirección</span>
                          <span className="review-summary__val">{datosEnvio.direccion_envio}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="cart-actions" style={{ width: "100%" }}>
                    <button
                      className="cart-btn--back"
                      onClick={() => avanzarPaso(2)}
                      disabled={enviando}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Atrás
                    </button>
                    <button
                      className="cart-btn--primary"
                      onClick={enviarPedidoCRM}
                      disabled={enviando}
                    >
                      {enviando ? "Procesando en CRM…" : "Confirmar y Enviar Pedido"}
                      {!enviando && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════
                  PASO 4: Confirmación CRM
                  ════════════════════════════════════════ */}
              {step === 4 && (
                <div className="confirm-step">
                  <div className="confirm-step__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="confirm-step__title">
                    ¡Solicitud Recibida en el CRM!
                  </h3>
                  <p className="confirm-step__desc">
                    Tu orden ha sido guardada de manera relacional. El administrador
                    revisará las existencias, asignará el costo del flete de ser
                    necesario y se te notificará vía correo electrónico para proceder
                    con el pago.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
