import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

  useEffect(() => {
    // Read query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const cityFromURL = queryParams.get('city');
    
    // If city parameter exists, set it to selectedCity
    if (cityFromURL) {
      setSelectedCity(cityFromURL);
    }
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
