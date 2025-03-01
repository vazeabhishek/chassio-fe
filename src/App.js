import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import Login from "./components/Login";
import UserPanel from "./components/UserPanel";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import DataStoragePolicy from "./components/DataStoragePolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import CarForm from "./components/CarForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminPanel from "./components/AdminPanel";
import CarDetails from "./components/CarDetails";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // New state for search results

  // Fetch city from query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cityFromURL = queryParams.get("city");

    if (cityFromURL) {
      setSelectedCity(cityFromURL);
    }
  }, []);

  // Fetch API data and save it in localStorage at startup
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/public/data/ui");
        localStorage.setItem("uiStaticData", JSON.stringify(response.data)); 
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          {/* Pass setSearchResults to Header */}
          <Header setSearchResults={setSearchResults} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Filter setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
                  <main>
                    {/* Pass searchResults along with selectedCity */}
                    <CarList searchResults={searchResults} selectedCity={selectedCity} />
                  </main>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/newcar" element={<CarForm />} />
            <Route 
              path="/userpanel" 
              element={
                <ProtectedRoute>
                  <UserPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/adminpanel" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/datastoragepolicy" element={<DataStoragePolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/cars" element={<CarDetails/>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// ProtectedRoute component to restrict access to certain routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Use your Auth context

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default App;
