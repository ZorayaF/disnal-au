// src/features/orders/components/OrderItemsDetail.jsx
import React from "react";
import { ClientOrderDetail } from "../ClientOrderDetail";

export const OrderItemsDetail = ({ pedido, estaExpandido }) => {
  if (!estaExpandido) return null;

  return (
    <div className="coc__items-detail-container">
      <ClientOrderDetail pedido={pedido} />
    </div>
  );
};
