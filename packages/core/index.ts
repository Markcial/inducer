//
export type Action = string;
export type State<S extends {}> = S;
type Payload<S extends {}> = Partial<S>;
type Listener<S extends {}> = (state:S, action: Action) => void;
type Reducer<S extends {}> = (state:S, payload: Payload<S>) => S;
type Router<S extends {}> = Record<Action, Reducer<S>>;
export type CreateResult<S extends {}> = {
  route: (action: Action, reducer: Reducer<S>) => void;
  dispatch: (action: Action, payload?: Payload<S>) => void;
  listen: (listener: Listener<S>) => void;
}
export const create = <S extends {}>(initState: S): CreateResult<S> => {
  let state: S = initState;
  let listeners: Listener<S>[] = [];
  let router: Router<S> = {};
  // route
  const route = (action: Action, reducer: Reducer<S>) => {
    router = { ...router, [action]: reducer }
  };
  // listen
  const listen = (listener: Listener<S>) => {
    listeners = [...listeners, listener];
  };
  // dispatch
  const dispatch = (action: Action, payload: Payload<S> = {}) => {
    const reducer = router[action] as Reducer<S>;
    state = reducer(state, payload);
    listeners.forEach(listener => listener(state, action));
  };
  return { route, listen, dispatch };
};
