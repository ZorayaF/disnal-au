// src/components/sections/CatalogFilters.jsx
import { useCatalogFilters } from "@hooks/useCatalogFilters";

export const CatalogFilters = ({ productos, onAplicarFiltros }) => {
  const {
    categoriasDisponibles,
    marcasDisponibles,
    presentacionesDisponibles,
    categoriasSeleccionadas,
    marcasSeleccionadas,
    presentacionesSeleccionadas,
    toggleCategoria,
    toggleMarca,
    togglePresentacion,
  } = useCatalogFilters(productos, onAplicarFiltros);

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "15px", background: "#fff" }}
    >
      <h2>FILTROS LATERALES</h2>
      <hr />

      {/* --- SECCIÓN 1: CATEGORÍAS --- */}
      <div>
        <h4>Categorías</h4>
        {categoriasDisponibles.map((cat) => (
          <label key={cat.id} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={categoriasSeleccionadas.includes(cat.id)}
              onChange={() => toggleCategoria(cat.id)}
            />
            {cat.nombre}
          </label>
        ))}
      </div>
      <br />

      {/* --- SECCIÓN 2: MARCAS  --- */}
      <div>
        <h4>Marcas</h4>
        {marcasDisponibles.map((marca) => (
          <label
            key={marca.id}
            style={{ display: "block", marginBottom: "5px" }}
          >
            <input
              type="checkbox"
              checked={marcasSeleccionadas.includes(marca.id)}
              onChange={() => toggleMarca(marca.id)}
            />
            {marca.nombre}
          </label>
        ))}
      </div>
      <br />

      {/* --- SECCIÓN 3: PRESENTACIONES  --- */}
      <div>
        <h4>Presentación</h4>
        {presentacionesDisponibles.map((pres) => (
          <label
            key={pres.id}
            style={{ display: "block", marginBottom: "5px" }}
          >
            <input
              type="checkbox"
              checked={presentacionesSeleccionadas.includes(pres.id)}
              onChange={() => togglePresentacion(pres.id)}
            />
            {pres.nombre}
          </label>
        ))}
      </div>
    </div>
  );
};
