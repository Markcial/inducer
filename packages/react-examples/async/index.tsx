import * as React from "react";
import { render } from "react-dom";
import { Action } from "@inducer/core";
import { createContext } from "@inducer/react";

const getImage: Action = "getImage";
const imageLoaded: Action = "imageLoaded";
const state = { image: "", loading: false };
const Context = createContext(state);

const Viewer: React.FC = () => {
  const { state: { image, loading }, dispatch, route } = React.useContext(Context);
  route(imageLoaded, (_state, { image }) => ({ image: image as string, loading: false }));
  route(getImage, (state) => {
    fetch("https://httpbin.org/image/png")
      .then(r => r.blob())
      .then(URL.createObjectURL)
      .then(data => dispatch(imageLoaded, { image: data }))
    return { ...state, loading: true };
  });
  return (
    <>
      {loading ? "Loading..." : <img src={image}/>}
      <hr/>
      <button onClick={() => dispatch(getImage)}>Load image</button>
    </>
  );
}

const App = () => {
  return <Context.Inducer><Viewer/></Context.Inducer>;
}

render(<App />, document.querySelector("#app"));