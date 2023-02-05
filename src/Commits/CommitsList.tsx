import { FC, useContext, useEffect } from "react";
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
import { findRepo, setDocumentTitle } from "../common/utilities";
import UserDetails from "../User/UserDetails";
import { OctokitResponse } from "@octokit/types";

const CommitsList: FC = () => {
  const {
      state: { commits, repos },
      dispatch,
    } = useContext(Context),
    { requestedUsername = "", requestedRepo = "" } = useParams(),
    perPage = 10,
    currentPage = 1;

  const { loading, error, data: commitsArray } = commits || {},
    repo = repos?.data && findRepo(requestedRepo, repos.data),
    { name: repoName = "", default_branch: branch = "" } = repo || {};

  useEffect(() => {
    dispatch({ type: ActionKind.COMMITS });

    Requests.getCommits({
      username: requestedUsername,
      repo: requestedRepo,
      per_page: perPage.toString(),
      page: currentPage.toString(),
    })
      .then((response: OctokitResponse<Commits>) =>
        dispatch({ type: ActionKind.COMMITS_SUCCESS, payload: response })
      )
      .catch((error: OctokitResponseError) =>
        dispatch({ type: ActionKind.COMMITS_ERROR, payload: error.response })
      );
  }, [requestedUsername, requestedRepo, dispatch]);

  const commitListItems = commitsArray?.map(
    ({ author, sha, commit }: Commit) => {
      const authorLink = (
        <Link to={"/user/" + author?.login}>
          {commit.author?.name || author?.login}
        </Link>
      );

      const commitDate =
        commit.author?.date &&
        new Date(commit.author.date).toLocaleDateString();

      return (
        <li className="list__item" key={sha}>
          {commit.message}
          <br />
          <span className="list__secondary-text">
            Author: {authorLink} | Date: {commitDate}
          </span>
        </li>
      );
    }
  );

  if (error) {
    return <p className="message message--error">{error.message}</p>;
  }

  if (loading) {
    return <Loading>Loading commits</Loading>;
  }

  setDocumentTitle([requestedRepo, "Commits"]);

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

        {repo && (
          <p className="paragraph">
            Repo: {repoName}
            <br />
            Branch: {branch}
          </p>
        )}

        <ul className="list">{commitListItems}</ul>
      </section>
    </>
  );
};

export default CommitsList;
