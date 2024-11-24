import React from "react";

const CarCard = ({ car }) => {
    return (
        <div style={styles.card}>
            <img src={car.imageLinks[0]} alt={car.name} style={styles.img} />
            <h3>{car.id}</h3>
            <p>{car.make}</p>
            <p>{car.model}</p>
            <p>{car.askPrice}</p>
            <button style={styles.button}>Send Interest</button>
        </div>
    );
};

const styles = {
    card: {
        width: "250px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    img: {
        width: "100%",
        borderRadius: "5px",
        marginBottom: "10px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default CarCard;
