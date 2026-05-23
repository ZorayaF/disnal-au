// src/components/molecules/SearchBar.jsx
export const SearchBar = ({ onBuscar }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        onChange={(e) => onBuscar(e.target.value)}
        style={{ padding: "6px", width: "250px" }}
      />
    </div>
  );
};
