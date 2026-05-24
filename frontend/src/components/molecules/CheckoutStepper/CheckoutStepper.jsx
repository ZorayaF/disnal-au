import './CheckoutStepper.css';

const STEPS = ['Datos de empresa', 'Productos solicitados', 'Confirmación'];

//progreso de la cotizacióm
export const CheckoutStepper = ({ currentStep = 1 }) => {
  return (
    <ol className="checkout-stepper" aria-label="Progreso de la cotización">
      {STEPS.map((label, index) => {
        const step = index + 1;
        return (
          <li className="checkout-stepper__item" key={label}>
            <span className={`checkout-stepper__bubble ${currentStep === step ? 'checkout-stepper__bubble--active' : ''}`}>
              {step}
            </span>
            <span className="checkout-stepper__label">{label}</span>
          </li>
        );
      })}
    </ol>
  ); //proceso cotización
};
