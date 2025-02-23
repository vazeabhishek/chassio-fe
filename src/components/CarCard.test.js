import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CarCard from "./CarCard";

const mockCar = {
    carId: "123",
    make: "Toyota",
    model: "Corolla",
    imageLinks: ["https://example.com/car.jpg"],
    viewCount: 100,
    likeCount: 10,
    dislikeCount: 2,
    city: "Stockholm",
    year: "2020",
    fuelType: "Petrol",
    kmsDriven: "30,000",
    askPrice: "1,200,000"
};

const mockOnLike = jest.fn();
const mockOnDislike = jest.fn();

describe("CarCard Component", () => {
    test("renders car details correctly", () => {
        const { getByText, getByAltText } = render(
            <CarCard car={mockCar} onLike={mockOnLike} onDislike={mockOnDislike} />
        );

        expect(getByText("Toyota Corolla")).toBeInTheDocument();
        expect(getByAltText("Toyota Corolla")).toBeInTheDocument();
        expect(getByText("100")).toBeInTheDocument();
        expect(getByText("10")).toBeInTheDocument();
        expect(getByText("2")).toBeInTheDocument();
        expect(getByText("Stockholm | 2020 | Petrol | 30,000 | INR 1,200,000")).toBeInTheDocument();
    });

    test("calls onLike function when like button is clicked", () => {
        const { getByText } = render(
            <CarCard car={mockCar} onLike={mockOnLike} onDislike={mockOnDislike} />
        );

        fireEvent.click(getByText("10"));
        expect(mockOnLike).toHaveBeenCalledWith("123");
    });

    test("calls onDislike function when dislike button is clicked", () => {
        const { getByText } = render(
            <CarCard car={mockCar} onLike={mockOnLike} onDislike={mockOnDislike} />
        );

        fireEvent.click(getByText("2"));
        expect(mockOnDislike).toHaveBeenCalledWith("123");
    });

    /*
    test("opens enquiry modal when Deal button is clicked", async () => {
        const { getByText, findByRole } = render(
            <CarCard car={mockCar} onLike={mockOnLike} onDislike={mockOnDislike} />
        );

        fireEvent.click(getByText("Deal"));
        expect(await findByRole("dialog")).toBeInTheDocument();
    });

    test("closes enquiry modal when close button is clicked", async () => {
        const { getByText, findByRole, queryByRole } = render(
            <CarCard car={mockCar} onLike={mockOnLike} onDislike={mockOnDislike} />
        );

        fireEvent.click(getByText("Deal"));
        expect(await findByRole("dialog")).toBeInTheDocument();

        fireEvent.click(getByText("Close"));
        await waitFor(() => expect(queryByRole("dialog")).not.toBeInTheDocument());
    });

    test("handles missing imageLinks gracefully", () => {
        const carWithoutImages = { ...mockCar, imageLinks: [] };
        const { queryByAltText } = render(
            <CarCard car={carWithoutImages} onLike={mockOnLike} onDislike={mockOnDislike} />
        );
        expect(queryByAltText("Toyota Corolla")).toBeNull();
    });

    test("handles missing like and dislike counts gracefully", () => {
        const carWithoutCounts = { ...mockCar, likeCount: undefined, dislikeCount: undefined };
        const { queryByText } = render(
            <CarCard car={carWithoutCounts} onLike={mockOnLike} onDislike={mockOnDislike} />
        );
        expect(queryByText("0")).toBeInTheDocument(); // Ensure a default value is shown
    });
    */
});
