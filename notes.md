# Notes

## Wireframes

See 'wireframes' folder - a set of very rough sketches that I used to get the ball rolling.

Please excuse my lack of artistic mastery ;-)



## Acceptance Criteria

Below is the A/Cs I used when planning this task:


### Landing Page

>  **GIVEN** I have not yet entered a username

>  **THEN** I am presented with a search bar and instructions asking me to enter a username


### Searching Valid Users


>  **WHEN** I search for a **valid** GitHub username

>  **THEN** I am presented with information about that user including:

>  - Display name

>  - Profile image

>  - Bio

>  **AND** A list of of their public repositories (if any, otherwise appropriate messaging)

>  **AND** A 'Latest commits' link for each repository (if any, otherwise appropriate messaging)

  

### Searching Invalid Users


>  **WHEN** I search for an **invalid** GitHub username

>  **THEN** An error message is shown indicating that the user cannot be found

  

### Commits

  

>  **GIVEN** I have performed a search for a valid GitHub username

>  **AND** That user has **at least one** public repository

>  **WHEN** I click the 'Latest commits' link for a given repository

>  **THEN** I am presented with a list of that repositories last 5 commits with the following information for each:

>  - Commit message

>  - Author

>  - Creation time

>  **AND** A back button, within the UI, is shown to allow me to return to the previous screen


### Navigation

>  **GIVEN** I have performed a search for a valid GitHub username

>  **AND** I am viewing the latest commits list for one of their repositories

>  **WHEN** I click the UI back button

>  **THEN** I am presented with the previous screen which shows the user info and repos


## Next Steps

A wish list of what I'd do next given more time:

-  **Pagination** - for repos

-  **Error handling** - swap out the generic error messages, which come directly from the api (for scenarios such as when a user doesn't exist), with custom error messages that are more user friendly and descriptive. I'd also encapsulate error messaging within it's own component.

-  **More test coverage**
	 - In CommitsList tests I've used msw, to mock api responses, I would extend the use of this to other test suites such UserDetails and ReposList.
	 - Running `yarn test coverage` hightlights a few areas that are uncovered.

- **Improved user search** - utilise the user search endpoint https://api.github.com/search/users so that you don't need to enter an exact username to get some useful results.

- **Reduce complexity of testUtilities** - I ended up with a few different flavours of custom render functions, I feel there's an opportunity for some refactoring here to simplify things.
