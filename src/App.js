import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";
import Filter from "./components/Filter";

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
    <div>
      <Header />
      <Filter setSelectedCity={setSelectedCity} selectedCity={selectedCity}/>
      <main>
        <CarList selectedCity={selectedCity} />
      </main>
      <Footer />
    </div>
  );
}

export default App;