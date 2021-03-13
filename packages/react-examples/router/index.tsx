import * as React from "react";
import { render } from "react-dom";
import { createContext } from "@inducer/react";
import { Action } from "@inducer/core";


const redirect: Action = "redirect";
const state = { page: "/" };
const Context = createContext(state);

const Router: React.FC = ({ children }) => {
  const { route } = React.useContext(Context);
  route(redirect, (_state, { page: redirectTo }) => ({ page: redirectTo as string }));
  return <>{children}</>;
}

const Page: React.FC<{ url: string; }> = ({ children, url }) => {
  const { state: { page } } = React.useContext(Context);
  if (page !== url) {
    return null
  }
  return <>{children}</>;
}

const Link: React.FC<{ go: string }> = ({ children, go }) => {
  const { dispatch } = React.useContext(Context);
  return <a href={`#${go}`} onClick={() => dispatch(redirect, { page: go })}>{children}</a>
}

const App = () => (
  <Context.Inducer>
    <Router>
    <nav>
        <Link go="/">Home</Link>
        &nbsp;
        <Link go="/about">About</Link>
        &nbsp;
        <Link go="/contact">Contact</Link>
      </nav>
      <Page url="/">This is the home page</Page>
      <Page url="/about">About me</Page>
      <Page url="/contact">Contact me</Page>
    </Router>
  </Context.Inducer>
)

render(<App />, document.querySelector("#app"));
