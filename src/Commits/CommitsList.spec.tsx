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
  '<https://api.github.com/repositories/4357713/commits?per_page=2&page=2>; rel="next", ' +
  '<https://api.github.com/repositories/4357713/commits?per_page=2&page=2>; rel="last"';

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
  describe("GIVEN a user is on the commits list screen", () => {
    beforeEach(() => renderContextAndRouter(<CommitsList />, renderOptions));

    describe("WHEN data is loading", () => {
      test("THEN a loading message is shown", () => {
        expect(screen.getByText(/loading commits/i)).toBeInTheDocument();
      });
    });

    describe("WHEN data has loaded", () => {
      test("THEN loading message is removed", async () => {
        await waitFor(() => {
          expect(
            screen.queryByText(/loading commits/i)
          ).not.toBeInTheDocument();
        });
      });

      test("THEN details for each commit are shown", async () => {
        await waitFor(() => {
          expect(screen.getByText("initial commit")).toBeInTheDocument();
          expect(screen.getByText("code review changes")).toBeInTheDocument();
        });

        commits.forEach((commit) => {
          const withinLi = within(
              screen
                .getByText(commit.commit.message)
                .closest("li") as HTMLElement
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

      test("THEN back to profile link is shown with appropriate URL", async () => {
        await waitFor(() => {
          const backToProfile = screen.getByText("Back to profile");

          expect(backToProfile).toBeInTheDocument();
          expect(backToProfile?.closest("a")).toHaveAttribute(
            "href",
            "/user/" + username
          );
        });
      });

      test("THEN user details are shown", async () => {
        await waitFor(() =>
          expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            username
          )
        );
      });

      test("THEN repo name is shown", async () => {
        await waitFor(() =>
          expect(
            screen.getByText("Repo: " + repoName, { exact: false })
          ).toBeInTheDocument()
        );
      });
    });

    describe("WHEN an error occurs", () => {
      const message = "Not found";

      beforeAll(() => {
        server.use(
          rest.get(
            `https://api.github.com/repos/${username}/${repoName}/commits`,
            (req, res, ctx) => {
              return res(ctx.json({ message }), ctx.status(404));
            }
          )
        );
      });

      test("THEN an error message is shown", async () => {
        await waitFor(() =>
          expect(screen.getByText(message)).toBeInTheDocument()
        );
      });
    });
  });

  describe("GIVEN commits span multiple pages", () => {
    let nextButton: HTMLElement, previousButton: HTMLElement;

    beforeEach(async () => {
      renderContextAndRouter(<CommitsList perPage={1} />, renderOptions);
      await waitFor(() => screen.getByText("initial commit"));

      (nextButton = screen.getByRole("button", { name: /older/i })),
        (previousButton = screen.getByRole("button", { name: /newer/i }));
    });

    describe("WHEN commits list screen is first loaded", () => {
      test("THEN only commits from first page are shown", () => {
        expect(screen.getByText("initial commit")).toBeInTheDocument();
        expect(
          screen.queryByText("code review changes")
        ).not.toBeInTheDocument();
      });

      test("THEN page counter is displayed with appropriate values", () => {
        expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
      });

      test("THEN previous button is disabled", () => {
        expect(previousButton).toBeDisabled();
      });

      test("THEN next button is enabled", () => {
        expect(nextButton).not.toBeDisabled();
      });
    });

    describe("WHEN user clicks next button", () => {
      beforeEach(async () => {
        fireEvent.click(nextButton);
        await waitFor(() => screen.getByText("code review changes"));
      });

      test("THEN only commits from next page are shown", async () => {
        expect(screen.queryByText("initial commit")).not.toBeInTheDocument();
        expect(screen.getByText("code review changes")).toBeInTheDocument();
      });

      test("THEN page counter is update with appropriate values", () => {
        expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
      });

      test("THEN next button is disabled", () => {
        expect(nextButton).toBeDisabled();
      });

      test("THEN previous button is disabled", () => {
        expect(previousButton).not.toBeDisabled();
      });
    });

    describe("WHEN user clicks previous button", () => {
      beforeEach(async () => {
        fireEvent.click(nextButton);
        await waitFor(() => screen.getByText("code review changes"));

        fireEvent.click(previousButton);
        await waitFor(() => screen.getByText("initial commit"));
      });

      test("THEN only commits from previous page are shown", () => {
        expect(screen.getByText("initial commit")).toBeInTheDocument();
        expect(
          screen.queryByText("code review changes")
        ).not.toBeInTheDocument();
      });

      test("THEN page counter is displayed with appropriate values", () => {
        expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
      });

      test("THEN previous button is disabled", () => {
        expect(previousButton).toBeDisabled();
      });

      test("THEN next button is enabled", () => {
        expect(nextButton).not.toBeDisabled();
      });
    });
  });
});
