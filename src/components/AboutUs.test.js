import React from "react";
import { render, screen } from "@testing-library/react";
import AboutUs from "../components/AboutUs";

describe("AboutUs Component", () => {
    test("renders About Us title and subtitle", () => {
        render(<AboutUs />);
        
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("About Us");
        expect(screen.getByText("Connecting Buyers and Sellers of Used Cars")).toBeInTheDocument();
    });

    test("renders all about us sections", () => {
        render(<AboutUs />);

        const paragraphs = [
            "Welcome to our platform, your one-stop solution for buying and selling used cars.",
            "This website is not for commercial purposes but is part of a thesis project.",
            "Thank you for being part of this journey as we work towards redefining car trade experiences."
        ];

        paragraphs.forEach(text => {
            expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
        });
    });
});
