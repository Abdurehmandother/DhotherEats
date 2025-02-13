import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../Services/FoodServices";
import Navbar from "../../components/Header/Navbar";
import { useCart } from "../../hooks/useCart";

export default function Food() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [fav, setFav] = useState({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFood() {
      try {
        const data = await getById(id);
        setFood(data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    }
    fetchFood();
  }, [id]);

  const toggleFav = () => {
    setFav((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCartClick = () => {
    if (food) {
      addToCart(food);
      navigate("/cart");
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Section - Food Image */}
          <div className="col-lg-6 text-center">
            <img
              src={`/foods/${food.imageUrl}`}
              className="img-fluid rounded"
              alt={food.name}
              style={{ maxWidth: "80%" }}
            />
          </div>

          {/* Right Section - Food Details */}
          <div className="col-lg-6">
            {/* Title & Favorite */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold">{food.name}</h2>
              <div onClick={toggleFav} style={{ cursor: "pointer" }}>
                {fav[id] ? "❤️" : <img src="/favorite.png" alt="Favorite" />}
              </div>
            </div>

            {/* Origins */}
            <div className="mb-3">
              {food.origins.map((origin) => (
                <span key={origin} className="badge bg-secondary me-2 fs-6">
                  {origin}
                </span>
              ))}
            </div>

            {/* Additional Information (Tags, Cook Time, Price) */}
            <div className="d-flex flex-column gap-3">
              {/* Tags */}
              <div className="d-flex align-items-center gap-2">
                <strong>Tags:</strong>
                {food.tags.map((tag) => (
                  <span key={tag} className="badge bg-primary fs-6">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cook Time */}
              <div className="d-flex align-items-center gap-2">
                <strong>Cook Time:</strong>
                <span className="fs-5">{food.cookTime} minutes</span>
              </div>

              {/* Price */}
              <div className="d-flex align-items-center gap-2">
                <strong>Price:</strong>
                <span className="fs-4 fw-bold text-success">{food.price}£</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleCartClick}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
