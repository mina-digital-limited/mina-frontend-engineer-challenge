import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";
import { MemoryRouter } from "react-router";
import { PAGE_NOT_FOUND_MESSAGE } from "../common/constants";

describe("ErrorPage", () => {
  it("Should render page not found message", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(PAGE_NOT_FOUND_MESSAGE)).toBeInTheDocument();
  });
});
