import { APP_NAME } from "./constants";
import { Repositories } from "./types";
import {
  determineLastPageFromLinkHeader,
  findRepo,
  setDocumentTitle,
  sliceItemsForCurrentPage,
} from "./utilities";

describe("Utilities", () => {
  it("Should search an array of repos for a given repo name", () => {
    const someOtherRepo = { id: 1, name: "backendUtils" },
      matchingRepo = { id: 2, name: "frontendUtils" },
      haystack = [someOtherRepo, matchingRepo];

    const needle = "frontendUtils";

    expect(findRepo(needle, haystack as Repositories)).toStrictEqual(
      matchingRepo
    );
  });

  it("Should set document title", () => {
    setDocumentTitle(["Barry Harley", "User Profile"]);

    expect(document.title).toEqual("Barry Harley | User Profile | " + APP_NAME);
  });

  it("Should determine last page number from link header", () => {
    expect(
      determineLastPageFromLinkHeader(
        '<https://api.github.com/repositories/4357713/commits?per_page=10&page=2>; rel="next", <https://api.github.com/repositories/4357713/commits?per_page=10&page=5>; rel="last"'
      )
    ).toBe(5);
  });
});

describe("commitsUtilities", () => {
  it("Should slice items for current page", () => {
    const perPage = 2,
      items = [1, 2, 3, 4, 5, 6];

    expect(
      sliceItemsForCurrentPage({ items, currentPage: 1, perPage })
    ).toStrictEqual([1, 2]);

    expect(
      sliceItemsForCurrentPage({ items, currentPage: 2, perPage })
    ).toStrictEqual([3, 4]);

    expect(
      sliceItemsForCurrentPage({ items, currentPage: 3, perPage })
    ).toStrictEqual([5, 6]);
  });
});
