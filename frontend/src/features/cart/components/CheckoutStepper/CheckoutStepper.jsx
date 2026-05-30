// src/features/cart/components/CheckoutStepper/CheckoutStepper.jsx
import "./CheckoutStepper.css";

const STEPS = ["Datos de empresa", "Productos solicitados", "Confirmación"];

export const CheckoutStepper = ({ currentStep = 1 }) => {
  return (
    <ol className="checkout-stepper" aria-label="Progreso de la cotización">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = currentStep === step;

        return (
          <li className="checkout-stepper__item" key={label}>
            <span
              className={`checkout-stepper__bubble ${
                isActive ? "checkout-stepper__bubble--active" : ""
              }`}
            >
              {step}
            </span>
            <span className="checkout-stepper__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
};
