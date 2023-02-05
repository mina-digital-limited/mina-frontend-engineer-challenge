import { components } from "@octokit/openapi-types";
import { OctokitResponse, ResponseHeaders } from "@octokit/types";

export type ApiError = components["schemas"]["basic-error"];
export type User = components["schemas"]["public-user"];
export type Repository = components["schemas"]["minimal-repository"];
export type Repositories = Repository[];
export type Commit = components["schemas"]["commit"];
export type Commits = Commit[];

export enum ActionKind {
  USER_LOADING = "USER_LOADING",
  USER_SUCCESS = "USER_SUCCESS",
  USER_ERROR = "USER_ERROR",
  REPOS = "REPOS",
  REPOS_SUCCESS = "REPOS_SUCCESS",
  REPOS_ERROR = "REPOS_ERROR",
  COMMITS = "COMMITS",
  COMMITS_SUCCESS = "COMMITS_SUCCESS",
  COMMITS_ERROR = "COMMITS_ERROR",
}

export interface StateItem<T> {
  data?: T;
  headers?: ResponseHeaders;
  error?: ApiError;
  loading?: boolean;
}

export interface State {
  user?: StateItem<User>;
  repos?: StateItem<Repositories>;
  commits?: StateItem<Commits>;
}

export type Payload = OctokitResponse<User | Repositories | Commits | ApiError>;

export interface Action {
  type: ActionKind;
  payload?: Payload;
}

export interface OctokitResponseError {
  response: OctokitResponse<ApiError>;
}

export interface CommitRequestParams {
  username: string;
  repo: string;
  per_page: string;
  page: string;
}
