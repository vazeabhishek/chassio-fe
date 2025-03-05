import React, { useState, useEffect } from "react";
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
  const [makeList, setMakeList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [fuelTypes, setFuelType] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uiData = localStorage.getItem("uiStaticData");
    if (uiData) {
      const parsedData = JSON.parse(uiData);
      setMakeList(parsedData.data.makeList);
      setModelList(parsedData.data.modelList);
      setYearList(parsedData.data.yearList);
      setStateList(parsedData.data.stateList);
      setFuelType(parsedData.data.fuelTypes);
      setMonthList(parsedData.data.monthList);
    }
  }, []);

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
        formDataToSend.append("images", file);
      });

      // Get the authorization token from cookies
      const authToken = Cookies.get("authToken");

      // Send the request without explicitly setting Content-Type (axios handles it)
      await axios.post("/private/cars", formDataToSend, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSuccess("Car details submitted successfully! Redirecting...");
      setTimeout(() => navigate("/userpanel"), 4000);
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
          {/* Make Select */}
          <div className="col-md-6">
            <label htmlFor="make" className="form-label">Make</label>
            <select
              className="form-select"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
            >
              <option value="">Select Make</option>
              {makeList.map((make, idx) => (
                <option key={idx} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Model Select */}
          <div className="col-md-6">
            <label htmlFor="model" className="form-label">Model</label>
            <select
              className="form-select"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            >
              <option value="">Select Model</option>
              {modelList.map((model, idx) => (
                <option key={idx} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div className="col-md-6">
            <label htmlFor="year" className="form-label">Year</label>
            <select
              className="form-select"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              {yearList.map((year, idx) => (
                <option key={idx} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {/* Month Select */}
          <div className="col-md-6">
            <label htmlFor="month" className="form-label">Month</label>
            <select
              className="form-select"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
            >
              <option value="">Select Month</option>
              {monthList.map((month, idx) => (
                <option key={idx} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          {/* State Select*/}
          <div className="col-md-6">
            <label htmlFor="state" className="form-label">State</label>
            <select
              className="form-select"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {stateList.map((state, idx) => (
                <option key={idx} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* State Select*/}
          <div className="col-md-6">
            <label htmlFor="fuelType" className="form-label">Fuel Type</label>
            <select
              className="form-select"
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Select Fuel</option>
              {fuelTypes.map((ft, idx) => (
                <option key={idx} value={ft}>{ft}</option>
              ))}
            </select>
          </div>



          {/* Other Fields */}
          {[
            { label: "Ask Price", name: "askPrice", type: "number" },
            { label: "City", name: "city", type: "text" },
            { label: "Kilometers Driven", name: "kmsDriven", type: "number" },
            { label: "Fuel Consumption", name: "fuelConsumption", type: "text" }
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
          <label htmlFor="anyOtherNote" className="form-label">Any Other Note</label>
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
          <label htmlFor="files" className="form-label">Upload Files</label>
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

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;
