import React, { useState } from 'react';
import { customFetch } from "../utils/api";
import API_BASE_URL from '../config/ApiBaseUrl';

const EnquiryForm = ({ carId, onClose }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bidPrice: ''
    });
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure carId is present
        if (!carId) {
            console.error("Car ID is missing");
            return;
        }

        customFetch(`${API_BASE_URL}/public/cars/${carId}/interest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send the form data
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit interest');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Interest submitted successfully:', data);
                if (onClose) onClose(); // Close the modal after successful submission
            })
            .catch((error) => {
                console.error('Error submitting interest:', error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bidPrice" className="form-label">Bid Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bidPrice"
                        name="bidPrice"
                        value={formData.bidPrice}
                        onChange={handleInputChange}
                        placeholder="Enter your bid"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default EnquiryForm;
