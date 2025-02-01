import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import Cookies from "js-cookie";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const [stats, setStats] = useState(null);
    const { user } = useAuth(); // Get the current user from the AuthContext
    const userRole = user?.role; // Get the role from the user object (use optional chaining)

    useEffect(() => {
        if (userRole === "ADMIN") {
            const authToken =  Cookies.get("authToken"); // Get auth token from localStorage

            fetch("/admin/stats", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json' // Optional: specify content type
                }
            })
                .then((res) => res.json())
                .then((data) => setStats(data))
                .catch((err) => console.error("Error fetching system stats:", err));
        }
    }, [userRole]); // Depend on userRole

    return (
        <footer style={styles.footer}>
            <p>© {currentYear} Chassio All Rights Reserved.</p>
            <div style={{ margin: '0 10px' }}>
                <Link to="/aboutUs">About Us</Link>
            </div>
            <div style={{ margin: '0 10px' }}>
                <Link to="/datastoragepolicy">Data Policy</Link>
            </div>
            <div style={{ margin: '0 10px' }}>
                <Link to="/termsandconditions">Terms And Conditions</Link>
            </div>
            
            {/* Admin System Stats Section */}
            {userRole === "ADMIN" && stats && (
                <div style={styles.statsSection}>
                    <h3>System Stats</h3>
                    <p>Free Memory: {stats.data.FREE_MEMORY_MB} MB</p>
                    <p>Active Threads: {stats.data.ACTIVE_THREADS_COUNT}</p>
                </div>
            )}
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
    statsSection: {
        marginTop: "15px",
        padding: "10px",
        backgroundColor: "#444",
        borderRadius: "5px",
    },
};

export default Footer;
