// src/components/sections/AdminOverview.jsx
import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";

export const AdminOverview = ({ productos, onEditar, onEliminar }) => {
  return (
    <div className="space-y-6">
      <Title text="Insumos en Inventario" level={3} />

      <div className="overflow-x-auto border border-border-component rounded-xl bg-bg-surface">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="bg-bg-main border-b border-border-component text-text-muted text-sm font-semibold">
              <th className="p-4">Imagen</th>
              <th className="p-4">Producto</th>
              <th className="p-4">Cantidad</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-component text-text-body text-sm">
            {productos.map((prod) => (
              <tr
                key={prod.id}
                className="hover:bg-bg-main/50 transition-colors"
              >
                <td className="p-4">
                  {prod.imagenes && prod.imagenes.length > 0 ? (
                    <img
                      src={prod.imagenes[0]}
                      alt={prod.nombre}
                      className="w-12 h-12 object-cover rounded-md border border-border-component"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-bg-main rounded-md border border-border-component flex items-center justify-center text-xs text-text-muted">
                      Sin foto
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-base">{prod.nombre}</td>
                <td className="p-4">{prod.cantidad} unidades</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      prod.estado === "disponible"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {prod.estado.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEditar(prod)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="muted"
                    size="sm"
                    onClick={() => onEliminar(prod.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
