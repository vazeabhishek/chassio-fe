import React from 'react';

const AboutUs = () => {
    const title = "About Us";
    const subtitle = "Connecting Buyers and Sellers of Used Cars";
    
    const content = [
        "Welcome to our platform, your one-stop solution for buying and selling used cars. Our vision is to provide a unique and seamless car trade experience without involving middlemen or brokers. By removing intermediaries, we aim to ensure that both buyers and sellers can benefit directly and fairly from each transaction.",
        "This website is not for commercial purposes but is part of a thesis project. Our goal is to showcase a transparent, user-friendly, and efficient marketplace for used cars. Whether you are looking to sell your vehicle or buy a pre-owned car, our platform is designed to make the process easy and hassle-free.",
        "Thank you for being part of this journey as we work towards redefining car trade experiences."
    ];

    return (
        <div className="container mt-5">
            <Header title={title} subtitle={subtitle} />
            <div className="mt-4">
                {content.map((paragraph, index) => (
                    <Section key={index} text={paragraph} />
                ))}
            </div>
        </div>
    );
};

const Header = ({ title, subtitle }) => (
    <div className="text-center">
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
    </div>
);

const Section = ({ text }) => <p>{text}</p>;

export default AboutUs;
