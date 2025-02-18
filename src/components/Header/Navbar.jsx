import React from "react";
import "./navbar.css";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <ul className="nav">
        <li className="nav-item ">
          <a className="nav-link text-danger fs-4 fw-200" href="/">
            DhotherEats!
          </a>
        </li>
      </ul>

      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link  text-danger fs-4 fw-200" href="#">
            {user?.name}
          </a>
        </li>
        {user ? (
          <li className="nav-item">
            <a
              className="nav-link  text-danger fs-4 fw-200"
              href="#"
              onClick={() => logout()}
            >
              Logout
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <a
              className="nav-link  text-danger fs-4 fw-200"
              href="/login"
              // onClick={() => navigate("/login")}
            >
              Login
            </a>
          </li>
        )}
        <li className="nav-item border bg-secondary">
          <a className="nav-link fs-4 fw-200 text-danger" href="/cart">
            <img src="/basket.png" alt="" width="40px" />
            <span className="p-2 fw-bold">{cart.items.length}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
