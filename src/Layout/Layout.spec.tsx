import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";

describe("Layout", () => {
  it("Should render header", () => {
    render(<Layout />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Should render children", () => {
    render(
      <Layout>
        <h1 data-testid="welcome-message">Welcome</h1>
      </Layout>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
  });
});
