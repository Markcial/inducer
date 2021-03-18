# Inducer
UI agnostic dynamic reducer

## Reducers choices on the market

 * https://redux.js.org/ Powerful, but complex
 * https://reactjs.org/docs/hooks-reference.html#usereducer tied to react, fixed reducer, can't be extended

## Why?

I found myself writting a lot of reducer actions over the time, and one of the things I would like to have, is the chance to extend those reductions wherever they had more meaning. Redux can help you on that, but there is a lot of overhead when you add redux on some codebases. I tried to work out a minimal concept, all the complexity it's stored in a single TS, typed file

This reducer comes with zero dependencies, the only ones you will find are for testing and development. You could even grab the inducer file and place it inside your project.

## Usage

As simple as:

```
import { create } from "@inducer/core";

const { route, listen, dispatch } = create({ items: [] }); // get the methods

// add the routes
route("add", ({ items }, { items: newItems = [] }) => ({ items: [...items, ...newItems]}));

listen(state => console.log(state)); // listen for changes
dispatch("add", { items: ["banana", "apple"] }); // dispatch with optional payload
```

## Try it

Check the samples on:
 * [React examples](./packages/react-examples/README.md)
 * [Node examples](./packages/node-examples/README.md)
