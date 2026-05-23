// src/components/molecules/SortSelector.jsx
export const SortSelector = ({ onCambiarOrden }) => {
  return (
    <div>
      <select
        onChange={(e) => onCambiarOrden(e.target.value)}
        style={{ padding: "6px" }}
      >
        <option value="destacados">Productos Destacados</option>
        <option value="alfabetico-az">Nombre: A-Z</option>
        <option value="alfabetico-za">Nombre: Z-A</option>
        <option value="stock-mayor">Mayor Stock primero</option>
        <option value="stock-menor">Menor Stock primero</option>
      </select>
    </div>
  );
};
