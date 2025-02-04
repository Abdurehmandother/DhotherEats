import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            DhotherEat!
          </a>
        </li>
      </ul>

      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Ahmad
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Cart
          </a>
        </li>
      </ul>
    </nav>
  );
}
