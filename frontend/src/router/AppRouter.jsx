// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* La barra se renderiza en todas las pantallas */}
      <TemporaryNavbar />

      <Routes>
        {/* 1. RUTAS PÚBLICAS (Cualquier usuario  puede entrar) */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/legal" element={<Legal />} />

        <Route path="/login" element={<Login />} />

        {/* 2. RUTAS PRIVADAS (Solo accesibles con sesión iniciada) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Si en el futuro creas más vistas de admin (como /admin/historial), van aquí dentro */}
        </Route>
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
};
