import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { WELCOME_MESSAGE } from "../common/constants";

describe("LandingPage", () => {
  it("Should render welcome message", () => {
    render(<LandingPage />);
    expect(screen.getByText(WELCOME_MESSAGE)).toBeInTheDocument();
  });
});
