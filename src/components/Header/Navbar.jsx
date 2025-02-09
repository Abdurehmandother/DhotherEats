import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <ul className="nav">
        <li className="nav-item ">
          <a className="nav-link text-danger fs-4 fw-200" href="#">
            DhotherEats!
          </a>
        </li>
      </ul>

      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link  text-danger fs-4 fw-200" href="#">
            Ahmad
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-danger fs-4 fw-200" href="#">
            <img src="/basket.png" alt="" width="40px" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
