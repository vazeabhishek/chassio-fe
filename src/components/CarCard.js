import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm";
import Carousel from "./Carousel";

const CarCard = ({ car, onLike, onDislike }) => {
    const [modalState, setModalState] = useState({ showEnquiry: false, carId: null });
    const [carouselState, setCarouselState] = useState({ show: false, images: [], carName: "" });

    const handleDealClick = (carId) => setModalState({ showEnquiry: true, carId });
    const handleCloseEnquiryModal = () => setModalState({ showEnquiry: false, carId: null });
    const handleCarImageClick = (images, carName) => setCarouselState({ show: true, images, carName });

    return (
        <div className="card h-100">
            {carouselState.show && (
                <Carousel images={carouselState.images} onClose={() => setCarouselState({ ...carouselState, show: false })} carName={carouselState.carName} />
            )}
            <img
                src={car.imageLinks[0]}
                className="card-img-top"
                alt={`${car.make} ${car.model}`}
                onClick={() => handleCarImageClick(car.imageLinks, `${car.make} ${car.model}`)}
                style={{ cursor: "pointer" }}
            />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title fw-monospace">{`${car.make} ${car.model}`}</h6>
                    <div>
                        <i className="fas fa-eye text-primary me-2">{car.viewCount}</i>
                        <i className="fas fa-thumbs-up text-primary me-2" style={{ cursor: "pointer" }} onClick={() => onLike(car.carId)}>
                            {car.likeCount}
                        </i>
                        <i className="fas fa-thumbs-down text-danger me-2" style={{ cursor: "pointer" }} onClick={() => onDislike(car.carId)}>
                            {car.dislikeCount}
                        </i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="card-text fw-monospace mb-2 fs-6" style={{ color: "#003366" }}>
                        {`${car.city} | ${car.year} | ${car.fuelType} | ${car.kmsDriven} | INR ${car.askPrice}`}
                    </p>
                    <button className="btn btn-success ms-2" onClick={() => handleDealClick(car.carId)}>
                        Deal
                    </button>
                </div>
            </div>
            {modalState.showEnquiry && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enquiry Form</h5>
                                <button type="button" className="btn-close" onClick={handleCloseEnquiryModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <EnquiryForm carId={modalState.carId} onClose={handleCloseEnquiryModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarCard;