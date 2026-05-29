import { useCompanyForm } from "@/features/client/hooks/useCompanyForm";
import { CheckoutStepper } from "@/features/cart/components/CheckoutStepper";
import { InputField } from "@components/ui/InputField";
import "./CompanyForm.css";

export const CompanyForm = ({ initialData, nextStep, prevStep }) => {
  const {
    datosEmpresa = {},
    errores = {},
    formError,
    handleInputChange,
    manejarEnvioPedido,
  } = useCompanyForm({ initialData, onSubmit: nextStep });

  return (
    <section
      className="company-form-section"
      aria-labelledby="company-form-title"
    >
      <CheckoutStepper currentStep={1} />
      <form className="company-form" onSubmit={manejarEnvioPedido} noValidate>
        <h1 id="company-form-title">Datos de empresa</h1>
        {formError && (
          <p className="company-form__error" role="alert">
            {formError}
          </p>
        )}
        <div className="company-form__grid">
          <InputField
            label="Nombre de la empresa"
            name="nombreEmpresa"
            placeholder="Nombre de tu empresa"
            value={datosEmpresa.nombreEmpresa || ""}
            onChange={handleInputChange}
            error={errores.nombreEmpresa}
            required
          />
          <InputField
            label="RUC / NIT"
            name="nitRuc"
            placeholder="Escribe el RUC / NIT"
            value={datosEmpresa.nitRuc}
            onChange={handleInputChange}
            error={errores.nitRuc}
            required
          />
          <InputField
            className="company-form__full"
            label="Nombre de contacto"
            name="nombreContacto"
            placeholder="Nombre de tu contacto"
            value={datosEmpresa.nombreContacto}
            onChange={handleInputChange}
            error={errores.nombreContacto}
            required
          />
          <InputField
            label="Correo empresarial"
            name="correo"
            type="email"
            placeholder="ejemplo@empresa.com"
            value={datosEmpresa.correo}
            onChange={handleInputChange}
            error={errores.correo}
            required
          />
          <InputField
            label="Teléfono"
            name="telefono"
            type="tel"
            placeholder="Escribe el teléfono"
            value={datosEmpresa.telefono}
            onChange={handleInputChange}
            error={errores.telefono}
            required
          />
          <InputField
            className="company-form__full"
            label="Comentarios adicionales"
            name="necesidadesEspecificas"
            as="textarea"
            placeholder="Escribe tu mensaje opcional"
            value={datosEmpresa.necesidadesEspecificas}
            onChange={handleInputChange}
          />
        </div>
        <div className="company-form__actions">
          {prevStep && (
            <button type="button" onClick={prevStep}>
              Atrás
            </button>
          )}
          <button type="submit">Continuar</button>
        </div>
      </form>
    </section>
  );
};
