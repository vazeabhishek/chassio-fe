import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmationDialog from "./ConfirmationDialog";
import Carousel from './Carousel';

import '../assets/UserPanel.css';

const UserPanel = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ActionTypes = {
        DELETE: "DELETE",
        MARK_SOLD: "MARK_SOLD",
    };

    const navigate = useNavigate();
    const { user } = useAuth();
    const userRole = user?.role;

    const [cars, setCars] = useState(() => JSON.parse(localStorage.getItem("myCarsList")) || []);
    const [leadsData, setLeadsData] = useState({});
    const [visibleRows, setVisibleRows] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [showCarousel, setShowCarousel] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);
    const [selectedCarName, setSelectedCarName] = useState("");


    useEffect(() => {
        if (userRole !== "SIGNED_USER" && userRole !== "ADMIN") {
            navigate("/login");
        }
        fetchMyCars();
    }, [userRole, navigate]);

    const fetchMyCars = async () => {
        try {
            const response = await customFetch("/private/users/cars");
            const data = await response.json();
            console.log(data);
            setCars(data);
            localStorage.setItem("myCarsList", JSON.stringify(data));
        } catch (err) {
            setError("Failed to fetch pending vehicle ads.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (confirmed) => {
        if (confirmed) {
            if (currentAction === ActionTypes.DELETE) {
                await handleDeleteCar(currentId);
            } else if (currentAction === ActionTypes.MARK_SOLD) {
                await markCarAsSold(currentId);
            }
        }
        setIsDialogOpen(false);
    };

    const openDialog = (carId, actionType) => {
        setIsDialogOpen(true);
        setCurrentId(carId);
        setCurrentAction(actionType);
    };

    const getDialogMessage = () => {
        return currentAction === ActionTypes.DELETE
            ? "Are you sure you want to remove this ad?"
            : "Are you sure you want to mark this ad as SOLD?";
    };

    const handleDeleteCar = async (carId) => {
        try {
            await customFetch(`/private/cars/${carId}`, { method: "DELETE" });

            setCars((prevCars) => {
                const updatedCars = prevCars.filter((car) => car.carId !== carId);
                localStorage.setItem("myCarsList", JSON.stringify(updatedCars));
                return updatedCars;
            });
        } catch (error) {
            console.error(`Error deleting ${carId}`, error);
        }
    };

    const markCarAsSold = async (carId) => {
        try {
            const response = await customFetch(`/private/cars/${carId}/sold`, { method: "PUT" });
            const updatedCars = await response.json();

            setCars(updatedCars);
            localStorage.setItem("myCarsList", JSON.stringify(updatedCars));
        } catch (error) {
            console.error(`Error marking ${carId} as sold`, error);
        }
    };

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

    const handleCarImageClick = (images, carName) => {
        setCarouselImages(images);
        setSelectedCarName(carName);
        setShowCarousel(true);
    };

    if (userRole !== "SIGNED_USER") {
        return null;
    }

    return (
        <div className="container mt-5">
            <ConfirmationDialog isOpen={isDialogOpen} message={getDialogMessage()} onClose={handleConfirm} />
            <div style={{ display: !isDialogOpen ? "block" : "none" }}>
                <h1>My Vehicles Ads</h1>
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
                            <th>Status</th>
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
                                        <div className="button-container"> {/* Container for buttons */}
                                            <button
                                                className="square-button"
                                                onClick={() => openDialog(car.carId, ActionTypes.MARK_SOLD)}
                                            >
                                                <i className="fas fa-check" /> {/* Removed me-3 */}
                                            </button>
                                            <button
                                                className="square-button"
                                                onClick={() => openDialog(car.carId, ActionTypes.DELETE)}
                                            >
                                                <i className="fas fa-trash" /> {/* Removed me-3 */}
                                            </button>
                                            <button
                                                className="square-button"
                                                onClick={() => handleCarImageClick(car.imageLinks, car.make + " " + car.model)}
                                            >
                                                <i className="fas fa-image text-image" /> {/* Removed me-3 */}
                                                {showCarousel && (
                                                    <Carousel images={carouselImages} onClose={() => setShowCarousel(false)} carName={selectedCarName} />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="green-rectangle-button" onClick={() => toggleLeads(car.carId)}>
                                            Leads <i className="fas fa-arrow-down text-dark me-2" />
                                        </button>
                                    </td>
                                    <td>{car.carStatus}</td>
                                </tr>
                                {visibleRows[car.carId] && leadsData[car.carId] && (
                                    <tr>
                                        <td colSpan="10">
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
                        <tr className="text-center text-success fw-bold cursor-pointer">
                            <td colSpan="10">
                                <i className="fas fa-plus me-2" />
                                <Link className="btn btn-success" to="/newcar"> Create Ad</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPanel;