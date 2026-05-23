// src/components/ui/Toggle.jsx
export const Toggle = ({ checked, onChange, label, disabled = false }) => {
  return (
    <label
      className={`flex items-center gap-3 font-sans text-sm font-semibold text-text-body ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* Contenedor del Switch */}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer" // Oculta el checkbox nativo pero mantiene la accesibilidad
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        {/* Fondo del Toggle */}
        <div className="w-11 h-6 bg-border-component rounded-full peer peer-focus:ring-2 peer-focus:ring-action-primary/30 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 transition-colors"></div>
      </div>

      {/* Texto descriptivo */}
      {label && <span>{label}</span>}
    </label>
  );
};
