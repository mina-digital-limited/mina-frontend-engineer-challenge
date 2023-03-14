# Mina front-end coding challenge

## Setup

Tested and works with the following versions:
  
- npm: 8.11.0
- node: 16.16.0
- yarn: 1.22.19

If you're using nvm, the `.nvmrc` file has been set with the compatible node version.

To install packages:
`
yarn install
`

## Running the app

In terminal run the following command:
`yarn start`

To run tests:
`yarn test`

To run check test coverage:
`yarn test --coverage`

## Rate limits

By default there's a limit of 60 requests per hour on Github API for unauthenticated requests, add a **.env** file to the root  with an access token to increase this:

For example:
`
REACT_APP_GITHUB_TOKEN=<token-here>
`

How to create a personal access token:
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token