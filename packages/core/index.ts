//
type Action = string;
type State<S extends {} = {}> = S;
type Payload<S extends {} = {}> = Partial<S>;
type Listener<S extends {} = {}> = (state:S, action: Action) => void;
type Reducer<S extends {} = {}> = (state:S, payload?: Payload<S>) => S;
type Router<S extends {} = {}> = Record<Action, Reducer<S>>;

export interface CreateResult<S extends State = {}, A = string> {
  route: (action: A, reducer: Reducer<S>) => void;
  dispatch: (action: A, payload?: Payload<S>) => void;
  listen: (listener: Listener) => void;
}
interface Store<S extends {} = {}> {
  state: S;
  listeners: Listener<S>[];
  router: Router<S>;
}
//
export const create = <S extends State = {}>(initState: S): CreateResult<S> => {
  const store: Store<S> = {
    state: initState,
    listeners: [],
    router: {},
  };
  // route
  const route = (action: Action, reducer: Reducer<S>) => {
    store.router[action] = reducer;
  };
  // listen
  const listen = (listener: Listener<S>) => {
    store.listeners = [...store.listeners, listener];
  };
  // dispatch
  const dispatch = (action: Action, payload?: Payload<S>) => {
    const reducer = store.router[action];
    store.state = reducer(store.state, payload);
    store.listeners.forEach(listener => listener(store.state, action));
  };
  return { route, listen, dispatch };
};