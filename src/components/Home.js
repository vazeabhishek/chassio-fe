import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const cars = location.state?.cars || [];

  return (
    <div className="container mt-5">
      <h1>Your Cars</h1>
      <div className="row">
        {cars.map((car) => (
          <div key={car.carId} className="col-md-4">
            <div className="card mb-4">
              <img
                src={car.imageLinks?.[0] || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={`${car.make} ${car.model}`}
              />
              <div className="card-body">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="card-text">
                  <strong>Year:</strong> {car.year} <br />
                  <strong>City:</strong> {car.city} <br />
                  <strong>Likes:</strong> {car.likeCount} <br />
                  <strong>Dislikes:</strong> {car.dislikeCount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
