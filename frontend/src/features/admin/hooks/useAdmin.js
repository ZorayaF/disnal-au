import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { crearEstructuraProducto } from "@models/Product";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "@services/productService";

export const useAdmin = () => {
  const { logoutGlobal } = useContext(AuthContext);
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  const cargarInventario = () => {
    obtenerProductos()
      .then((data) => {
        // Tu API optimizada ya inyecta el array "imagenes" listo para la UI
        const listaCruda = data.productos || data;

        const listaFormateada = Array.isArray(listaCruda)
          ? listaCruda.map((prod) => crearEstructuraProducto(prod))
          : [];

        setProductos(listaFormateada);
      })
      .catch((err) =>
        console.error("Error al cargar el inventario comercial:", err),
      );
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const manejarCerrarSesion = () => {
    logoutGlobal();
    navigate("/login");
  };

  const gestionarGuardar = async (datosFormulario) => {
    try {
      // 1. Instanciamos FormData para poder mandar textos y archivos juntos
      const formData = new FormData();

      // 2. Adjuntamos los campos de texto estandarizados al FormData
      formData.append("nombre", datosFormulario.nombre);
      formData.append("cantidad", Number(datosFormulario.cantidad));
      formData.append("estado", datosFormulario.estado);
      formData.append("categoria", datosFormulario.categoria);
      formData.append("marca", datosFormulario.marca);
      formData.append("presentacion", datosFormulario.presentacion);
      formData.append("sku", datosFormulario.sku);
      formData.append("descripcion", datosFormulario.descripcion);
      formData.append("destacado", datosFormulario.destacado ? 1 : 0);
      if (datosFormulario.proteina)
        formData.append("proteina", datosFormulario.proteina);
      if (datosFormulario.humedad)
        formData.append("humedad", datosFormulario.humedad);

      // 3.  EVALUACIÓN MULTIMEDIA INTEGRADA: Buscamos qué tipo de imagen tenemos
      let archivoFisico = null;
      let urlManualTexto = "";

      datosFormulario.imagenes.forEach((img) => {
        if (img instanceof File) {
          archivoFisico = img; // Capturamos el archivo arrastrado/subido
        } else if (typeof img === "string") {
          urlManualTexto = img; // Capturamos la URL escrita a mano
        }
      });

      // 4. Inyectamos las variables correspondientes según lo encontrado
      if (archivoFisico) {
        // "imagen" hace match con upload.single("imagen") en tu nueva ruta Express
        formData.append("imagen", archivoFisico);
      } else if (urlManualTexto) {
        // "url_manual" hace match con el req.body.url_manual de tu controlador
        formData.append("url_manual", urlManualTexto);
      }

      // 5. Despachamos de forma directa al servicio (el payload ahora es el FormData)
      if (productoEnEdicion) {
        await actualizarProducto(productoEnEdicion.id, formData);
        setProductoEnEdicion(null);
      } else {
        await crearProducto(formData);
      }

      // 6. Sincronizamos la interfaz de inmediato
      cargarInventario();
    } catch (error) {
      alert(error.message || "Error al intentar guardar el insumo.");
    }
  };

  const gestionarEliminar = (id) => {
    if (
      confirm("¿Seguro que deseas eliminar este insumo de la base de datos?")
    ) {
      eliminarProducto(id)
        .then(() => cargarInventario())
        .catch((err) => alert(err.message));
    }
  };

  const cancelarEdicion = () => setProductoEnEdicion(null);
  const seleccionarParaEditar = (prod) => setProductoEnEdicion(prod);

  return {
    productos,
    productoEnEdicion,
    manejarCerrarSesion,
    gestionarGuardar,
    gestionarEliminar,
    cancelarEdicion,
    seleccionarParaEditar,
  };
};
