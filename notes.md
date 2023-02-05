
# Notes

## Wireframes

See 'wireframes' folder - a set of very rough sketches that I used to get the ball rolling.

Please excuse my lack of artistic mastery ;-)

## Acceptance Criteria

Below is the A/Cs I used when planning this task:

### Landing Page

> **GIVEN** I have not yet entered a username
> **THEN** I am presented with a search bar and instructions asking me to enter a username

### Searching Valid Users

> **WHEN** I search for a **valid** GitHub username
> **THEN** I am presented with information about that user including:
> - Display name
> - Profile image
> - Bio
> 
> **AND** A list of of their public repositories (if any, otherwise appropriate messaging)
> **AND** A 'Latest commits' link for each repository (if any, otherwise appropriate messaging)

### Searching Invalid Users

> **WHEN** I search for an **invalid** GitHub username
> **THEN** An error message is shown indicating that the user cannot be found

### Commits

> **GIVEN** I have performed a search for a valid GitHub username
> **AND** That user has **at least one** public repository
> 
> **WHEN** I click the 'Latest commits' link for a given repository
> 
> **THEN** I am presented with a list of that repositories last 5 commits with the following information for each:
> - Commit message
> - Author
> - Creation time
> **AND** A back button, within the UI, is shown to allow me to return to the previous screen

### Navigation

> **GIVEN** I have performed a search for a valid GitHub username
> **AND** I am viewing the latest commits list for one of their repositories
> 
> **WHEN** I click the UI back button
> 
> **THEN** I am presented with the previous screen which shows the user info and repos

## Next Steps

A wish list of what I'd do next given more time:

- **Pagination** - for commits and repos
- **Error handling** -  swap out the generic error messages, which come directly from the api (for scenarios such as when a user doesn't exist), with custom error messages that are more user friendly and descriptive. I'd also move the error messaging to it's own component.
- **Repo summary component** - Within `CommitsList.tsx` there's a section which lists the repo/branch. This should be moved to its own component and styling added.
- **More test coverage** - In particular around api requests and responses.
