import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import DataStoragePolicy from "./components/DataStoragePolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import CarForm from "./components/CarForm";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch city from query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cityFromURL = queryParams.get("city");

    if (cityFromURL) {
      setSelectedCity(cityFromURL);
    }
  }, []);

  // Fetch API data and save it in a cookie at startup
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("/public/data/ui");
        Cookies.set("uiData", JSON.stringify(response.data), { expires: 7 }); // Cookie expires in 7 days
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filter setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
                <main>
                  <CarList selectedCity={selectedCity} />
                </main>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/newcar" element={<CarForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/datastoragepolicy" element={<DataStoragePolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
