import { useCatalogFilters } from '@hooks/useCatalogFilters';
import './CatalogFilters.css';

const FilterGroup = ({ title, items, selected, onToggle }) => (
  <fieldset className="catalog-filters__group">
    <legend>{title}</legend>
    {items.length === 0 ? <p>Sin opciones</p> : items.map((item) => (
      <label key={item.id}>
        <input type="checkbox" checked={selected.includes(item.id)} onChange={() => onToggle(item.id)} />
        <span>{item.nombre}</span>
      </label>
    ))}
  </fieldset>
);

export const CatalogFilters = ({ productos, onAplicarFiltros }) => {
  const { categoriasDisponibles, marcasDisponibles, presentacionesDisponibles, categoriasSeleccionadas, marcasSeleccionadas, presentacionesSeleccionadas, toggleCategoria, toggleMarca, togglePresentacion } = useCatalogFilters(productos, onAplicarFiltros);

  return (
    <section className="catalog-filters" aria-labelledby="catalog-filters-title">
      <h2 id="catalog-filters-title">Categorías</h2>
      <FilterGroup title="Tipo" items={categoriasDisponibles} selected={categoriasSeleccionadas} onToggle={toggleCategoria} />
      <FilterGroup title="Marca" items={marcasDisponibles} selected={marcasSeleccionadas} onToggle={toggleMarca} />
      <FilterGroup title="Presentación" items={presentacionesDisponibles} selected={presentacionesSeleccionadas} onToggle={togglePresentacion} />
    </section>
  );
};
