import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Cookies from "js-cookie";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const [stats, setStats] = useState(null);
    const userRole = Cookies.get("userRole");

    useEffect(() => {
        if (userRole === "ADMIN") {
            const getCookieValue = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };
    
            const authToken = getCookieValue('authToken');
    
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
    }, [userRole]);
    

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
                    <p>Free Memory: {stats.freeMemory} GB</p>
                    <p>Active Threads: {stats.activeThreads}</p>
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