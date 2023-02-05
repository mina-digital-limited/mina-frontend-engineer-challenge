import { FC, createContext, useReducer, Dispatch } from "react";
import Reducer from "./Reducer";
import { Action, State } from "./common/types";

const intialState: State = {};

export const Context = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: intialState,
  dispatch: () => undefined,
});

const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, intialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
