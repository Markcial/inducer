import * as React from "react";
import { render } from "react-dom";
import { Action } from "@inducer/core";
import { createContext } from "@inducer/react";

const plus: Action = "plus";
const minus: Action = "minus";
const state = { page: 0 };
const Context = createContext(state);

const Example = () => {
  const { state: { page }, dispatch, route } = React.useContext(Context);
  route(plus, ({ page }) => ({ page: page + 1 }))
  route(minus, ({ page }) => ({ page: page - 1 }))
  return (
    <div>
      <h1>{page}</h1>
      <ul>
        <li><button onClick={() => dispatch(plus)}>Plus</button></li>
        <li><button onClick={() => dispatch(minus)}>Minus</button></li>
      </ul>
    </div>
  );
}

const App = () => (
  <Context.Inducer><Example/></Context.Inducer>
)

render(<App />, document.querySelector("#app"));
