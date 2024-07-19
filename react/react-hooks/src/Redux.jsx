import { useState } from "react";
import { createStore } from "redux";

const defaultState = { value: 0, userId: 0, products: [] };

const counterReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case "increase":
      return { value: prevState.value + 1 };
    case "decrease":
      return { value: prevState.value - 1 };
    case "setUser":
      return { ...prevState, userId: action.payload };
    default:
      return prevState;
  }
};

let store = createStore(counterReducer);
const increaseCount = {
  type: "increase",
};

const decreaseCount = {
  type: "decrease",
};

store.dispatch(increaseCount);

export const Redux = () => {
  const [value, setValue] = useState(store.getState().value);
  store.subscribe(() => {
    console.log(store.getState());
    setValue(store.getState().value);
  });

  const handleIncrease = () => {
    store.dispatch(increaseCount);
  };

  return (
    <div>
      <p>{value}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button
        onClick={() => {
          store.dispatch(decreaseCount);
        }}
      >
        Decrease
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "setUser", payload: 1 });
        }}
      >
        Set User
      </button>
    </div>
  );
};
