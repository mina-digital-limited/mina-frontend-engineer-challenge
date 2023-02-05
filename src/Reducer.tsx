import { Reducer } from "react";
import {
  Action,
  State,
  User,
  ApiError,
  ActionKind,
  Commits,
  Repositories,
} from "./common/types";

const appReducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  const { data, headers } = action.payload || {};

  switch (action.type) {
    case ActionKind.USER_LOADING:
      return { ...prevState, user: { loading: true } };

    case ActionKind.USER_SUCCESS:
      return {
        ...prevState,
        user: { data: data as User, headers, loading: false },
      };

    case ActionKind.USER_ERROR:
      return {
        ...prevState,
        user: { error: data as ApiError, headers, loading: false },
      };

    case ActionKind.REPOS:
      return { ...prevState, repos: { loading: true } };

    case ActionKind.REPOS_SUCCESS:
      return {
        ...prevState,
        repos: { data: data as Repositories, headers, loading: false },
      };

    case ActionKind.REPOS_ERROR:
      return {
        ...prevState,
        repos: { error: data as ApiError, headers, loading: false },
      };

    case ActionKind.COMMITS:
      return { ...prevState, commits: { loading: true } };

    case ActionKind.COMMITS_SUCCESS:
      return {
        ...prevState,
        commits: { data: data as Commits, headers, loading: false },
      };

    case ActionKind.COMMITS_ERROR:
      return {
        ...prevState,
        commits: { error: data as ApiError, headers, loading: false },
      };

    default:
      throw new Error(
        `[Reducer.tsx] Action  of type '${action.type}' does not exist`
      );
  }
};

export default appReducer;
