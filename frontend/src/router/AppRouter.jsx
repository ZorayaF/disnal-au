// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "@pages/Home";
import { Catalog } from "@pages/Catalog";
import { ProductView } from "@pages/ProductView";
import { Cart } from "@pages/Cart";
import { Consulting } from "@pages/Consulting";
import { Legal } from "@pages/Legal";
import { Login } from "@pages/Login";
import { AdminDashboard } from "@pages/AdminDashboard";
import { TemporaryNavbar } from "@components/TemporaryNavbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { ChatWidget } from "@components/molecules/ChatWidget";
import { Footer } from "@components/common/Footer";

const RouterContent = () => {
  const location = useLocation();

  // Evaluamos si la ruta actual es del panel de administración
  const esRutaAdmin = location.pathname.startsWith("/admin");

  //  REGLA GLOBAL DE INTERFAZ: Ocultar elementos invasivos en Admin y Login
  const ocultarElementosGlobales =
    esRutaAdmin || location.pathname.startsWith("/login");

  return (
    <>
      {/* La barra se renderiza en todas las pantallas */}
      <TemporaryNavbar />

      <Routes>
        {/* 1. RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<Login />} />

        {/* 2. RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/*  RENDERIZADO CONDICIONAL DEL FOOTER */}
      {!ocultarElementosGlobales && <Footer />}

      {/*  RENDERIZADO CONDICIONAL DE LA BURBUJA GLOBAL DE CHAT */}
      {!ocultarElementosGlobales && <ChatWidget />}
    </>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};
