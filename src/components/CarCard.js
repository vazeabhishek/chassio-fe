import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm"; // Import the EnquiryForm component

const CarCard = ({ car, onLike, onDislike }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null); // Initialize with null

    const handleDealClick = (carId) => {
        setCurrentCarId(carId); // Set the current carId when Deal button is clicked
        setShowModal(true); // Show modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setCurrentCarId(null); // Reset carId
    };

    return (
        <div className="card h-100">
            <img src={car.imageLinks[0]} className="card-img-top" alt={car.make} />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title fw-monospace">{car.make} {car.model}</h6>
                    <div>
                        <i
                            className="fas fa-solid fa-eye text-primary me-2"
                            style={{ cursor: "pointer" }}
                        >
                            {car.viewCount}
                        </i>
                        <i
                            className="fas fa-thumbs-up text-primary me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => onLike(car.carId)}
                        >
                            {car.likeCount}
                        </i>
                        <i
                            className="fas fa-thumbs-down text-danger me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => onDislike(car.carId)}
                        >
                            {car.dislikeCount}
                        </i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="card-text fw-monospace mb-2 fs-6" style={{ color: "#003366" }}>
                        {car.city} | {car.year} | {car.fuelType} | {car.kmsDriven} | INR {car.askPrice}
                    </p>
                    {/* Fix: Pass a function reference, not invoke it immediately */}
                    <button className="btn btn-success ms-2" onClick={() => handleDealClick(car.carId)}>
                        Deal
                    </button>
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                style={{ display: showModal ? "block" : "none" }}
                tabIndex="-1"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enquiry Form</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleCloseModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <EnquiryForm carId={currentCarId} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
