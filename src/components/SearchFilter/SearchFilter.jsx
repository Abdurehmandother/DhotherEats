import React, { useState } from "react";
import axios from "axios";

export default function SearchFilter({ setFood }) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);

    try {
      if (val === "") {
        const { data } = await axios.get("http://localhost:5000/api/foods");
        setFood(data);
      } else {
        const { data } = await axios.get(
          `http://localhost:5000/api/foods/search/${val}`
        );
        setFood(data);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  return (
    <div className="input-group mb-3 pt-5 d-flex justify-content-center">
      <div className="input-group mb-3" style={{ maxWidth: "700px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Dish"
          aria-label="Search Food"
          aria-describedby="basic-addon2"
          style={{ padding: "13px" }}
          onChange={onChange}
          value={searchTerm}
        />
        <div className="btn btn-danger px-5" style={{ cursor: "default" }}>
          Search
        </div>
      </div>
    </div>
  );
}
