import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { createOrder } from "../../Services/orderServices";
import Input from "../../components/Input/InputPage";
import OrderItemsList from "../../components/orderList/OrderItemsList";
import Map from "../../components/map/Map";

export default function CheackoutPage() {
  const cart = useCart();
  const user = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Plz select your Location from the map!");
      return;
    }

    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  return (
    <div className="d-flex my-3">
      <form onSubmit={handleSubmit(submit)} className=" p-4 w-75">
        <div>
          <div className="container p-3">
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
          </div>
          <div className="container p-3 ">
            <Input
              defaultValue={user.address}
              label="Address"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <div className="container">
            <OrderItemsList order={order} />
          </div>
        </div>

        <button className="btn btn-danger">Go To Payment</button>
      </form>
      <div className="p-3 w-50">
        <h2>Choose Your Location</h2>
        <Map
          location={order.addressLatLng}
          onChange={(latlng) => {
            setOrder({ ...order, addressLatLng: latlng });
          }}
        />
      </div>
    </div>
  );
}
