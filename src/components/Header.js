import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand ms-4" style={{ color: "#FF8C00", fontSize: "3rem", fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold' }}>
        Chassio
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto"> {/* ms-auto for right-alignment */}
          <li className="nav-item me-2">
            <Link className="btn btn-primary" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-secondary" to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
