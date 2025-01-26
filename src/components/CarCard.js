import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm";

const CarCard = ({ car, onLike, onDislike }) => {
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null);
    const [imageLinks, setImageLinks] = useState([]);

    const handleDealClick = (carId) => {
        setCurrentCarId(carId);
        setShowEnquiryModal(true);
    };

    const handleCloseEnquiryModal = () => {
        setShowEnquiryModal(false);
        setCurrentCarId(null);
    };

    const handleImageClick = () => {
        console.log("Thumbnail clicked for car:", car);
        setImageLinks(car.imageLinks);
        setShowImageModal(true);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setImageLinks([]);
    };

    return (
        <div className="card h-100">
            <img
                src={car.imageLinks[0]}
                className="card-img-top"
                alt={car.make}
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
            />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title fw-monospace">{car.make} {car.model}</h6>
                    <div>
                        <i className="fas fa-solid fa-eye text-primary me-2">{car.viewCount}</i>
                        <i
                            className="fas fa-thumbs-up text-primary me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                console.log("Liked car ID:", car.carId);
                                onLike(car.carId);
                            }}
                        >
                            {car.likeCount}
                        </i>
                        <i
                            className="fas fa-thumbs-down text-danger me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                console.log("Disliked car ID:", car.carId);
                                onDislike(car.carId);
                            }}
                        >
                            {car.dislikeCount}
                        </i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="card-text fw-monospace mb-2 fs-6" style={{ color: "#003366" }}>
                        {car.city} | {car.year} | {car.fuelType} | {car.kmsDriven} | INR {car.askPrice}
                    </p>
                    <button className="btn btn-success ms-2" onClick={() => handleDealClick(car.carId)}>
                        Deal
                    </button>
                </div>
            </div>

            {/* Enquiry Modal */}
            <div className={`modal fade ${showEnquiryModal ? "show" : ""}`} style={{ display: showEnquiryModal ? "block" : "none" }} tabIndex="-1" aria-hidden={!showEnquiryModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enquiry Form</h5>
                            <button type="button" className="btn-close" onClick={handleCloseEnquiryModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <EnquiryForm carId={currentCarId} onClose={handleCloseEnquiryModal} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <div className={`modal fade ${showImageModal ? "show" : ""}`} style={{ display: showImageModal ? "block" : "none" }} tabIndex="-1" aria-hidden={!showImageModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Car Images</h5>
                            <button type="button" className="btn-close" onClick={handleCloseImageModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id="carImageCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {imageLinks.map((link, index) => (
                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={link}>
                                            <img src={link} className="d-block w-100" alt={`Car image ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carImageCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carImageCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CarCard;
