import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>© 2024 CarZone. All Rights Reserved.</p>
            <Link to="/aboutUs">AboutUs</Link>
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
