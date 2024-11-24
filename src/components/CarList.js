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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={styles.list}>
            {cars.map((car) => (
                <CarCard key={car.carId} car={car} />
            ))}
        </div>
    );
};

const styles = {
    list: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        margin: "20px",
    },
};

export default CarList;
