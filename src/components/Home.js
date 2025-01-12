import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const cars = location.state?.cars || [];
    const [leadsData, setLeadsData] = useState({});
    const [visibleRows, setVisibleRows] = useState({});

    const toggleLeads = async (carId) => {
        if (visibleRows[carId]) {
            setVisibleRows((prev) => ({ ...prev, [carId]: false }));
            return;
        }

        try {
            const response = await fetch(`/users/cars/${carId}/leads`);
            const data = await response.json();
            setLeadsData((prevData) => ({ ...prevData, [carId]: data }));
            setVisibleRows((prev) => ({ ...prev, [carId]: true }));
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>My Cars</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Car</th>
                        <th>Year</th>
                        <th>City</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Views</th>
                        <th>Actions</th>
                        <th>Leads</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <React.Fragment key={car.carId}>
                            <tr>
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
                                        onClick={() => toggleLeads(car.carId)}
                                    >
                                        Leads <i className="fas fa-arrow-down text-dark me-2" />
                                    </button>
                                </td>
                            </tr>
                            {visibleRows[car.carId] && leadsData[car.carId] && (
                                <tr>
                                    <td colSpan="9">
                                        <table className="table table-bordered mt-3">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Asking Price</th>
                                                    <th>Spam</th>
                                                    <th>Created On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leadsData[car.carId].map((lead, idx) => (
                                                    <tr key={lead.id}>
                                                        <td>{idx + 1}</td>
                                                        <td>{lead.name}</td>
                                                        <td>{lead.email}</td>
                                                        <td>{lead.phone}</td>
                                                        <td>${lead.askingPrice}</td>
                                                        <td>{lead.flagSpam ? "Yes" : "No"}</td>
                                                        <td>{new Date(lead.creationDate).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
