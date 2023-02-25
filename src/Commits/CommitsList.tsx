import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../Context";
import Loading from "../common/Loading";
import Requests from "../requests";
import {
  Commits,
  ActionKind,
  Commit,
  OctokitResponseError,
} from "../common/types";
import {
  sliceItemsForCurrentPage,
  determineLastPageFromLinkHeader,
  setDocumentTitle,
} from "../common/utilities";
import UserDetails from "../User/UserDetails";
import { OctokitResponse } from "@octokit/types";

const CommitsList: FC<{ perPage?: number }> = ({ perPage = 10 }) => {
  const {
      state: { commits },
      dispatch,
    } = useContext(Context),
    [currentPage, setCurrentPage] = useState(1),
    [lastPage, setLastPage] = useState(0),
    hasInitialisedCommits = useRef(false),
    { requestedUsername = "", requestedRepo = "" } = useParams();

  const { loading, error, data: commitsArray = [] } = commits || {};

  const loadCommits = useCallback(
    (page: number = 1) => {
      dispatch({ type: ActionKind.COMMITS });

      Requests.getCommits({
        username: requestedUsername,
        repo: requestedRepo,
        per_page: perPage.toString(),
        page: page.toString(),
      })
        .then((response: OctokitResponse<Commits>) => {
          dispatch({ type: ActionKind.COMMITS_SUCCESS, payload: response });

          // Note - Link header isn't always available (e.g. if we actually request the last page OR there's only one page)
          // Only ever set this once, so that if it's unavailable on subsequent requests, we don't inadvertantly override it
          if (!lastPage) {
            setLastPage(
              determineLastPageFromLinkHeader(response.headers?.link || "") || 1
            );
          }
        })
        .catch((error: OctokitResponseError) =>
          dispatch({ type: ActionKind.COMMITS_ERROR, payload: error.response })
        );
    },
    [requestedUsername, requestedRepo, dispatch, perPage, lastPage]
  );

  useEffect(() => {
    if (hasInitialisedCommits.current) {
      return;
    }

    // Clear out all commits so that we don't have any unwanted data lingering from a previous request
    dispatch({ type: ActionKind.COMMITS_RESET });

    loadCommits();
    hasInitialisedCommits.current = true;
  }, [loadCommits, dispatch]);

  const showNewer = () => setCurrentPage(currentPage - 1);

  const showOlder = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    // Only ask the api for more comments when we've ran out of them in the context
    if (commitsArray.length <= currentPage * perPage) {
      loadCommits(nextPage);
    }
  };

  const hasNewer = () => currentPage > 1;

  const hasOlder = () => currentPage < lastPage;

  const commitListItems = sliceItemsForCurrentPage({
    items: commitsArray || [],
    currentPage,
    perPage,
  })?.map(({ author, sha, commit }: Commit) => {
    const authorLink = (
      <Link to={"/user/" + author?.login}>
        {commit.author?.name || author?.login}
      </Link>
    );

    const commitDate =
      commit.author?.date && new Date(commit.author.date).toLocaleDateString();

    return (
      <li className="list__item" key={sha}>
        {commit.message}
        <br />
        <span className="list__secondary-text">
          Author: {authorLink} | Date: {commitDate}
        </span>
      </li>
    );
  });

  setDocumentTitle([requestedRepo, "Commits"]);

  if (error) {
    return <p className="message message--error">{error.message}</p>;
  }

  if (loading) {
    return <Loading>Loading commits</Loading>;
  }

  return (
    <>
      <UserDetails />

      <section className="section">
        <h3 className="section__heading">
          <Link to={"/user/" + requestedUsername} className="back-link">
            <span className="back-link__label">Back to profile</span>
          </Link>
          Commits
        </h3>

        <p className="paragraph">Repo: {requestedRepo}</p>

        <ul className="list">{commitListItems}</ul>

        <button className="button" onClick={showNewer} disabled={!hasNewer()}>
          Newer
        </button>

        <button className="button" onClick={showOlder} disabled={!hasOlder()}>
          Older
        </button>

        <p className="paragraph">
          Page {currentPage} of {lastPage}
        </p>
      </section>
    </>
  );
};

export default CommitsList;
