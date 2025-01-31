import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cars = location.state?.cars || [];
    const [leadsData, setLeadsData] = useState({});
    const [visibleRows, setVisibleRows] = useState({});

    // Check if user is authenticated
    useEffect(() => {
        const userToken = document.cookie.split("; ").find(row => row.startsWith("authToken="));
        if (!userToken) {
            navigate("/login"); // Redirect if not authenticated
        }
    }, [navigate]);

    const toggleLeads = async (carId) => {
        if (visibleRows[carId]) {
            setVisibleRows((prev) => ({ ...prev, [carId]: false }));
            return;
        }

        try {
            const response = await customFetch(`/private/cars/${carId}/leads`);
            const data = await response.json();
            setLeadsData((prevData) => ({ ...prevData, [carId]: data }));
            setVisibleRows((prev) => ({ ...prev, [carId]: true }));
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>My Vehicles Ads</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><i className="fas fa-car text-info me-3" /></th>
                        <th><i className="fas fa-clock text-info me-3" /></th>
                        <th><i className="fas fa-city text-info me-3" /></th>
                        <th><i className="fas fa-thumbs-up text-info me-3" /></th>
                        <th><i className="fas fa-thumbs-down text-info me-3" /></th>
                        <th><i className="fas fa-eye text-info me-3" /></th>
                        <th><i className="fas fa-gear text-info me-3" /></th>
                        <th><i className="fas fa-globe text-info me-3"></i></th>
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
                                                    <th>Ask</th>
                                                    <th>Spam</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leadsData[car.carId].map((lead, idx) => (
                                                    <tr key={lead.id}>
                                                        <td>{idx + 1}</td>
                                                        <td>{lead.name}</td>
                                                        <td>{lead.email}</td>
                                                        <td>{lead.phone}</td>
                                                        <td>{lead.askingPrice}</td>
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
                    {/* Add Car Row */}
                    <tr className="text-center text-success fw-bold cursor-pointer">
                        <td colSpan="9">
                            <i className="fas fa-plus me-2" /><Link className="btn btn-success" to="/newcar"> Create Ad</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Home;
