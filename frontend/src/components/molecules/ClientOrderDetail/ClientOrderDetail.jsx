import { useEffect, useState } from "react";
import { API_BASE_URL } from "@config/api";
import "./ClientOrderDetail.css";

export const ClientOrderDetail = ({ pedidoId }) => {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Nota: Aunque los pedidos globales se filtran, el administrador ya expone
    // los detalles de manera relacional. En producción puedes crear un endpoint dedicado
    // a los detalles (/api/pedidos/detalle/:id). Aquí simularemos la lectura segura:
    const cargarDetalles = async () => {
      try {
        const respuesta = await fetch(`${API_BASE_URL}/pedidos/admin/lista`);
        const datos = await respuesta.json();

        // Buscaremos los detalles guardados en el mock relacional o la BD
        // En una arquitectura madura, el backend retorna los detalles directamente.
        console.log("Cargando desglose de insumos para pedido:", pedidoId);

        // Mock defensivo por si aún no migras el endpoint específico de detalles
        setItems([
          {
            id: 1,
            nombre_producto: "Harina de Trigo Especial Hojaldre (25kg)",
            presentacion: "Bulto",
            cantidad: 4,
          },
          {
            id: 2,
            nombre_producto: "Azúcar Pulverizada Extrafina (5kg)",
            presentacion: "Unidad",
            cantidad: 2,
          },
        ]);
      } catch (err) {
        console.error("Error al obtener insumos de la orden:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDetalles();
  }, [pedidoId]);

  if (cargando)
    return (
      <p className="client-order-detail__loading">
        Cargando desglose de insumos...
      </p>
    );

  return (
    <div className="client-order-detail">
      <h4 className="client-order-detail__title">
        📦 Detalle de Insumos Solicitados
      </h4>
      <table className="client-order-detail__table">
        <thead>
          <tr>
            <th>Producto / Materia Prima</th>
            <th>Presentación</th>
            <th className="text-right">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>
                <strong>{item.nombre_producto}</strong>
              </td>
              <td>
                <span className="client-order-detail__badge-pres">
                  {item.presentacion || "N/A"}
                </span>
              </td>
              <td className="text-right font-bold">{item.cantidad} unds</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
