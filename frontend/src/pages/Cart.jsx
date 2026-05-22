// src/pages/Cart.jsx
import { useEffect } from "react";
import { useCartCheckout } from "@hooks/useCartCheckout";
import { CartList } from "@sections/CartList";
import { CompanyForm } from "@sections/CompanyForm";
import { CheckoutSuccess } from "@sections/CheckoutSuccess";
import styles from "./Cart.module.css";

export const Cart = () => {
  const { notificaciones, sincronizando, step, avanzarPaso, ejecutarBarrido } =
    useCartCheckout();

  useEffect(() => {
    document.title = "Disnal AU - Cotización";
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Encabezado ── */}
        <div className={styles.header}>
          <p className={styles.sectionLabel}>Carrito</p>
          <h1 className={styles.title}>Lista de Cotización</h1>
          <p className={styles.subtitle}>
            Revisa bien los productos agregados para realizar la solicitud
          </p>
        </div>

        {/* ── Alertas de stock ── */}
        {notificaciones.length > 0 && step === 1 && (
          <div className={styles.alertBox}>
            <strong>Cambios en tu inventario detectados:</strong>
            <ul>
              {notificaciones.map((nota, idx) => (
                <li key={idx}>{nota}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Flujo de pasos ── */}
        <div className={styles.flowBlock}>
          {sincronizando ? (
            <p className={styles.loadingState}>
              Verificando existencias en tiempo real...
            </p>
          ) : (
            <>
              {step === 1 && (
                <CartList
                  nextStep={() => avanzarPaso(2)}
                  reverificar={ejecutarBarrido}
                />
              )}

              {step === 2 && (
                <CompanyForm
                  nextStep={() => avanzarPaso(3)}
                  prevStep={() => avanzarPaso(1)}
                />
              )}

              {step === 3 && (
                <div style={{ textAlign: "center", padding: "32px" }}>
                  <h3 style={{ color: "#f5f5f5", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Revisión Final
                  </h3>
                  <p style={{ color: "#888", fontSize: "0.85rem" }}>
                    Tus datos y productos están listos para enviar.
                  </p>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px" }}>
                    <button
                      onClick={() => avanzarPaso(2)}
                      style={{
                        background: "transparent",
                        color: "#888",
                        border: "1px solid #444",
                        padding: "10px 24px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => avanzarPaso(4)}
                      style={{
                        background: "#e53e3e",
                        color: "#fff",
                        border: "none",
                        padding: "10px 28px",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Confirmar Envío
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && <CheckoutSuccess />}
            </>
          )}
        </div>

        {/* ── CTA inferior solo en step 1 ── */}
        {step === 1 && !sincronizando && (
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>Enviar Solicitud de Cotización</h2>
            <p className={styles.ctaSubtitle}>
              Completa tus datos para enviar la solicitud a un asesor
            </p>
            <button
              className={styles.ctaButton}
              onClick={() => avanzarPaso(2)}
            >
              Enviar Solicitud
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
