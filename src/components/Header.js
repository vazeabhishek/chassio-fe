import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        className="navbar-brand ms-4"
        style={{
          color: "#FF8C00",
          fontSize: "3rem",
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: "bold",
        }}
      >
        Chassio
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {/* Login and Signup buttons stacked vertically */}
          <li className="nav-item d-flex flex-column align-items-center">
            <Link
              className="btn mb-2 w-100"
              style={{
                maxWidth: "120px",
                backgroundColor: "#FF8C00",
                color: "black",
                border: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e67e00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF8C00")}
              to="/login"
            >
              Sign in
            </Link>
            <Link
              className="btn w-100"
              style={{
                maxWidth: "120px",
                backgroundColor: "#FF8C00",
                color: "black",
                border: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e67e00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF8C00")}
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
