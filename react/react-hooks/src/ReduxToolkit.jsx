import { useState } from "react";
import { store, increment, decrement, setUserId, setUserName } from "./store";

export const ReduxToolKit = () => {
  const [count, setCount] = useState(store.getState().counter);

  store.subscribe(() => {
    setCount(store.getState().counter);
    console.log(store.getState());
  });

  return (
    <div>
      <p>{count.value}</p>
      <button
        onClick={() => {
          store.dispatch(increment());
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          store.dispatch(decrement());
        }}
      >
        decrease
      </button>

      <button
        onClick={() => {
          store.dispatch(setUserId(1));
        }}
      >
        Set userId
      </button>
      <button
        onClick={() => {
          store.dispatch(setUserName("Test"));
        }}
      >
        Set user name
      </button>
    </div>
  );
};
