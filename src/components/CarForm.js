import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const CarForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    month: "",
    askPrice: 0,
    city: "",
    state: "",
    kmsDriven: 0,
    fuelType: "",
    fuelConsumption: "",
    anyOtherNote: "",
    carStatus: "",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      ["image/png", "image/jpeg"].includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      setError("Only PNG and JPEG files are allowed.");
      return;
    }

    setError(""); // Clear error if all files are valid

    // Append new files to existing files
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
        make,
        model,
        year,
        month,
        askPrice,
        city,
        state,
        kmsDriven,
        fuelType,
    } = formData;

    // Validate required fields
    if (!make || !model || !year || !month || !city || !state || !fuelType) {
        setError("All required fields must be filled.");
        return;
    }

    try {
        const formDataToSend = new FormData();

        // Create a car object to send
        const carDto = {
            make,
            model,
            year,
            month,
            askPrice,
            city,
            state,
            kmsDriven,
            fuelType,
            fuelConsumption: formData.fuelConsumption,
            anyOtherNote: formData.anyOtherNote,
        };

        // Append car data as JSON Blob
        formDataToSend.append("car", JSON.stringify(carDto));

        // Append files under the correct key
        files.forEach((file) => {
            formDataToSend.append("images", file); // Ensure this key matches the Spring method parameter
        });

        // Get the authorization token from cookies
        const authToken = Cookies.get("authToken");

        // Send the request without explicitly setting Content-Type (axios handles it)
        const response = await axios.post("/private/cars", formDataToSend, {
            headers: {
                Authorization: `Bearer ${authToken}`, // Add Authorization header
                // Do not explicitly set 'Content-Type': 'multipart/form-data'
            },
        });

        setSuccess("Car details submitted successfully! Redirecting...");
        setTimeout(() => navigate("/home"), 4000);
    } catch (err) {
        setError("Submission failed: " + (err.response?.data?.message || err.message));
    }
  };







  return (
    <div className="container mt-5">
      <h1>Car Form</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Fields in a compact layout */}
        <div className="row g-3">
          {[
            { label: "Make", name: "make", type: "text" },
            { label: "Model", name: "model", type: "text" },
            { label: "Year", name: "year", type: "number" },
            { label: "Month", name: "month", type: "text" },
            { label: "Ask Price", name: "askPrice", type: "number" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Kilometers Driven", name: "kmsDriven", type: "number" },
            { label: "Fuel Type", name: "fuelType", type: "text" },
            { label: "Fuel Consumption", name: "fuelConsumption", type: "text" },
          ].map((field, idx) => (
            <div className="col-md-6" key={idx}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                className="form-control"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="anyOtherNote" className="form-label">
            Any Other Note
          </label>
          <textarea
            className="form-control"
            id="anyOtherNote"
            name="anyOtherNote"
            rows="3"
            value={formData.anyOtherNote}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="files" className="form-label">
            Upload Files
          </label>
          <input
            type="file"
            className="form-control"
            id="files"
            multiple
            onChange={handleFileChange}
          />
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                {file.name}
                <span 
                  style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => removeFile(file.name)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CarForm;
