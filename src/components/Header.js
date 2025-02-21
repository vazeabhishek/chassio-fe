import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    // TODO: Implement your search logic here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link
        className="navbar-brand ms-4"
        style={{
          color: "#FF8C00",
          fontSize: "3rem",
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: "bold",
        }}
        to="/"
      >
        Chassio
      </Link>
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
        {/* Search Bar (Centered and Wide) */}
        <form className="form-inline mx-auto w-50" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-warning" type="submit">
            <i className="fas fa-search" />
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto align-items-center">
          {isLoggedIn ? (
            <li className="nav-item d-flex flex-column align-items-center">
              <span
                className="text-white mb-2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Welcome, {user?.name || "User"}!
              </span>
              <button
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
                onClick={handleSignOut} // handleSignOut is here!
              >
                Sign out
              </button>
            </li>
          ) : (
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
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;