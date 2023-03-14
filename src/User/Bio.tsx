import { FC, useContext } from "react";
import { Context } from "../Context";
import { User } from "../common/types";

const Bio: FC = () => {
  const {
      state: { user },
    } = useContext(Context),
    { bio } = user?.data || {};

  if (!bio) {
    return null;
  }

  return (
    <section className="section">
      <h3 className="section__heading">Bio</h3>

      <p className="paragraph">{bio}</p>
    </section>
  );
};

export default Bio;
