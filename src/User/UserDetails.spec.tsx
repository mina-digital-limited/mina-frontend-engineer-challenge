import { screen } from "@testing-library/react";
import { renderContextWithProps } from "../common/testUtilities";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {
  const login = "bmharley",
    name = "Barry Harley",
    avatar_url = "/avatar.png";

  interface MockStore {
    user: {
      loading: boolean;
      data: { name?: string; login: string; avatar_url?: string };
    };
  }

  const mockStore: MockStore = {
    user: { loading: false, data: { name, login, avatar_url } },
  };

  describe("Loading", () => {
    it("Should render loading spinner when user is being loaded", () => {
      renderContextWithProps(<UserDetails />, { user: { loading: true } });

      expect(screen.getByText("Loading user")).toBeInTheDocument();
    });

    it("Should not render loading spinner when loading false", () => {
      renderContextWithProps(<UserDetails />, { user: { loading: false } });

      expect(screen.queryByText("Loading repos")).not.toBeInTheDocument();
    });
  });

  describe("Render user", () => {
    it("Should show full name when available", () => {
      renderContextWithProps(<UserDetails />, mockStore);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(name);
    });

    it("Should fallback to username when no full name", () => {
      const mockStoreCopy = { ...mockStore };
      delete mockStoreCopy.user.data.name;

      renderContextWithProps(<UserDetails />, mockStoreCopy);

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        login
      );
    });

    it("Should render avatar", () => {
      renderContextWithProps(<UserDetails />, mockStore);

      const avatar = screen.getByAltText("avatar");

      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", avatar_url);
    });
  });

  describe("Error handling", () => {
    it("Should render error message when flagged in api response", () => {
      const message = "Not found";
      renderContextWithProps(<UserDetails />, {
        user: { loading: false, error: { message } },
      });
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
