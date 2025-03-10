import React, { useEffect, useState } from "react";
import SearchFilter from "../SearchFilter/SearchFilter";
import Tags from "../Tags/Tags";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../Services/FoodServices";

export default function Thumbnail() {
  const navigate = useNavigate();
  const [fav, setFav] = useState({});
  const [foods, setFood] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAll();
        setFood(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    }

    fetchData();
  }, []);

  const handleFilterChange = (filterFoods) => {
    setFood(filterFoods);
  };

  const handleCardClick = (id) => {
    navigate(`food/${id}`);
  };

  const toggleFav = (id) => {
    setFav((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  return (
    <div>
      <SearchFilter foods={foods} setFood={handleFilterChange} />
      <Tags foods={foods} setFood={handleFilterChange} />

      <div className="container d-flex pt-5 pb-5 flex-wrap gap-4 justify-content-center">
        {foods.map((food) => {
          return (
            <div
              className="card"
              style={{ width: "18rem", cursor: "pointer" }}
              key={food.id}
              onClick={() => handleCardClick(food.id)}
            >
              <img src={food.imageUrl} className="card-img-top" alt="..." />
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
                        <li
                          key={origin}
                          className="pe-2"
                          style={{ fontSize: "14px" }}
                        >
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
    </div>
  );
}
