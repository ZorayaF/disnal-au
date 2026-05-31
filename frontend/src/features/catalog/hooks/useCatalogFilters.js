// src/hooks/useCatalogFilters.js
import { useState, useMemo } from "react";

export const useCatalogFilters = (productos = [], onAplicarFiltros) => {
  // 1.  TAXONOMÍAS DINÁMICAS (Procesadas en tiempo real sin romper el renderizado)
  const {
    categoriasDisponibles,
    marcasDisponibles,
    presentacionesDisponibles,
  } = useMemo(() => {
    if (!Array.isArray(productos) || productos.length === 0) {
      return {
        categoriasDisponibles: [],
        marcasDisponibles: [],
        presentacionesDisponibles: [],
      };
    }

    const categoriasUnicas = [
      ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
    ];
    const marcasUnicas = [
      ...new Set(productos.map((p) => p.marca).filter(Boolean)),
    ];
    const presentacionesUnicas = [
      ...new Set(productos.map((p) => p.presentacion).filter(Boolean)),
    ];

    return {
      categoriasDisponibles: categoriasUnicas.map((cat) => ({
        id: cat,
        nombre: cat,
      })),
      marcasDisponibles: marcasUnicas.map((m) => ({
        id: m,
        nombre: m,
      })),
      presentacionesDisponibles: presentacionesUnicas.map((p) => ({
        id: p,
        nombre: p,
      })),
    };
  }, [productos]);

  // 2. Estados independientes para cada sección del panel de Figma (Siguen intactos)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [presentacionesSeleccionadas, setPresentacionesSeleccionadas] =
    useState([]);

  // 3. Función genérica para hacer el toggle en cualquier arreglo de filtros (Mantiene tu lógica rápida)
  const toggleFiltro = (id, listaActual, setLista) => {
    const nuevasSelecciones = listaActual.includes(id)
      ? listaActual.filter((item) => item !== id)
      : [...listaActual, id];

    setLista(nuevasSelecciones);

    // 4. Despachamos un único objeto compuesto hacia Catalog.jsx
    if (onAplicarFiltros) {
      onAplicarFiltros({
        categorias:
          setLista === setCategoriasSeleccionadas
            ? nuevasSelecciones
            : categoriasSeleccionadas,
        marcas:
          setLista === setMarcasSeleccionadas
            ? nuevasSelecciones
            : marcasSeleccionadas,
        presentaciones:
          setLista === setPresentacionesSeleccionadas
            ? nuevasSelecciones
            : presentacionesSeleccionadas,
      });
    }
  };

  return {
    categoriasDisponibles,
    marcasDisponibles,
    presentacionesDisponibles,
    categoriasSeleccionadas,
    marcasSeleccionadas,
    presentacionesSeleccionadas,
    toggleCategoria: (id) =>
      toggleFiltro(id, categoriasSeleccionadas, setCategoriasSeleccionadas),
    toggleMarca: (id) =>
      toggleFiltro(id, marcasSeleccionadas, setMarcasSeleccionadas),
    togglePresentacion: (id) =>
      toggleFiltro(
        id,
        presentacionesSeleccionadas,
        setPresentacionesSeleccionadas,
      ),
  };
};
