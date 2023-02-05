import { APP_NAME } from "./constants";
import { Repositories } from "./types";
import { findRepo, setDocumentTitle } from "./utilities";

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
});
