import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminPanel from "./AdminPanel";
import { customFetch } from "../utils/api";

jest.mock("../utils/api", () => ({
    customFetch: jest.fn(),
}));

describe("AdminPanel", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", () => {
        render(<AdminPanel />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("displays error message on fetch failure", async () => {
        customFetch.mockRejectedValueOnce(new Error("Fetch failed"));
        render(<AdminPanel />);
        expect(await screen.findByText(/Failed to fetch pending vehicle ads./i)).toBeInTheDocument();
    });

    test("renders table with fetched cars", async () => {
        const mockCars = [
            { carId: 1, make: "Toyota", model: "Corolla", month: "Jan", year: "2020", fuelType: "Petrol", fuelConsumption: "15", kmsDriven: "30000", city: "Stockholm", state: "Sweden", askPrice: "10000", anyOtherNote: "Good condition", imageLinks: [] }
        ];
        customFetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCars) });
        render(<AdminPanel />);
        expect(await screen.findByText(/Toyota Corolla/i)).toBeInTheDocument();
    });

    test("handles approve action correctly", async () => {
        const mockCars = [
            { carId: 1, make: "Toyota", model: "Corolla", month: "Jan", year: "2020", fuelType: "Petrol", fuelConsumption: "15", kmsDriven: "30000", city: "Stockholm", state: "Sweden", askPrice: "10000", anyOtherNote: "Good condition", imageLinks: [] }
        ];
        customFetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCars) });
        customFetch.mockResolvedValueOnce({}); // Mock approve request

        render(<AdminPanel />);
        const approveButton = await screen.findByText(/Approve/i);
        fireEvent.click(approveButton);

        await waitFor(() => expect(customFetch).toHaveBeenCalledWith(
            "/admin/cars/1?type=APPROVED", 
            expect.objectContaining({ method: "PUT" })
        ));
    });

    test("handles reject action correctly", async () => {
        const mockCars = [
            { carId: 1, make: "Toyota", model: "Corolla", month: "Jan", year: "2020", fuelType: "Petrol", fuelConsumption: "15", kmsDriven: "30000", city: "Stockholm", state: "Sweden", askPrice: "10000", anyOtherNote: "Good condition", imageLinks: [] }
        ];
        customFetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCars) });
        customFetch.mockResolvedValueOnce({}); // Mock reject request

        render(<AdminPanel />);
        const rejectButton = await screen.findByText(/Reject/i);
        fireEvent.click(rejectButton);

        await waitFor(() => expect(customFetch).toHaveBeenCalledWith(
            "/admin/cars/1?type=REJECTED", 
            expect.objectContaining({ method: "PUT" })
        ));
    });
});
