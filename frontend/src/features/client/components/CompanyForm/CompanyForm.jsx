// src/features/client/components/CompanyForm/CompanyForm.jsx
import React from "react";
import { useCompanyForm } from "../../hooks/useCompanyForm";
import { CheckoutStepper } from "@/features/cart/components/CheckoutStepper/CheckoutStepper";
import { InputField } from "@components/ui/InputField/InputField";
import "./CompanyForm.css";

export const CompanyForm = ({
  initialData,
  nextStep,
  prevStep,
  theme = "light",
}) => {
  const {
    datosEmpresa = {},
    errores = {},
    formError,
    handleInputChange,
    manejarEnvioPedido,
  } = useCompanyForm({ initialData, onSubmit: nextStep });

  // 🎨 Diccionario dinámico de temas para reutilizar el formulario en cualquier fondo
  const themeStyles = {
    dark: "bg-disnal-black-soft text-white shadow-disnal-deep border border-disnal-red/45",
    light:
      "bg-disnal-soft text-disnal-ink shadow-sm border border-disnal-line/40",
  };

  const isDark = theme === "dark";

  return (
    <section
      className="company-form-section"
      aria-labelledby="company-form-title"
    >
      <CheckoutStepper currentStep={1} />

      {/* Inyectamos el tema de forma dinámica sin duplicar archivos CSS */}
      <form
        className={`company-form ${themeStyles[theme]}`}
        onSubmit={manejarEnvioPedido}
        noValidate
      >
        <h1
          id="company-form-title"
          className={isDark ? "text-white" : "text-disnal-ink"}
        >
          Datos de empresa
        </h1>

        {formError && (
          <p
            className={`company-form__error ${isDark ? "text-red-300" : "text-disnal-red"}`}
            role="alert"
          >
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
            theme={theme} // ← Le pasamos el tema al input para que cambie sus colores internos
            required
          />
          <InputField
            label="RUC / NIT"
            name="nitRuc"
            placeholder="Escribe el RUC / NIT"
            value={datosEmpresa.nitRuc || ""}
            onChange={handleInputChange}
            error={errores.nitRuc}
            theme={theme}
            required
          />
          <InputField
            className="company-form__full"
            label="Nombre de contacto"
            name="nombreContacto"
            placeholder="Nombre de tu contacto"
            value={datosEmpresa.nombreContacto || ""}
            onChange={handleInputChange}
            error={errores.nombreContacto}
            theme={theme}
            required
          />
          <InputField
            label="Correo empresarial"
            name="correo"
            type="email"
            placeholder="ejemplo@empresa.com"
            value={datosEmpresa.correo || ""}
            onChange={handleInputChange}
            error={errores.correo}
            theme={theme}
            required
          />
          <InputField
            label="Teléfono"
            name="telefono"
            type="tel"
            placeholder="Escribe el teléfono"
            value={datosEmpresa.telefono || ""}
            onChange={handleInputChange}
            error={errores.telefono}
            theme={theme}
            required
          />
          <InputField
            className="company-form__full"
            label="Comentarios adicionales"
            name="necesidadesEspecificas"
            as="textarea"
            placeholder="Escribe tu mensaje opcional"
            value={datosEmpresa.necesidadesEspecificas || ""}
            onChange={handleInputChange}
            theme={theme}
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
