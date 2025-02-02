import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth(); // Get values from AuthContext

  const handleSignOut = () => {
    logout(); // Use logout function from context
    navigate("/login");
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
        to="/" // Changed from <a href="/"> to <Link to="/">
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
        <ul className="navbar-nav ms-auto align-items-center">
          {isLoggedIn ? (
            // If user is logged in, show "Welcome {username}" and "Sign out" button
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
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </li>
          ) : (
            // If user is not logged in, show "Sign in" and "Sign up" buttons
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
