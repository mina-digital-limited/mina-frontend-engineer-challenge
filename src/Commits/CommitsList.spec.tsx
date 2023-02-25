import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderContextAndRouter } from "../common/testUtilities";
import CommitsList from "./CommitsList";
import { rest } from "msw";
import { setupServer } from "msw/node";

const path = "/user/:requestedUsername/repo/:requestedRepo",
  username = "bmharley",
  repoName = "frontendUtils",
  branchName = "branchName";

const linkHeader =
  '<https://api.github.com/repositories/4357713/commits?per_page=2&page=2>; rel="next", <https://api.github.com/repositories/4357713/commits?per_page=2&page=2>; rel="last"';

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

const providerProps = {
  commits: { loading: false, data: commits },
  user: { loading: false, data: { login: username } },
  repos: {
    loading: false,
    data: [{ id: 1, name: repoName, default_branch: branchName }],
  },
};

const server = setupServer(
  rest.get(
    `https://api.github.com/repos/${username}/${repoName}/commits`,
    (req, res, ctx) => {
      return res(ctx.json(commits), ctx.set("link", linkHeader));
    }
  ),
  rest.get(`https://api.github.com/users/${username}`, (req, res, ctx) => {
    return res(ctx.json({ login: username }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routerProps = {
  initialEntries: [`/user/${username}/repo/${repoName}`],
};

const renderOptions = { path, routerProps };

describe("CommitsList", () => {
  describe("Loading", () => {
    it("Should render loading spinner when repos are being loaded", async () => {
      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() =>
        expect(screen.getByText(/loading commits/i)).toBeInTheDocument()
      );

      await waitFor(() =>
        expect(screen.queryByText(/loading commits/i)).not.toBeInTheDocument()
      );
    });
  });

  describe("Basic rendering", () => {
    it("Should render a link back to profile with relevant url", async () => {
      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() => {
        const backToProfile = screen.getByText("Back to profile");

        expect(backToProfile).toBeInTheDocument();
        expect(backToProfile?.closest("a")).toHaveAttribute(
          "href",
          "/user/" + username
        );
      });
    });

    it("Should render user details", async () => {
      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() =>
        expect(screen.getByTestId("user-details")).toBeInTheDocument()
      );
    });

    it("Should render repo details", async () => {
      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() =>
        expect(
          screen.getByText("Repo: " + repoName, { exact: false })
        ).toBeInTheDocument()
      );
    });
  });

  describe("Render commits", () => {
    it("Should render a list of commits", async () => {
      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() => {
        expect(screen.getByText("initial commit")).toBeInTheDocument();
        expect(screen.getByText("code review changes")).toBeInTheDocument();
      });

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

  describe("Pagination", () => {
    it("Should render first page", async () => {
      renderContextAndRouter(<CommitsList perPage={1} />, renderOptions);

      await waitFor(() => screen.getByText("initial commit"));

      const nextButton = screen.getByRole("button", { name: /older/i }),
        previousButton = screen.getByRole("button", { name: /newer/i });

      expect(screen.getByText("initial commit")).toBeInTheDocument();

      expect(screen.queryByText("code review changes")).not.toBeInTheDocument();

      expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();

      expect(previousButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });

    it("Should navigate between pages", async () => {
      renderContextAndRouter(<CommitsList perPage={1} />, renderOptions);

      await waitFor(() => screen.getByText("initial commit"));

      const nextButton = screen.getByRole("button", { name: /older/i }),
        previousButton = screen.getByRole("button", { name: /newer/i });

      fireEvent.click(nextButton);

      await waitFor(() => screen.getByText("code review changes"));

      expect(screen.queryByText("initial commit")).not.toBeInTheDocument();

      expect(screen.getByText("code review changes")).toBeInTheDocument();

      expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();

      expect(nextButton).toBeDisabled();
      expect(previousButton).not.toBeDisabled();

      fireEvent.click(previousButton);

      await waitFor(() => screen.getByText("initial commit"));

      expect(screen.getByText("initial commit")).toBeInTheDocument();

      expect(screen.queryByText("code review changes")).not.toBeInTheDocument();

      expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();

      expect(previousButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe("Error handling", () => {
    it("Should render error message when flagged in api response", async () => {
      const message = "Not found";

      server.use(
        rest.get(
          `https://api.github.com/repos/${username}/${repoName}/commits`,
          (req, res, ctx) => {
            return res(ctx.json({ message }), ctx.status(404));
          }
        )
      );

      renderContextAndRouter(<CommitsList />, renderOptions);

      await waitFor(() =>
        expect(screen.getByText(message)).toBeInTheDocument()
      );
    });
  });
});
