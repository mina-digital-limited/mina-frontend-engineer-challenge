import { FC, useContext, useEffect } from "react";
import { Context } from "../Context";
import {
  ActionKind,
  OctokitResponseError,
  Repositories,
  Repository,
} from "../common/types";
import { Link, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import Requests from "../requests";
import { OctokitResponse } from "@octokit/types";

const ReposList: FC = () => {
  const {
      state: { repos },
      dispatch,
    } = useContext(Context),
    { requestedUsername = "" } = useParams();

  const { loading, error, data: reposArray } = repos || {};

  useEffect(() => {
    dispatch({ type: ActionKind.REPOS });

    Requests.getRepos(requestedUsername)
      .then((response: OctokitResponse<Repositories>) =>
        dispatch({ type: ActionKind.REPOS_SUCCESS, payload: response })
      )
      .catch((error: OctokitResponseError) =>
        dispatch({ type: ActionKind.REPOS_ERROR, payload: error.response })
      );
  }, [requestedUsername, dispatch]);

  if (error) {
    return <p className="message message--error">{error.message}</p>;
  }

  if (loading) {
    return <Loading>Loading repos</Loading>;
  }

  const repoListItems = reposArray?.map((repo: Repository) => (
    <li className="list__item" key={repo.id}>
      {repo.name}
      <br />
      <Link
        to={`/user/${requestedUsername}/repo/${repo?.name}/`}
        className="list__secondary-text link"
      >
        (Latest Commits)
      </Link>
    </li>
  ));

  return (
    <section className="section" data-testid="repos-list">
      <h3 className="section__heading">Repositories</h3>

      <ul className="list">{repoListItems}</ul>
    </section>
  );
};

export default ReposList;
