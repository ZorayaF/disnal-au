// src/components/sections/CheckoutSuccess.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import styles from "./CheckoutSuccess.module.css";

export const CheckoutSuccess = () => {
  const { limpiarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  // Limpiamos el carrito al montar esta pantalla
  useEffect(() => {
    limpiarCarrito();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Ícono animado de check */}
      <div className={styles.iconRing}>
        <svg
          className={styles.checkIcon}
          viewBox="0 0 52 52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className={styles.checkCircle} cx="26" cy="26" r="25" fill="none" />
          <path className={styles.checkMark} fill="none" d="M14 27 l9 9 l16-18" />
        </svg>
      </div>

      {/* Textos */}
      <h2 className={styles.title}>¡Solicitud Enviada!</h2>
      <p className={styles.subtitle}>
        Tu cotización fue enviada al equipo comercial de <strong>Disnal AU</strong> vía WhatsApp.
        Pronto recibirás una respuesta con precios y disponibilidad.
      </p>

      {/* Pasos siguientes */}
      <div className={styles.stepsGrid}>
        <div className={styles.stepCard}>
          <span className={styles.stepNumber}>1</span>
          <p>Revisa tu WhatsApp — el mensaje ya fue enviado al asesor.</p>
        </div>
        <div className={styles.stepCard}>
          <span className={styles.stepNumber}>2</span>
          <p>El equipo te contactará para confirmar precios y despacho.</p>
        </div>
        <div className={styles.stepCard}>
          <span className={styles.stepNumber}>3</span>
          <p>Coordinen la entrega según tu ciudad y necesidades.</p>
        </div>
      </div>

      {/* Botón de regreso */}
      <button
        className={styles.ctaButton}
        onClick={() => navigate("/catalog")}
      >
        Volver al Catálogo
      </button>
    </div>
  );
};
