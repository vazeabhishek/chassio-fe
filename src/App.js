import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";
import Filter from "./components/Filter";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div>
      <Header />
      <Filter setSelectedCity={setSelectedCity} />
      <main>
        <CarList selectedCity={selectedCity} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
