import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>© 2024 CarZone. All Rights Reserved.</p>
            <div style={{ margin: '0 10px' }}>
                <Link to="/aboutUs">About Us</Link>
            </div>
            <div style={{ margin: '0 10px' }}>
                <Link to="/datastoragepolicy">Data Policy</Link>
            </div>
            <div style={{ margin: '0 10px' }}>
                <Link to="/termsandconditions">Terms And Conditions</Link>
            </div>
        </footer>
    );
};


const styles = {
    footer: {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#333",
        color: "#fff",
        marginTop: "20px",
    },
};

export default Footer;
