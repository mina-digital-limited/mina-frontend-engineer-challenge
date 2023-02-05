import { FC, useContext } from "react";
import { Context } from "../Context";
import { setDocumentTitle } from "../common/utilities";
import ReposList from "../Repos/ReposList";
import UserDetails from "./UserDetails";

const Profile: FC = () => {
  const {
      state: { user },
    } = useContext(Context),
    { name, login } = user?.data || {};

  setDocumentTitle([name || login || "User Profile"]);

  return (
    <>
      <UserDetails />
      {user?.data && <ReposList />}
    </>
  );
};

export default Profile;
