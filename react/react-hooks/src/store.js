import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (draft) => {
      draft.value += 1;
    },
    decrement: (draft) => {
      draft.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
const userSlice = createSlice({
  name: "user",
  initialState: { userId: 0, name: "" },
  reducers: {
    setUserId: (draft, action) => {
      draft.userId = action.payload;
    },
    setUserName: (draft, action) => {
      draft.name = action.payload;
    },
  },
});

export const { setUserId, setUserName } = userSlice.actions;

export const store = configureStore({
  reducer: { counter: counterSlice.reducer, user: userSlice.reducer },
});
