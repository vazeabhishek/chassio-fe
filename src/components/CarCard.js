import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm";
import Carousel from './Carousel';

const CarCard = ({ car, onLike, onDislike }) => {
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null);
    const [showCarousel, setShowCarousel] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);
    const [selectedCarName, setSelectedCarName] = useState("");

    const handleDealClick = (carId) => {
        setCurrentCarId(carId);
        setShowEnquiryModal(true);
    };

    const handleCloseEnquiryModal = () => {
        setShowEnquiryModal(false);
        setCurrentCarId(null);
    };

    const handleCarImageClick = (images, carName) => {
        setCarouselImages(images);
        setSelectedCarName(carName);
        setShowCarousel(true);
    };

    return (
        <div className="card h-100">
            {showCarousel && (
                <Carousel images={carouselImages} onClose={() => setShowCarousel(false)} carName={selectedCarName} />
            )}
            <img
                src={car.imageLinks[0]}
                className="card-img-top"
                alt={car.make}
                onClick={() => handleCarImageClick(car.imageLinks, car.make + " " + car.model)}
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
                                onLike(car.carId);
                            }}
                        >
                            {car.likeCount}
                        </i>
                        <i
                            className="fas fa-thumbs-down text-danger me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
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
        </div>
    );
};

export default CarCard;
