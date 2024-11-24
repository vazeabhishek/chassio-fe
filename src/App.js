// App.js
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";
import Filter from "./components/Filter";

function App() {
  return (
    <div>
      <Header />
      <Filter />
      <main>
        <CarList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
