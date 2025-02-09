import React from "react";
import { sample_foods } from "../../Data";

export default function SearchFilter({ foods, setFood }) {
  const onChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setFood(sample_foods);
    } else {
      setFood(
        foods.filter((food) =>
          food.name.toLowerCase().includes(val.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="input-group mb-3 pt-5 d-flex justify-content-center">
      <div className="input-group mb-3" style={{ maxWidth: "700px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Dish"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          style={{ padding: "13px" }}
          onChange={onChange}
        />
        <div className="btn btn-danger px-5" style={{ cursor: "default" }}>
          Search
        </div>
      </div>
    </div>
  );
}
