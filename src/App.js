// App.js
import React from "react";
import Header from "./components/Header";
import CarList from "./components/CarList";
import Footer from "./components/Footer";

function App() {
  return (
      <div>
        <Header />
        <main>
          <CarList />
        </main>
        <Footer />
      </div>
  );
}

export default App;
