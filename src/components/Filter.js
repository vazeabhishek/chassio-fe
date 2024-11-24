import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/apiConfig";

const Filter = () => {
    const [cities, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null); // State to track selected city

    useEffect(() => {
        // Replace the URL with your API endpoint
        fetch(`${API_ENDPOINTS.data}/cities`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch city data");
                }
                return response.json();
            })
            .then((data) => {
                setCityList(data.data); // Assuming 'data' contains the city list
            })
            .catch((err) => {
                console.error("Error fetching cities:", err);
            });
    }, []);

    // Function to handle city selection
    const handleCityClick = (city) => {
        setSelectedCity(city); // Set the selected city in the state
        console.log(`City selected: ${city}`);
        // You can add logic to filter cars based on the selected city
    };

    return (
        <div className="container my-4">
            <div className="row g-4">
                <nav className="nav">
                    {cities.map((city, index) => (
                        <a
                            key={index}
                            className={`nav-link ${selectedCity === city ? 'active' : ''}`} // Apply 'active' manually
                            href="#"
                            onClick={() => handleCityClick(city)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedCity === city ? 'black' : '', // Optional custom styles
                                color: selectedCity === city ? 'white' : '', // Custom color for selected city
                                borderRadius: '12px', // Rounded corners
                                padding: '8px 12px',// Custom color for selected city
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
