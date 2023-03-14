import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";
import { APP_NAME } from "../common/constants";

describe("Layout", () => {
  it("Should render header", () => {
    render(<Layout />, { wrapper: MemoryRouter });

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      APP_NAME
    );
  });

  it("Should render children", () => {
    const welcomeMessage = "Welcome to Github Lookup";
    render(
      <Layout>
        <h1>{welcomeMessage}</h1>
      </Layout>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText(welcomeMessage)).toBeInTheDocument();
  });
});
