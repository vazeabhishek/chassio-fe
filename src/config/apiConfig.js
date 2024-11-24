// src/config/apiConfig.js
const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
    cars: `${API_BASE_URL}/cars`,
    users: `${API_BASE_URL}/users`,
};

export default API_BASE_URL;
