import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const CarDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const carId = searchParams.get('id');
  const channel = searchParams.get('channel');

  return (
    <div>
      <h1>Car Details</h1>
      <p>Car ID: {carId}</p>
      <p>Channel: {channel}</p>
      {/* Add your car details rendering logic here */}
    </div>
  );
};

export default CarDetails;