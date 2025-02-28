import React from "react";
import { Link } from "react-router-dom";

export default function OrderItemsList({ order }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan="5" scope="col">
            Order Items
          </th>
        </tr>
      </thead>
      <tbody>
        {order.cart.items.map((item) => (
          <tr key={item.food.id}>
            <td>
              <Link to={`/food/${item.food.id}`}>
                <img
                  src={item.food.imageUrl}
                  alt="asdaa"
                  style={{ width: "100px" }}
                />
              </Link>
            </td>
            <td>{item.food.name}</td>
            <td>{item.food.price}£</td>
            <td>{item.quantity}</td>
          </tr>
        ))}

        <tr className="w-100 border">
          <td colSpan="100%" className="text-center p-4">
            <strong>Total Price: </strong>
            {order.cart.totalPrice}£
          </td>
        </tr>
      </tbody>
    </table>
  );
}
