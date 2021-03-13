import * as React from "react";
import { create, CreateResult, State } from "@inducer/core";

export const createContext = <S extends State = {}>(initState: S) => {
  type Context = { state: S } & CreateResult<S>;
  const Context = React.createContext<Context>({
    state: initState,
    route: () => null,
    dispatch: () => null,
    listen: () => null,
  });
  const Inducer: React.FC = ({ children }) => {
    const [state, setState] = React.useState<S>(initState);
    const { dispatch, route, listen } = React.useMemo(() => create<S>(initState), [initState]);
    listen(s => setState(s as S));
    return (
      <Context.Provider value={{ state, dispatch, route, listen }}>
        {children}
      </Context.Provider>
    );
  }
  return Object.assign(Context, { Inducer });
};
