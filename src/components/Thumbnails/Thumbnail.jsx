import React, { useState } from "react";
import { sample_foods } from "../../Data";

export default function Thumbnail() {
  const [fav, setFav] = useState({});

  console.log(fav);

  const toggleFav = (id) => {
    setFav((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  return (
    <div className="container d-flex pt-5 pb-5 flex-wrap gap-4 justify-content-center">
      {sample_foods.map((food) => {
        return (
          <div className="card" style={{ width: "18rem" }} key={food.id}>
            <img
              src={`/foods/${food.imageUrl}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{food.name}</h5>
                <div>
                  {fav[food.id] ? (
                    <span
                      style={{ color: "green", cursor: "pointer" }}
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
              <div className="d-flex justify-content-between">
                <ol
                  style={{ listStyle: "none" }}
                  className="d-flex justify-content-between p-0"
                >
                  {food.origins.map((origin) => {
                    return (
                      <li className="pe-2" style={{ fontSize: "14px" }}>
                        {origin}
                      </li>
                    );
                  })}
                </ol>
                <div className="d-flex flex-row">
                  <span>🕒</span>
                  <p>{food.cookTime}</p>
                </div>
              </div>
              <div className="text-start fs-5 fw-100"> {food.price}£ </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
