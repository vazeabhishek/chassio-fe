import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm";  // Import the EnquiryForm component

const CarCard = ({ car, onLike, onDislike }) => {
    // State to control visibility of the modal
    const [showModal, setShowModal] = useState(false);

    const handleDealClick = () => {
        setShowModal(true); // Show the modal when Deal button is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <div className="card h-100">
            <img src={car.imageLinks[0]} className="card-img-top" alt={car.make} />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{car.make} {car.model}</h5>
                    <div>
                        <i 
                            className="fas fa-thumbs-up text-primary me-2" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => onLike(car.carId)} 
                        />
                        <i 
                            className="fas fa-thumbs-down text-danger" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => onDislike(car.carId)} 
                        />
                    </div>
                </div>
                <p className="card-text">
                    {car.city} | {car.year} | {car.fuelType} | {car.kmsDriven}
                </p>
                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-success" onClick={handleDealClick}>
                        Deal
                    </button>
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-hidden={!showModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enquiry Form</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <EnquiryForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
