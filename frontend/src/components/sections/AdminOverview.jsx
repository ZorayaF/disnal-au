// src/components/sections/AdminOverview.jsx

export const AdminOverview = ({ productos, onEditar, onEliminar }) => {
  return (
    <div
      style={{ padding: "10px", background: "#fff", border: "1px solid #ccc" }}
    >
      <h3>Insumos en Inventario (Vista de Control)</h3>
      <hr />

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}
      >
        <thead>
          <tr style={{ background: "#eee", textAlign: "left" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Imagen</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>
              Producto
            </th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>
              Detalles Base
            </th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>
              Cantidad / Stock
            </th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Estado</th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                textAlign: "right",
              }}
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
              {/* Celda de previsualizacion de imagen */}
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                {prod.imagenes && prod.imagenes.length > 0 ? (
                  <img
                    src={prod.imagenes[0]}
                    alt={prod.nombre}
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "11px", color: "#999" }}>
                    Sin foto
                  </span>
                )}
              </td>

              {/* Informacion de nombre e identificador */}
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                <strong>{prod.nombre}</strong>
                <br />
                <span style={{ fontSize: "11px", color: "#666" }}>
                  ID: #{prod.id}
                </span>
              </td>

              {/* Atributos taxonomicos añadidos */}
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  fontSize: "12px",
                }}
              >
                <p style={{ margin: 0 }}>Cat: {prod.categoria}</p>
                <p style={{ margin: 0 }}>Marca: {prod.marca}</p>
                <p style={{ margin: 0 }}>Empaque: {prod.presentacion}</p>
              </td>

              {/* Existencias fisicas en bodega */}
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                {prod.cantidad} unidades
              </td>

              {/* Estado de visibilidad y estrategia de destacado */}
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: prod.estado === "disponible" ? "green" : "red",
                  }}
                >
                  {prod.estado.toUpperCase()}
                </span>
                {prod.destacado && (
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "purple",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    ★ DESTACADO
                  </p>
                )}
              </td>

              {/* Botonera de acciones directas conectadas a los callbacks del contenedor */}
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  textAlign: "right",
                }}
              >
                <button
                  onClick={() => onEditar(prod)}
                  style={{ marginRight: "5px", padding: "4px 8px" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(prod.id)}
                  style={{ padding: "4px 8px", color: "red" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
