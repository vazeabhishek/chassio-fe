import React from "react";

const CarCard = ({ car, onLike, onDislike }) => {
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
                    <button className="btn btn-success">Deal</button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
