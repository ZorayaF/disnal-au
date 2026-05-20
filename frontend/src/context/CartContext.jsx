// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializar el estado cargando lo que esté en localStorage o un array vacío
  const [carrito, setCarrito] = useState(() => {
    const datosGuardados = localStorage.getItem("disnal_cart");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // Cada vez que el carrito cambie, lo respaldamos en el LocalStorage
  useEffect(() => {
    localStorage.setItem("disnal_cart", JSON.stringify(carrito));
  }, [carrito]);

  // 1. FUNCIÓN: Agregar producto o sumar cantidad (Validando Stock)
  const agregarProducto = (producto) => {
    if (producto.estado === "no disponible" || producto.cantidad <= 0) return;

    setCarrito((prevCart) => {
      const existe = prevCart.find((item) => item.id === producto.id);

      if (existe) {
        // Si al sumar uno superamos el stock real del backend, bloqueamos la acción
        if (existe.cantidadEnCarrito >= producto.cantidad) {
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidadEnCarrito: item.cantidadEnCarrito + 1 }
            : item,
        );
      }

      // Si es la primera vez que se agrega, inicializamos su contador en 1
      return [...prevCart, { ...producto, cantidadEnCarrito: 1 }];
    });
  };

  // 2. FUNCIÓN: Restar cantidad (No baja de 1)
  const restarProducto = (id) => {
    setCarrito((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.cantidadEnCarrito > 1
          ? { ...item, cantidadEnCarrito: item.cantidadEnCarrito - 1 }
          : item,
      ),
    );
  };

  // 3. FUNCIÓN: Eliminar un artículo por completo
  const eliminarProducto = (id) => {
    setCarrito((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 4. FUNCIÓN: Limpiar la canasta
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // 5. CÁLCULOS AUTOMÁTICOS: Totales de la orden
  const totalItems = carrito.reduce(
    (acc, item) => acc + item.cantidadEnCarrito,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarProducto,
        restarProducto,
        eliminarProducto,
        limpiarCarrito,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
