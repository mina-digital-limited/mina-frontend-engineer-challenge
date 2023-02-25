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

export const determineLastPageFromLinkHeader = (linkHeader: string) =>
  Number((/page=(\d*)>; rel="last"/g.exec(linkHeader) || [])[1]);

export const sliceItemsForCurrentPage = <T>({
  items,
  currentPage,
  perPage,
}: {
  items: T[];
  currentPage: number;
  perPage: number;
}) => {
  const end = currentPage * perPage,
    start = end - perPage;

  return items.slice(start, end);
};
