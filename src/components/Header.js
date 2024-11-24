import React from "react";

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>CarZone</h1>
            <nav style={styles.nav}>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
    },
    logo: { fontSize: "24px" },
    nav: { display: "flex", gap: "15px" },
};

export default Header;
