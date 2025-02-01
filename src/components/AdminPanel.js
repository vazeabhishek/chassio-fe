import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const AdminPanel = () => {

    return (
        <div className="container mt-5">
            <h1>Pending Ads</h1>
        </div>
    );
};

export default AdminPanel;
