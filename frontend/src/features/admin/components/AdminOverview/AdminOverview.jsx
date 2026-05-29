import { LineIcon } from '@components/ui/LineIcon';
import './AdminOverview.css';

const fallbackImage = '/assets/images/harina de trigo.png';

const getStatus = (product) => {
  if (product.estado === 'no disponible' || Number(product.cantidad) <= 0) return { label: 'No Disponible', className: 'is-unavailable' };
  if (Number(product.cantidad) <= 5) return { label: 'Stock Bajo', className: 'is-low' };
  return { label: 'Disponible', className: 'is-available' };
};

export const AdminOverview = ({ productos = [], onEditar, onEliminar }) => {
  return (
    <section className="admin-overview" aria-labelledby="admin-overview-title">
      <header className="admin-overview__header">
        <div>
          <span aria-hidden="true" />
          <h2 id="admin-overview-title">Insumos en inventario</h2>
        </div>
        <a href="/admin">Volver</a>
      </header>

      <div className="admin-overview__columns" aria-hidden="true">
        <span>Imagen</span>
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Estado</span>
        <span>Acciones</span>
      </div>

      <div className="admin-overview__list">
        {productos.length === 0 ? (
          <p className="admin-overview__empty">No hay insumos registrados.</p>
        ) : (
          productos.map((product) => {
            const status = getStatus(product);
            const image = Array.isArray(product.imagenes) && product.imagenes[0] ? product.imagenes[0] : fallbackImage;
            return (
              <article className="admin-inventory-row" key={product.id}>
                <img src={image} alt={product.nombre} loading="lazy" />
                <div className="admin-inventory-row__product">
                  <h3>{product.nombre}</h3>
                  <p>{product.presentacion || product.categoria}</p>
                  <small>{product.marca || 'Sin marca'}</small>
                </div>
                <strong className="admin-inventory-row__stock">{Number(product.cantidad) || 0}</strong>
                <span className={`admin-inventory-row__status ${status.className}`}>{status.label}</span>
                <div className="admin-inventory-row__actions">
                  <button type="button" onClick={() => onEliminar(product.id)} aria-label={`Eliminar ${product.nombre}`}><LineIcon name="trash" /></button>
                  <button type="button" onClick={() => onEditar(product)} aria-label={`Editar ${product.nombre}`}><LineIcon name="edit" /></button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
