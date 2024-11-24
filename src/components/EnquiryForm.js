import React, { useState, useEffect } from 'react';

const EnquiryForm = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        phone: ''
    });

    const [cities, setCities] = useState([]); // State to store the list of cities

    // Fetch cities data from API
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/data/cities'); // Replace with actual API URL
                const data = await response.json();
                setCities(data.data); // Assume the response returns an array of cities
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

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
        // Process the form data (e.g., send it to an API)
        console.log('Form Submitted:', formData);
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
                    <label htmlFor="city" className="form-label">City</label>
                    <select
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select your city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

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
                        pattern="[0-9]{10}"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default EnquiryForm;
