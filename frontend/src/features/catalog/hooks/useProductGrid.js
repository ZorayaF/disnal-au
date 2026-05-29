// src/hooks/useProductGrid.js
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@config/api"; // 1. Importamos la constante global

const PRODUCTOS_POR_PAGINA = 6;

// Función utilitaria para normalizar texto (ej: "Haz de Oros" -> "haz-de-oros")
const transformarASlug = (texto) => {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos de forma segura
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-"); // Reemplaza espacios por guiones
};

export const useProductGrid = (
  filtros = { categorias: [], marcas: [], presentaciones: [] }, // 2. Recibe el objeto compuesto de Figma
  terminoBusqueda = "",
  criterioOrden = "alfabetico-az",
) => {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productosProcesados, setProductosProcesados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 1. Cargar productos desde la API al iniciar
  useEffect(() => {
    const obtenerProductosBackend = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`${API_BASE_URL}/productos`);

        if (!respuesta.ok) {
          throw new Error("No se pudo conectar con el servidor.");
        }

        const datos = await respuesta.json();
        const listaProductos = datos.productos || datos;

        setProductosOriginales(listaProductos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosBackend();
  }, []);

  // 2. Pipeline de Procesamiento Compuesto: Filtros cruzados + Ordenamiento
  useEffect(() => {
    let resultado = [...productosOriginales];

    const { categorias = [], marcas = [], presentaciones = [] } = filtros;

    // PASO A: Filtrar por Categorías (Multiselección)
    if (categorias.length > 0) {
      resultado = resultado.filter((p) => categorias.includes(p.categoria));
    }

    // PASO B: Filtrar por Marcas (Figma Sidebar - Normalizado)
    if (marcas.length > 0) {
      resultado = resultado.filter((p) =>
        marcas.includes(transformarASlug(p.marca)),
      );
    }

    // PASO C: Filtrar por Presentaciones (Figma Sidebar - Normalizado)
    if (presentaciones.length > 0) {
      resultado = resultado.filter((p) =>
        presentaciones.includes(transformarASlug(p.presentacion)),
      );
    }

    // PASO D: Filtrar por Término de Búsqueda de la Barra de Herramientas
    if (terminoBusqueda.trim() !== "") {
      const terminoClean = terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter((p) =>
        p.nombre.toLowerCase().includes(terminoClean),
      );
    }

    // PASO E: Criterios de Ordenamiento
    if (criterioOrden === "alfabetico-az") {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (criterioOrden === "alfabetico-za") {
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (criterioOrden === "stock-mayor") {
      resultado.sort((a, b) => b.cantidad - a.cantidad);
    } else if (criterioOrden === "stock-menor") {
      resultado.sort((a, b) => a.cantidad - b.cantidad);
    } else if (criterioOrden === "destacados") {
      resultado.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    setProductosProcesados(resultado);
    setPaginaActual(1); // Reset automático a la página 1 ante cualquier mutación de filtros
  }, [filtros, terminoBusqueda, criterioOrden, productosOriginales]);

  // 3. Paginación Matemática
  const totalPaginas = Math.ceil(
    productosProcesados.length / PRODUCTOS_POR_PAGINA,
  );
  const indiceUltimoProducto = paginaActual * PRODUCTOS_POR_PAGINA;
  const indicePrimerProducto = indiceUltimoProducto - PRODUCTOS_POR_PAGINA;

  const productosPaginados = productosProcesados.slice(
    indicePrimerProducto,
    indiceUltimoProducto,
  );

  return {
    productos: productosPaginados,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
  };
};
