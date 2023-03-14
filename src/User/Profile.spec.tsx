import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderContextWithProps } from "../common/testUtilities";
import Profile from "./Profile";

describe("Profile", () => {
  const user = { login: "bmharley" },
    repos = [{ id: 1, name: "frontendUtils" }],
    mockStore = {
      repos: { loading: false, data: repos },
      user: { loading: false, data: user },
    };

  it("Should render user details", () => {
    renderContextWithProps(<Profile />, mockStore, { wrapper: MemoryRouter });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      user.login
    );
  });

  it("Should render repos list", () => {
    renderContextWithProps(<Profile />, mockStore, { wrapper: MemoryRouter });

    expect(screen.getByText("frontendUtils")).toBeInTheDocument();
  });

  it("Should not render repos list when no user", () => {
    renderContextWithProps(
      <Profile />,
      { user: { loading: false } },
      { wrapper: MemoryRouter }
    );

    expect(screen.queryByText("frontendUtils")).not.toBeInTheDocument();
  });
});
