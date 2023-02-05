import { Context } from "../Context";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { State } from "./types";
import {
  MemoryRouter,
  Routes,
  Route,
  MemoryRouterProps,
} from "react-router-dom";
import ReposList from "../Repos/ReposList";

export const renderWithContext = (
  ui: ReactElement,
  providerProps: object,
  renderOptions?: RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >
): RenderResult =>
  render(
    <Context.Provider value={{ state: providerProps, dispatch: () => {} }}>
      {ui}
    </Context.Provider>,
    renderOptions
  );

export const renderWithContextAndRouter = (
  ui: ReactElement,
  providerProps: object,
  memoryRouterProps?: MemoryRouterProps,
  renderOptions?: RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >
): RenderResult =>
  render(
    <Context.Provider value={{ state: providerProps, dispatch: () => {} }}>
      <MemoryRouter {...memoryRouterProps}>
        <Routes>{ui}</Routes>
      </MemoryRouter>
    </Context.Provider>,
    renderOptions
  );
