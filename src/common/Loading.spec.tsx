import { render, screen } from "@testing-library/react";
import { DEFAULT_LOADING_TEXT } from "../common/constants";
import Loading from "./Loading";

describe("Loading", () => {
  it("Should render loading spinner with default text", () => {
    render(<Loading />);
    expect(screen.getByText(DEFAULT_LOADING_TEXT)).toBeInTheDocument();
  });

  it("Should render loading spinner with provided content", () => {
    render(<Loading>Loading user profile</Loading>);
    expect(screen.queryByText(DEFAULT_LOADING_TEXT)).not.toBeInTheDocument();
  });
});
