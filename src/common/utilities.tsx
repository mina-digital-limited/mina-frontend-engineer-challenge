import { APP_NAME } from "./constants";
import { Repository, Repositories } from "./types";

export const findRepo = (
  repoName: string,
  haystack: Repositories
): Repository | undefined => haystack.find((repo) => repo.name === repoName);

export const setDocumentTitle = (title: Array<string>): string =>
  (document.title = [title.filter((str) => !!str).join(" | "), APP_NAME].join(
    " | "
  ));
