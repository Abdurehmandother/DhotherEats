import React from "react";
import { useNavigate } from "react-router-dom";

export default function Default() {
  const navgate = useNavigate();

  const handleDefaultPage = () => {
    navgate("/");
  };

  return (
    <div className="pt-5 container">
      <div className="text-center fs-4 fw-100">No page found</div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => handleDefaultPage()}
      >
        Back to Home
      </button>
    </div>
  );
}
