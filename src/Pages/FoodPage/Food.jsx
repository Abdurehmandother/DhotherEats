import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../Services/FoodServices";
import Navbar from "../../components/Header/Navbar";
export default function Food() {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [fav, setFav] = useState({});

  useEffect(() => {
    getById(id)
      .then(setFood)
      .catch(() => {
        console.log("err");
      });
  }, [id]);

  const toggleFav = (id) => {
    setFav((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  return (
    <>
      <Navbar />
      <div className="d-flex pt-5 ">
        {/* Image */}
        <div className="d-flex justify-content-end" style={{ width: "55%" }}>
          <img
            src={`/foods/${food[0]?.imageUrl}`}
            className="card-img-top"
            alt={food[0]?.name}
            style={{ width: "80%" }}
          />
        </div>
        <div style={{ width: "30%", paddingTop: "100px" }}>
          {/* first line */}
          <div className="d-flex justify-content-between">
            <div
              className="container text-start fs-3 fw-bold"
              style={{ paddingLeft: "100px" }}
            >
              {food[0]?.name}
            </div>
            <div className="pt-2">
              {fav[food.id] ? (
                <span
                
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    toggleFav(food.id);
                  }}
                >
                  ❤
                </span>
              ) : (
                <div
                  onClick={() => {
                    toggleFav(food.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/favorite.png" alt="" />
                </div>
              )}
            </div>
          </div>

          {/* 2nd line */}
          <div
            className="container text-start py-3 d-flex gap-3"
            style={{ paddingLeft: "100px" }}
          >
            {food[0]?.origins.map((origin) => {
              return (
                <span
                  className="fs-5 fw-bold p-2"
                  style={{ background: "#bcc1c2" }}
                >
                  {origin}
                </span>
              );
            })}
          </div>

          {/* 3rd Line */}
          <div
            className="container text-start py-2 d-flex gap-3"
            style={{ paddingLeft: "100px" }}
          >
            {food[0]?.tags.map((tag) => {
              return (
                <span
                  className="fs-5 fw-bold p-3 border rounded"
                  style={{ color: "blue" }}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* 4th Line */}
          <div
            className="container text-start py-2 "
            style={{ paddingLeft: "100px" }}
          >
            <p>Time to cook about {food[0]?.cookTime} mints</p>
          </div>

          {/* 5th Line */}
          <div
            className="container text-start  "
            style={{ paddingLeft: "100px" }}
          >
            <p>
              Price: <span className="fs-3 fw-100">{food[0]?.price}£</span>
            </p>
          </div>

          {/* 6th Line */}
          <div className="pt-2 m-auto">
            <div className="btn btn-primary " style={{ width: "60%" }}>
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
