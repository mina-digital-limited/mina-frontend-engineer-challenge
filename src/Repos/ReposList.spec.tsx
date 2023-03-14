import { screen, within } from "@testing-library/react";
import { renderContextAndRouterWithProps } from "../common/testUtilities";
import ReposList from "./ReposList";

const requestedUsername = "bmharley",
  repos = [
    { id: 1, name: "frontendUtils" },
    { id: 2, name: "backendUtils" },
  ],
  routerProps = { initialEntries: ["/user/" + requestedUsername] },
  renderOptions = { routerProps, path: "/user/:requestedUsername" };

describe("ReposList", () => {
  describe("Loading", () => {
    it("Should render loading spinner when repos are being loaded", () => {
      const providerProps = { repos: { loading: true } };

      renderContextAndRouterWithProps(<ReposList />, {
        providerProps,
        ...renderOptions,
      });

      expect(screen.getByText("Loading repos")).toBeInTheDocument();
    });

    it("Should not render loading spinner when loading false", () => {
      const providerProps = { repos: { loading: false } };

      renderContextAndRouterWithProps(<ReposList />, {
        providerProps,
        ...renderOptions,
      });

      expect(screen.queryByText("Loading repos")).not.toBeInTheDocument();
    });
  });

  describe("Render repos", () => {
    const providerProps = { repos: { loading: false, data: repos } };

    it("Should render a list of repos", () => {
      renderContextAndRouterWithProps(<ReposList />, {
        providerProps,
        ...renderOptions,
      });

      expect(screen.getByText("frontendUtils")).toBeInTheDocument();
      expect(screen.getByText("backendUtils")).toBeInTheDocument();
    });

    it("Should render latest commits links", () => {
      renderContextAndRouterWithProps(<ReposList />, {
        providerProps,
        ...renderOptions,
      });

      repos.forEach(({ id, name }) => {
        const withinLi = within(
          screen.getByText(name).closest("li") as HTMLElement
        );

        expect(withinLi.getByText("(Latest Commits)")).toBeInTheDocument();
        expect(withinLi.getByText("(Latest Commits)")).toHaveAttribute(
          "href",
          `/user/${requestedUsername}/repo/${name}/`
        );
      });
    });
  });

  describe("Error handling", () => {
    it("Should render error message when flagged in api response", () => {
      const message = "Not found",
        providerProps = { repos: { loading: false, error: { message } } };

      renderContextAndRouterWithProps(<ReposList />, {
        providerProps,
        ...renderOptions,
      });

      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
