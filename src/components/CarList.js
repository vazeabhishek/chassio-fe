import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import CarCard from "./CarCard";
import API_BASE_URL from '../config/ApiBaseUrl';

const CarList = ({selectedCity}) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    


    useEffect(() => {
        // Replace the URL with your API endpoint
        customFetch(`${API_BASE_URL}/public/cars?carStatusType=NEW`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch car data");
                }
                return response.json();
            })
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleLike = (carId) => {
        customFetch(`${API_BASE_URL}/private/cars/${carId}/react?actionType=LIKE`, {
            method: "PUT",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to like car");
                }
                return response.json(); // Parse the updated car object
            })
            .then((updatedCar) => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.carId === updatedCar.carId ? updatedCar : car
                    )
                );
                console.log("Car liked successfully");
            })
            .catch((err) => console.error(err));
    };
    
    const handleDislike = (carId) => {
        customFetch(`${API_BASE_URL}/private/cars/${carId}/reactx§?actionType=DISLIKE`, {
            method: "PUT",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to dislike car");
                }
                return response.json(); // Parse the updated car object
            })
            .then((updatedCar) => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.carId === updatedCar.carId ? updatedCar : car
                    )
                );
                console.log("Car disliked successfully");
            })
            .catch((err) => console.error(err));
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-4">
            <div className="row g-4">
                {cars
                    .filter((car) =>
                        selectedCity
                            ? car.city.toLowerCase() === selectedCity.toLowerCase()
                            : true
                    )
                    .map((car) => (
                        <div className="col-md-3" key={car.carId}>
                            <CarCard
                                car={car}
                                onLike={handleLike}
                                onDislike={handleDislike}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CarList;
