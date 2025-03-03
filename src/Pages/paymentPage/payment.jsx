import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../../Services/orderServices";
import OrderItemsList from "../../components/orderList/OrderItemsList";
import PaypalButton from "../../components/paypal/PaypalButton";

export default function Payment() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => {
      setOrder(data);
    });
  }, []);

  if (!order) return;
  return (
    <form action="" className="container m-5 p-3">
      <h3>Order Form</h3>
      <div className="py-2">
        <div>
          <h5>Name</h5>
          <p>{order.name}</p>
        </div>
        <div>
          <h5>Address</h5>
          <p>{order.address}</p>
          <OrderItemsList order={order} />
        </div>
        <div>
          <PaypalButton order={order} />
        </div>
      </div>
    </form>
  );
}