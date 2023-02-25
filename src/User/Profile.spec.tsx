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
    const bio = "this is all about me...";
    renderContextWithProps(<Profile />, mockStore, { wrapper: MemoryRouter });

    expect(screen.getByTestId("user-details")).toBeInTheDocument();
  });

  it("Should render repos list", () => {
    renderContextWithProps(<Profile />, mockStore, { wrapper: MemoryRouter });

    expect(screen.getByTestId("repos-list")).toBeInTheDocument();
  });

  it("Should render not repos list when no user", () => {
    renderContextWithProps(
      <Profile />,
      { user: { loading: false } },
      { wrapper: MemoryRouter }
    );

    expect(screen.queryByTestId("repos-list")).not.toBeInTheDocument();
  });
});
