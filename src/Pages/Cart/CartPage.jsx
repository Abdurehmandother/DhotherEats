import React from "react";
import { useCart } from "../../hooks/useCart";

export default function CartPage() {
  const { cart, RemoveFromCart, changeQuantity } = useCart();
  console.log(cart.items);

  return (
    <div>
      <div className="container pt-4">
        <h5 className="text-start">Cart Page</h5>

        {/* cart items */}

        {cart.items && cart.items.length > 0 && (
          <div className="d-flex pt-2">
            <div className="">
              {cart.items.map((item) => {
                return (
                  <div
                    className="p-3 d-flex border rounded"
                    key={item.food.id}
                    style={{ gap: "120px" }}
                  >
                    <img
                      src={item.food.imageUrl}
                      alt=""
                      style={{ width: "15%" }}
                    />
                    <div>{item.food.name}</div>
                    <div className="">
                      <select
                        value={item.quantity}
                        style={{ height: "25px" }}
                        onChange={(e) =>
                          changeQuantity(item, Number(e.target.value))
                        }
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>
                    </div>
                    <div>{item.food.price}£</div>
                    <button
                      className="btn btn-danger p-2 h-75"
                      onClick={() => RemoveFromCart(item.food.id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <div
              className="container border rounded d-flex flex-column justify-content-center align-center"
              style={{ width: "25%", height: "300px" }}
            >
              <p>Count: {cart.totalCount}</p>
              <p>Price: {cart.totalPrice}</p>
              <button className="btn btn-danger">Proceed To Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
