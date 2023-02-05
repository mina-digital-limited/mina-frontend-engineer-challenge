import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import LandingPage from "./LandingPage/LandingPage";
import Profile from "./User/Profile";
import CommitsList from "./Commits/CommitsList";

const appRouter = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/user/:requestedUsername",
        element: <Profile />,
      },
      {
        path: "/user/:requestedUsername/repo/:requestedRepo",
        element: <CommitsList />,
      },
    ],
  },
]);

export default appRouter;
