import { create } from "@inducer/core";

const state = { count: 0 };
const { route, listen, dispatch } = create(state);

route("tick", ({ count }) => ({ count: count + 1 }));

listen(({ count }, action) => console.log(`Got ${action}, ${count} times.`));

setInterval(
  () => dispatch("tick"),
  1000,
);