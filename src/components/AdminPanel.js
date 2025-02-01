import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const AdminPanel = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingCars = async () => {
            try {
                const response = await customFetch("/admin/cars?type=PENDING"); // Adjust the API endpoint as needed
                const data = await response.json();
                setCars(data);
            } catch (err) {
                setError("Failed to fetch pending vehicle ads.");
            } finally {
                setLoading(false);
            }
        };

        fetchPendingCars();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h1>Pending Vehicle Ads</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Make & Model</th>
                        <th>Month Year</th>
                        <th>Fuel</th>
                        <th>Mileage/Ltr</th>
                        <th>Total Kms</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Ask</th>
                        <th>Notes</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car.carId}>
                            <td>{index + 1}</td>
                            <td>{car.make} {car.model}</td>
                            <td>{car.month} {car.year}</td>
                            <td>{car.fuelType}</td>
                            <td>{car.fuelConsumption}</td>
                            <td>{car.kmsDriven}</td>
                            <td>{car.city}</td>
                            <td>{car.state}</td>
                            <td>{car.askPrice}</td>
                            <td>{car.anyOtherNote}</td>
                            <td>
                                <i className="fas fa-image text-primary me-2" />
                            </td>
                            <td>
                                <button className="btn btn-success btn-sm me-2">
                                    Approve
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm me-2">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
