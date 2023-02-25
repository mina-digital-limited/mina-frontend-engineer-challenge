import ContextProvider, { Context } from "../Context";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import {
  MemoryRouter,
  Routes,
  MemoryRouterProps,
  Route,
} from "react-router-dom";

export const renderContextWithProps = (
  ui: ReactElement,
  providerProps: object = {},
  renderOptions?: RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >
) =>
  render(
    <Context.Provider value={{ state: providerProps, dispatch: () => {} }}>
      {ui}
    </Context.Provider>,
    renderOptions
  );

interface renderContextAndRouterOptions {
  routerProps?: MemoryRouterProps;
  renderOptions?: RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  path?: string;
}

export const renderContextAndRouter = (
  ui: ReactElement,
  { path, routerProps, renderOptions }: renderContextAndRouterOptions
) =>
  render(
    <ContextProvider>
      <MemoryRouter {...routerProps}>
        <Routes>
          <Route element={ui} path={path}></Route>
        </Routes>
      </MemoryRouter>
    </ContextProvider>,
    renderOptions
  );

interface renderContextAndRouterWithPropsOptions
  extends renderContextAndRouterOptions {
  providerProps?: object;
}

export const renderContextAndRouterWithProps = (
  ui: ReactElement,
  {
    providerProps = {},
    path,
    routerProps,
    renderOptions,
  }: renderContextAndRouterWithPropsOptions = {}
) =>
  render(
    <Context.Provider value={{ state: providerProps, dispatch: () => {} }}>
      <MemoryRouter {...routerProps}>
        <Routes>
          <Route element={ui} path={path}></Route>
        </Routes>
      </MemoryRouter>
    </Context.Provider>,
    renderOptions
  );
