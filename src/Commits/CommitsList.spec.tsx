import { render, screen, within } from "@testing-library/react";
import {
  renderWithContext,
  renderWithContextAndRouter,
} from "../common/testUtilities";
import { MemoryRouter } from "react-router";
import CommitsList from "./CommitsList";
import { Route } from "react-router-dom";

describe("CommitsList", () => {
  const path = "/user/:requestedUsername/repo/:requestedRepo",
    username = "bmharley",
    repoName = "frontendUtils",
    branchName = "branchName";

  const commits = [
    {
      sha: "id1",
      author: { login: username, date: "" },
      commit: {
        message: "initial commit",
        author: { name: username, date: "2022-07-01T18:00:00Z" },
      },
    },
    {
      sha: "id2",
      author: { login: username, date: "" },
      commit: {
        message: "code review changes",
        author: { name: username, date: "2022-08-02T18:00:00Z" },
      },
    },
  ];

  const mockStore = {
    user: { loading: false, data: { login: username } },
    commits: { loading: false, data: commits },
    repos: {
      loading: false,
      data: [{ id: 1, name: repoName, default_branch: branchName }],
    },
  };

  const routerOptions = {
    initialEntries: [`/user/${username}/repo/${repoName}`],
  };

  describe("Loading", () => {
    it("Should render loading spinner when repos are being loaded", () => {
      renderWithContext(<CommitsList />, { commits: { loading: true } });

      expect(screen.getByText("Loading commits")).toBeInTheDocument();
    });

    it("Should not render loading spinner when loading false", () => {
      renderWithContext(
        <CommitsList />,
        { commits: { loading: false } },
        { wrapper: MemoryRouter }
      );

      expect(screen.queryByText("Loading commits")).not.toBeInTheDocument();
    });
  });

  describe("Basic rendering", () => {
    it("Should render a link back to profile with relevant url", () => {
      renderWithContextAndRouter(
        <Route path={path} element={<CommitsList />}></Route>,
        { commits: { loading: false } },
        routerOptions
      );

      const backToProfile = screen.getByText("Back to profile");

      expect(backToProfile).toBeInTheDocument();
      expect(backToProfile?.closest("a")).toHaveAttribute(
        "href",
        "/user/" + username
      );
    });

    it("Should render user details", () => {
      renderWithContextAndRouter(
        <Route path={path} element={<CommitsList />}></Route>,
        mockStore,
        routerOptions
      );

      expect(screen.queryByTestId("user-details")).toBeInTheDocument();
    });

    it("Should render repo details", () => {
      renderWithContextAndRouter(
        <Route path={path} element={<CommitsList />}></Route>,
        mockStore,
        routerOptions
      );

      expect(
        screen.getByText("Repo: " + repoName, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Branch: " + branchName, { exact: false })
      ).toBeInTheDocument();
    });
  });

  describe("Render commits", () => {
    it("Should render a list of commits", () => {
      renderWithContextAndRouter(
        <Route path={path} element={<CommitsList />}></Route>,
        mockStore,
        routerOptions
      );

      expect(screen.getByText("initial commit")).toBeInTheDocument();
      expect(screen.getByText("code review changes")).toBeInTheDocument();

      commits.forEach((commit) => {
        const withinLi = within(
            screen.getByText(commit.commit.message).closest("li") as HTMLElement
          ),
          authorName = commit.commit.author.name,
          authorElement = withinLi.getByText(authorName),
          createdDate = new Date(commit.commit.author.date)
            .toLocaleDateString()
            .toString();

        expect(authorElement).toBeInTheDocument();
        expect(authorElement?.closest("a")).toHaveAttribute(
          "href",
          `/user/${authorName}`
        );
        expect(
          withinLi.getByText(createdDate, { exact: false })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Error handling", () => {
    it("Should render error message when flagged in api response", () => {
      const message = "Not found";
      renderWithContext(<CommitsList />, {
        commits: { loading: false, error: { message } },
      });
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
