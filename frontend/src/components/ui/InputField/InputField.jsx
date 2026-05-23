// src/components/ui/InputField.jsx

export const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error = "",
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {/* 1. ETIQUETA DEL INPUT (Label) */}
      {label && (
        <label className="font-sans text-sm font-semibold text-text-body flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* 2. CAJA DE ENTRADA (Input) */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-2.5 font-sans text-sm rounded-lg border bg-bg-surface text-text-title
          placeholder:text-text-muted transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-border-component focus:ring-action-primary/20 focus:border-action-primary"
          }
        `}
      />

      {/* 3. MENSAJE DE ERROR (Si aplica) */}
      {error && (
        <span className="font-sans text-xs text-red-500 font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
};
