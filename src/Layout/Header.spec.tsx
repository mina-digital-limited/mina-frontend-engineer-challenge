import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { APP_NAME } from "../common/constants";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("Should render logo", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const image = screen.getByAltText("logo") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "icon-logo.svg");
  });

  it("Should render app name", () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      APP_NAME
    );
  });

  it("Should render search", () => {
    render(<Header />, { wrapper: MemoryRouter });

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByTitle("submit search")).toBeInTheDocument();
  });
});
