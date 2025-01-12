import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const cars = location.state?.cars || [];

    return (
        <div className="container mt-5">
            <h1>My Cars</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><i className="fas fa-car text-dark me-2" /></th>
                        <th><i className="fas fa-clock text-dark me-2" /></th>
                        <th><i className="fas fa-city text-dark me-2" /></th>
                        <th>
                            <i
                                className="fas fa-thumbs-up text-dark me-2"
                                style={{ cursor: "pointer" }}
                            />
                        </th>
                        <th>
                            <i
                                className="fas fa-thumbs-down text-dark me-2"
                            />
                        </th>
                        <th> <i className="fas fa-eye text-dark me-2" /></th>
                        <th><i className="fas fa-gear text-dark me-2" /></th>
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
                            <td>{car.viewCount}</td>
                            <td>
                            <i className="fas fa-check text-success me-3" />
                            <i className="fas fa-remove text-danger me-3" />

                            <i className="fas fa-image text-primary me-2" />
                            </td>
                            <td>
                            <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => window.open(car.imageLinks?.[0] || "https://via.placeholder.com/150", "_blank")}
                                >
                                    Leads <i className="fas fa-arrow-down text-dark me-2" />
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
