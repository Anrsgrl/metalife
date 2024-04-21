import React from "react";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import OrderPrice from "./components/OrderPrice/OrderPrice";
import { useEffect } from "react";

const Order = () => {
  useEffect(() => {
    document.title = "Sifariş | Metalife";
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  return (
    <div className="order">
      <OrderInfo />
      <OrderPrice />
    </div>
  );
};

export default Order;
