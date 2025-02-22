import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    // Load models and makes from localStorage
    const storedData = localStorage.getItem("uiStaticData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.data?.modelList) {
          setModels(parsedData.data.modelList);
        }
        if (parsedData?.data?.makeList) {
          setMakes(parsedData.data.makeList);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      // Filter models and makes based on the search term
      const filteredModels = models.filter((model) =>
        model.toLowerCase().includes(query.toLowerCase())
      );
      const filteredMakes = makes.filter((make) =>
        make.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions([...filteredMakes, ...filteredModels]); // Combine both
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
  
    if (!searchTerm.trim()) return; // Prevent empty searches
  
    const formattedQuery = searchTerm.trim().split(" ").join("+");
    const apiUrl = `/public/cars/search?query=${formattedQuery}`;
  
    try {
      const response = await customFetch(apiUrl, { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      console.log("Search results:", data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  
    setSuggestions([]); // Hide suggestions after submitting
  };
  

  const handleSuggestionClick = (value) => {
    setSearchTerm(value); // Fill search box with selected suggestion
    setSuggestions([]); // Hide suggestions
  };

  const handleSignOut = () => {
    logout();
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
        {/* Search Bar */}
        <form className="form-inline mx-auto w-50 position-relative" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search models or makes..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-warning" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
          {/* Search Suggestions (Dropdown) */}
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </form>
        <ul className="navbar-nav ms-auto align-items-center">
          {isLoggedIn ? (
            <li className="nav-item d-flex flex-column align-items-center">
              <span className="text-white mb-2" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
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