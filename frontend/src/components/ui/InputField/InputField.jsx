// src/components/ui/InputField/InputField.jsx
import React from "react";
import "./InputField.css";

export const InputField = ({
  label,
  id,
  name,
  error,
  as = "input",
  className = "",
  required,
  icon,
  theme = "light", // ← Recibe el tema del contenedor ('light' o 'dark')
  ...props
}) => {
  const fieldId = id || name;
  const Control =
    as === "textarea" ? "textarea" : as === "select" ? "select" : "input";

  const isDark = theme === "dark";

  // 🎨 Mapeo de estilos dinámicos según el fondo del formulario
  const controlThemeStyles = isDark
    ? "bg-[#3f3f3f] text-white border-gray-600 focus:text-disnal-ink" // Modo Oscuro (Como tu Login administrativo)
    : "bg-[#f8f8f8] text-disnal-ink border-black/20"; // Modo Claro (Para la Landing o Cotizador)

  const errorThemeStyles = isDark
    ? "text-red-300" // Rosa suave de alta legibilidad sobre fondo negro
    : "text-disnal-red font-extrabold"; // Rojo corporativo fuerte sobre fondo blanco

  return (
    <label className={`disnal-field ${className}`.trim()} htmlFor={fieldId}>
      {label && (
        <span className="disnal-field__label">
          {label}
          {required && (
            <span className="text-disnal-red" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
      )}

      <div
        className={`disnal-field__input-wrapper ${
          as === "textarea" ? "disnal-field__input-wrapper--textarea" : ""
        } ${icon ? "disnal-field__input-wrapper--has-icon" : ""}`.trim()}
      >
        {icon && (
          <span className="disnal-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <Control
          id={fieldId}
          name={name}
          className={`disnal-field__control ${controlThemeStyles}`}
          aria-invalid={Boolean(error)}
          required={required}
          {...props}
        />
      </div>

      {error && (
        <small className={`disnal-field__error ${errorThemeStyles}`}>
          {error}
        </small>
      )}
    </label>
  );
};

