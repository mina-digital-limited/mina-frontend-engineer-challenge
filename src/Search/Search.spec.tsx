import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import { MemoryRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Search", () => {
  it("Should render search bar", () => {
    render(<Search />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });

  it("Should render search button", () => {
    render(<Search />, { wrapper: MemoryRouter });

    expect(screen.getByTitle("submit search")).toBeInTheDocument();
    expect(screen.getByAltText("search icon")).toBeInTheDocument();
  });

  it("Should submit a search", () => {
    const requestedUsername = "bmharley";

    render(<Search />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText("Username") as HTMLInputElement,
      button = screen.getByTitle("submit search") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: requestedUsername } });
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenNthCalledWith(
      1,
      `/user/${requestedUsername}`
    );
  });
});
