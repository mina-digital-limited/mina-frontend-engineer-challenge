import { FC } from "react";
import { WELCOME_MESSAGE } from "../common/constants";

const LandingPage: FC = () => {
  return <p className="message">{WELCOME_MESSAGE}</p>;
};

export default LandingPage;
