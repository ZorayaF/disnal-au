import './SortSelector.css';

export const SortSelector = ({ onCambiarOrden }) => (
  <label className="catalog-sort">
    <span>Ordenar por:</span>
    <select onChange={(event) => onCambiarOrden(event.target.value)} defaultValue="destacados">
      <option value="destacados">Más relevante</option>
      <option value="alfabetico-az">Nombre: A-Z</option>
      <option value="alfabetico-za">Nombre: Z-A</option>
      <option value="stock-mayor">Mayor stock</option>
      <option value="stock-menor">Menor stock</option>
    </select>
  </label>
);
