import { screen } from "@testing-library/react";
import { renderWithContext } from "../common/testUtilities";
import Bio from "./Bio";

describe("Bio", () => {
  it("Should not render when no user", () => {
    renderWithContext(<Bio />, {});

    expect(screen.queryByText("Bio")).not.toBeInTheDocument();
  });

  it("Should render bio for current user", () => {
    const bio = "this is all about me...";
    renderWithContext(<Bio />, { user: { loading: false, data: { bio } } });

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Bio");
    expect(screen.getByText(bio)).toBeInTheDocument();
  });
});
