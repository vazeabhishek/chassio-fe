import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    isAgreedToTC: false, // Checkbox state is directly part of formData
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password, name, phoneNumber, isAgreedToTC } = formData;
    if (!email || !password || !name || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
    if (!isAgreedToTC) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("/public/users", formData);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setError("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h1>Seller Account Registration</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsCheck"
            name="isAgreedToTC"
            checked={formData.isAgreedToTC}
            onChange={handleChange}
          />
          <label htmlFor="termsCheck" className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};


export default SignUp;
