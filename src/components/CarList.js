import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace the URL with your API endpoint
        fetch("http://localhost:8080/cars?carStatusType=NEW")
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

    // Handle Like action
    const handleLike = (carId) => {
        fetch(`http://localhost:8080/cars/${carId}/like`, {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Car liked successfully");
                } else {
                    throw new Error("Failed to like car");
                }
            })
            .catch((err) => console.error(err));
    };

    // Handle Dislike action
    const handleDislike = (carId) => {
        fetch(`http://localhost:8080/cars/${carId}/dislike`, {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Car disliked successfully");
                } else {
                    throw new Error("Failed to dislike car");
                }
            })
            .catch((err) => console.error(err));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-4">
            <div className="row g-4">
                {cars.map((car) => (
                    <div className="col-md-4" key={car.carId}>
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
