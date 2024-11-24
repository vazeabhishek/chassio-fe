import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>© 2024 CarZone. All Rights Reserved.</p>
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
