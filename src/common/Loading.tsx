import { FC } from "react";
import { DEFAULT_LOADING_TEXT } from "./constants";

const Loading: FC = ({ children }) => (
  <p className="loading">{children || DEFAULT_LOADING_TEXT}</p>
);

export default Loading;
