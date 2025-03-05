import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import API_BASE_URL from '../config/ApiBaseUrl';

const Filter = ({ setSelectedCity, selectedCity }) => {
  const [cities, setCityList] = useState([]);

  useEffect(() => {
    customFetch(`${API_BASE_URL}/public/data/cities`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch city data");
        }
        return response.json();
      })
      .then((data) => {
        setCityList(data.data);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
      });
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city); // Update the selected city
    console.log(`City selected: ${city}`);
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        <nav className="nav">
          {cities.map((city, index) => (
            <a
              href="#"
              key={index}
              className="nav-link"
              onClick={() => handleCityClick(city)}
              style={{
                color: selectedCity === city ? "white" : "#FF6600", // White text for selected city
                fontSize: "1rem",
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: "600",
                transition: "all 0.3s ease",
                border: selectedCity === city ? "2px solid #FF6600" : "none", // Border for selected city
                borderRadius: "12px", // Rounded corners
                padding: "5px 15px", // Padding inside the rectangle
                backgroundColor: selectedCity === city ? "#FF6600" : "transparent", // Background color for selected city
                cursor: "pointer", // Change cursor to indicate it's clickable
              }}
            >
              {city}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Filter;
