import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/apiConfig";

const Filter = ({ setSelectedCity }) => {
  const [cities, setCityList] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.data}/cities`)
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
    setSelectedCity(city); // Update the selected city in App.js
    console.log(`City selected: ${city}`);
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        <nav className="nav">
          {cities.map((city, index) => (
            <a
              key={index}
              className="nav-link"
              href="#"
              onClick={() => handleCityClick(city)}
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
