import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { CartContext } from '@context/CartContext';

const DEFAULT_IMAGE = '/assets/images/donarepa.png';

export const RelatedProductCard = ({ producto }) => {
  const { agregarProducto } = useContext(CartContext);
  const [wasAdded, setWasAdded] = useState(false);

  const image = Array.isArray(producto?.imagenes) && producto.imagenes[0] ? producto.imagenes[0] : DEFAULT_IMAGE;
  const disponible = producto?.estado === 'disponible' && Number(producto?.cantidad) > 0;

  useEffect(() => {
    if (!wasAdded) return undefined;
    const timer = window.setTimeout(() => setWasAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [wasAdded]);

  const handleAddProduct = () => {
    const added = agregarProducto(producto);
    if (added !== false) setWasAdded(true);
  };

  return (
    <article className="relative flex min-h-[178px] flex-col overflow-hidden rounded-[14px] border border-[#df0606] bg-white p-2.5 shadow-[0_14px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.10)]">
      <span className="absolute left-0 top-0 rounded-br-md bg-[#df0606] px-2 py-1 text-[0.38rem] font-black uppercase tracking-[0.12em] text-white">
        {producto?.destacado ? 'Más vendido' : producto?.marca || 'Disnal'}
      </span>

      <Link to={`/product/${producto.id}`} className="mt-5 grid h-[72px] place-items-center" aria-label={`Ver ${producto.nombre}`}>
        <img className="max-h-full max-w-full object-contain" src={image} alt={producto?.nombre || 'Producto relacionado'} loading="lazy" />
      </Link>

      <div className="mt-auto grid gap-1.5">
        <h3 className="line-clamp-2 min-h-[1.55rem] text-[0.5rem] font-black uppercase leading-tight tracking-[0.2em] text-[#df0606]">
          {producto?.nombre}
        </h3>
        <p className="text-[0.44rem] font-black uppercase tracking-[0.08em] text-emerald-600">
          {disponible ? 'Disponible' : 'Consultar stock'}
        </p>
        <p className="truncate text-[0.46rem] font-semibold text-neutral-500">{producto?.presentacion || 'Presentación comercial'}</p>
        <Button
          className="!min-h-7 !w-full !rounded-[999px_999px_999px_0] !px-2 !py-1.5 !text-[0.44rem] !tracking-[0.16em]"
          size="sm"
          variant={wasAdded ? 'primary' : 'dark'}
          onClick={handleAddProduct}
          disabled={!disponible}
        >
          {wasAdded ? 'Agregado ✓' : 'Agregar'}
        </Button>
      </div>
    </article>
  );
};
