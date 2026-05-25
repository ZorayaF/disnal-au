import './SearchBar.css';

export const SearchBar = ({ onBuscar }) => (
  <label className="catalog-search">
    <span className="catalog-search__sr">Buscar producto</span>
    <input type="search" placeholder="Buscar producto..." onChange={(event) => onBuscar(event.target.value)} />
  </label>
);
