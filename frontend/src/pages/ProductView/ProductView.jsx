import { useEffect } from 'react';
import { useProductDetail } from '@hooks/useProductDetail';
import { ProductDetail } from '@sections/ProductDetail';
import { RelatedProductCard } from '@components/molecules/RelatedProductCard';
import './ProductView.css';

/* Íconos decorativos de usos del producto */
const USES = [
  {
    label: 'Mantequilla',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="10" rx="2"/>
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="14"/>
      </svg>
    ),
  },
  {
    label: 'Torta de capas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <path d="M12 3c0 0-4 3-4 6h8c0-3-4-6-4-6z"/>
        <line x1="4" y1="15" x2="20" y2="15"/>
      </svg>
    ),
  },
  {
    label: 'Galletas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="14" cy="9" r="1" fill="currentColor"/>
        <circle cx="11" cy="14" r="1" fill="currentColor"/>
        <circle cx="15" cy="13" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Empanada',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
        <path d="M4 12c0 4.4 3.6 8 8 8"/>
        <path d="M12 20c2.2 0 4-3.6 4-8s-1.8-8-4-8"/>
      </svg>
    ),
  },
];

export const ProductView = () => {
  const {
    producto,
    productosRelacionados,
    cargando,
    volverAtras,
    irAlCatalogo,
  } = useProductDetail();

  useEffect(() => {
    document.title = producto
      ? `Disnal AU — ${producto.nombre}`
      : 'Disnal AU — Detalle de Insumo';
  }, [producto]);

  /* ── Estados de carga / error ── */
  if (cargando) {
    return (
      <div className="product-view">
        <div className="product-view__state">
          <p>Cargando especificaciones técnicas…</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="product-view">
        <div className="product-view__state">
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p>El insumo solicitado no existe en el sistema.</p>
            <button
              onClick={irAlCatalogo}
              style={{
                padding: '10px 24px', borderRadius: 999, border: 'none',
                background: '#e30613', color: '#fff', fontWeight: 700,
                cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.06em',
              }}
            >
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-view">
      <div className="product-view__inner">

        {/* ── Barra superior ── */}
        <div className="product-view__topbar">
          <button className="product-view__back" onClick={volverAtras}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver atrás
          </button>
        </div>

        {/* ── Ficha del producto ── */}
        <ProductDetail producto={producto} />

        {/* ── Productos relacionados ── */}
        {productosRelacionados.length > 0 && (
          <section className="product-view__related">
            <h2 className="product-view__related-title">Productos Relacionados</h2>
            <div className="product-view__related-grid">
              {productosRelacionados.map((rel) => (
                <RelatedProductCard key={rel.id} producto={rel} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
