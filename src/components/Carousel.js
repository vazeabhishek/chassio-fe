import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM

import '../assets/Carousel.css'; // Create a CSS file for styling

const Carousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);


  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'Escape') {
      console.log("OnClose event happened");
      onClose();
    }
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown); // Add event listener

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Remove on unmount
    };
  }, [handleKeyDown]); // Important: Add handleKeyDown to dependency array

  if (!images || images.length === 0) {
    return <div>No images to display.</div>; // Handle empty image array
  }

  const currentImage = images[currentIndex];

  return ReactDOM.createPortal( // Use portal to render outside the normal document flow.
    <div className="carousel-overlay"> {/* The overlay/dialog box */}
      <div className="carousel-content">
        <button className="carousel-close" onClick={onClose}>
          X
        </button>
        <img src={currentImage} className="carousel-image" />
        <div className="carousel-controls">
          <button className="carousel-prev" onClick={handlePrev}>
            Prev
          </button>
          <button className="carousel-next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body // Mount the portal to the body
  );
};

export default Carousel;
