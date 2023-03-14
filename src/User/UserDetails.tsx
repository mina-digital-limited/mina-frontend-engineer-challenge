import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context";
import Loading from "../common/Loading";
import Requests from "../requests";
import { ActionKind, User, OctokitResponseError } from "../common/types";
import { OctokitResponse } from "@octokit/types";

const UserHeader: FC = () => {
  const {
      state: { user },
      dispatch,
    } = useContext(Context),
    { requestedUsername = "" } = useParams();

  const { loading, error, data } = user || {},
    { name, login = "", avatar_url } = data || ({} as User);

  useEffect(() => {
    dispatch({ type: ActionKind.USER_LOADING });

    Requests.getUser(requestedUsername)
      .then((response: OctokitResponse<User>) =>
        dispatch({ type: ActionKind.USER_SUCCESS, payload: response })
      )
      .catch((error: OctokitResponseError) =>
        dispatch({ type: ActionKind.USER_ERROR, payload: error.response })
      );
  }, [requestedUsername, dispatch]);

  if (error) {
    return <p className="message message--error">{error.message}</p>;
  }

  if (loading) {
    return <Loading>Loading user</Loading>;
  }

  return (
    <section className="user" data-testid="user-details">
      <img className="user__avatar" src={avatar_url} alt="avatar" />

      <h2 className="user__name">{name || login}</h2>
    </section>
  );
};

export default UserHeader;
