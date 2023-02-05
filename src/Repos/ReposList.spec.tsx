import { screen, within } from "@testing-library/react";
import {
  renderWithContext,
  renderWithContextAndRouter,
} from "../common/testUtilities";
import ReposList from "./ReposList";
import { Route } from "react-router-dom";

describe("ReposList", () => {
  describe("Loading", () => {
    it("Should render loading spinner when repos are being loaded", () => {
      renderWithContext(<ReposList />, { repos: { loading: true } });

      expect(screen.getByText("Loading repos")).toBeInTheDocument();
    });

    it("Should not render loading spinner when loading false", () => {
      renderWithContext(<ReposList />, { repos: { loading: false } });

      expect(screen.queryByText("Loading repos")).not.toBeInTheDocument();
    });
  });

  describe("Render repos", () => {
    const requestedUsername = "bmharley",
      repos = [
        { id: 1, name: "frontendUtils" },
        { id: 2, name: "backendUtils" },
      ],
      mockStore = {
        repos: { loading: false, data: repos },
      };

    it("Should render a list of repos", () => {
      renderWithContextAndRouter(
        <Route path="/user/:requestedUsername" element={<ReposList />}></Route>,
        mockStore,
        { initialEntries: ["/user/" + requestedUsername] }
      );

      expect(screen.getByText("frontendUtils")).toBeInTheDocument();
      expect(screen.getByText("backendUtils")).toBeInTheDocument();
    });

    it("Should render latest commits links", () => {
      renderWithContextAndRouter(
        <Route path="/user/:requestedUsername" element={<ReposList />}></Route>,
        mockStore,
        { initialEntries: ["/user/" + requestedUsername] }
      );

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
      const message = "Not found";
      renderWithContext(<ReposList />, {
        repos: { loading: false, error: { message } },
      });
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
