import { screen } from "@testing-library/react";
import { renderContextWithProps } from "../common/testUtilities";
import Bio from "./Bio";

describe("Bio", () => {
  it("Should not render when no user", () => {
    renderContextWithProps(<Bio />);

    expect(screen.queryByText("Bio")).not.toBeInTheDocument();
  });

  it("Should render bio for current user", () => {
    const bio = "this is all about me...";
    renderContextWithProps(<Bio />, {
      user: { loading: false, data: { bio } },
    });

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Bio");
    expect(screen.getByText(bio)).toBeInTheDocument();
  });
});
