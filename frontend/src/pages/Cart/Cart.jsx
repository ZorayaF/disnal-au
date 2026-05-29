import { useEffect } from "react";
import { useCartCheckout } from "@/features/cart/hooks/useCartCheckout";
import { CartList } from "@/features/cart/components/CartList";

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
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <h1>Mi Carrito de Cotización</h1>
        <p>Ecosistema B2B - Solicitud Directa al Panel de Administración</p>
      </div>

      {notificaciones.length > 0 && step === 1 && (
        <div
          style={{
            border: "1px solid orange",
            padding: "10px",
            background: "#fff9e6",
            color: "brown",
          }}
        >
          <strong>Cambios en tu inventario detectados:</strong>
          <ul>
            {notificaciones.map((nota, idx) => (
              <li key={idx}>{nota}</li>
            ))}
          </ul>
        </div>
      )}

      {errorEnvio && (
        <div
          style={{
            border: "1px solid red",
            padding: "10px",
            background: "#fde8e8",
            color: "red",
          }}
        >
          <strong>Error del Servidor:</strong> {errorEnvio}
        </div>
      )}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          background: "#fff",
        }}
      >
        {sincronizando ? (
          <p>Verificando disponibilidad y existencias en tiempo real...</p>
        ) : (
          <>
            {/* PASO 1: Lista del Carrito */}
            {step === 1 && (
              <CartList
                nextStep={() => avanzarPaso(2)}
                reverificar={ejecutarBarrido}
              />
            )}

            {/* PASO 2: Selección del Tipo de Despacho Logístico */}
            {step === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <h3>Paso 2: Información Logística de Envío</h3>

                <label>
                  <strong>Modalidad de Entrega:</strong>
                </label>
                <select
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

                {datosEnvio.tipo_despacho !== "Recogida" && (
                  <>
                    <label>Ciudad de Destino:</label>
                    <input
                      type="text"
                      name="ciudad_envio"
                      value={datosEnvio.ciudad_envio}
                      onChange={manejarCambioEnvio}
                      placeholder="Ej: Bogotá"
                      required
                    />

                    <label>Dirección de Entrega:</label>
                    <input
                      type="text"
                      name="direccion_envio"
                      value={datosEnvio.direccion_envio}
                      onChange={manejarCambioEnvio}
                      placeholder="Ej: Calle 45 #12-34 Bodega 2"
                      required
                    />
                  </>
                )}

                <label>Notas o Necesidades Especiales (Opcional):</label>
                <textarea
                  name="necesidades_especificas"
                  value={datosEnvio.necesidades_especificas}
                  onChange={manejarCambioEnvio}
                  placeholder="Especificaciones de empaque, horarios de entrega, etc..."
                />

                <div>
                  <button onClick={() => avanzarPaso(1)}>Atrás</button>
                  <button
                    onClick={() => avanzarPaso(3)}
                    style={{ marginLeft: "10px" }}
                    disabled={
                      datosEnvio.tipo_despacho !== "Recogida" &&
                      (!datosEnvio.ciudad_envio || !datosEnvio.direccion_envio)
                    }
                  >
                    Continuar a Revisión
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3: Revisión Final de Datos antes de Enviar */}
            {step === 3 && (
              <div style={{ textAlign: "center" }}>
                <h3>Paso 3: Revisión Final Completa</h3>
                <p>
                  Tu solicitud será procesada de inmediato por el personal del
                  CRM.
                </p>

                <div
                  style={{
                    textShadow: "none",
                    background: "#f9f9f9",
                    padding: "15px",
                    margin: "15px 0",
                    textAlign: "left",
                    border: "1px dashed #aaa",
                  }}
                >
                  <h4>Resumen del Despacho:</h4>
                  <p>
                    <strong>Tipo de Despacho:</strong>{" "}
                    {datosEnvio.tipo_despacho}
                  </p>
                  {datosEnvio.tipo_despacho !== "Recogida" && (
                    <>
                      <p>
                        <strong>Destino:</strong> {datosEnvio.ciudad_envio}
                      </p>
                      <p>
                        <strong>Dirección:</strong> {datosEnvio.direccion_envio}
                      </p>
                    </>
                  )}
                </div>

                <button onClick={enviarPedidoCRM} disabled={enviando}>
                  {enviando
                    ? "Procesando Orden en el CRM..."
                    : "Confirmar y Enviar Pedido"}
                </button>
                <button
                  onClick={() => avanzarPaso(2)}
                  style={{ marginLeft: "10px" }}
                  disabled={enviando}
                >
                  Atrás
                </button>
              </div>
            )}

            {/* PASO 4: Confirmación del CRM */}
            {step === 4 && (
              <div style={{ textAlign: "center", color: "green" }}>
                <h3>¡Solicitud Recibida en el Sistema CRM!</h3>
                <p>
                  Tu orden ha sido guardada de manera relacional. El
                  administrador revisará las existencias, asignará el costo del
                  flete de ser necesario y se te notificará vía correo
                  electrónico para proceder con el pago.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
