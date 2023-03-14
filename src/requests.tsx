import { Octokit } from "octokit";
import { CommitRequestParams } from "./common/types";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const getUser = (username: string) =>
  octokit.request("GET /users/{username}", { username });

const getRepos = (username: string) =>
  octokit.request("GET /users/{username}/repos", { username });

const getCommits = (commitRequest: CommitRequestParams) =>
  octokit.request("GET /repos/{username}/{repo}/commits{?per_page,page}", {
    ...commitRequest,
  });

const requests = {
  getUser,
  getRepos,
  getCommits,
};

export default requests;
