import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const cars = location.state?.cars || [];

    return (
        <div className="container mt-5">
            <h1>Your Cars</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><i className="fas fa-car text-danger me-2"/></th>
                        <th><i className="fas fa-clock text-danger me-2"/></th>
                        <th><i className="fas fa-city text-danger me-2"/></th>
                        <th>
                            <i
                                className="fas fa-thumbs-up text-primary me-2"
                                style={{ cursor: "pointer" }}
                            />
                        </th>
                        <th>
                            <i
                                className="fas fa-thumbs-down text-danger me-2"
                            />
                        </th>
                        <th> <i className="fas fa-handshake text-danger me-2"/></th>
                        <th><i className="fas fa-action text-danger me-2"/></th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car.carId}>
                            <td>{index + 1}</td>
                            <td>{car.make} {car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.city}</td>
                            <td>{car.likeCount}</td>
                            <td>{car.dislikeCount}</td>
                            <td>{car.dealCount}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => window.open(car.imageLinks?.[0] || "https://via.placeholder.com/150", "_blank")}
                                >Remove
                                </button>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => window.open(car.imageLinks?.[0] || "https://via.placeholder.com/150", "_blank")}
                                >
                                    Deals
                                </button>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => window.open(car.imageLinks?.[0] || "https://via.placeholder.com/150", "_blank")}
                                >
                                    Image
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Home;
