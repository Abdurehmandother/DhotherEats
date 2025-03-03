import React from "react";

export default function PaypalButton({ order }) {
  return (
    <PaypalScriptProvider
      options={{
        clientId:
          "AY9yVsCNKwRq_BoPIG57B0GmGinOZ8LngmW6IwE_oMYduMu1xvPXo0t2rL6ThAorVHPv-qLX_ih6tlSk",
      }}
    >
      <btn className="btn btn-success"></btn>
    </PaypalScriptProvider>
  );
}

const createOrder = (data, actios) => {
  return useActionState.order.create({
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
  } catch (error) {}
};
