import React from "react";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { pay } from "../../Services/orderServices";
import { useNavigate } from "react-router-dom";

export default function PaypalButtons({ order }) {
  console.log("object is: ", order);
  if (!order) {
    return <div>Error: Order data is missing.</div>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AY9yVsCNKwRq_BoPIG57B0GmGinOZ8LngmW6IwE_oMYduMu1xvPXo0t2rL6ThAorVHPv-qLX_ih6tlSk",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success("Payment Successfully saved, Success");
      navigate("/track/" + orderId);
    } catch (error) {
      toast.error("Payment Failed, Error");
    }
  };

  const onError = (err) => {
    toast.error("Payment Failed, Error");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
