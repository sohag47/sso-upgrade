import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const sharedSlice = createSlice({
  name: "shared",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setAuth: (state, { payload }) => {
      state.auth = payload;
    },
  },
});

export const { increment, setAuth } = sharedSlice.actions;
export default sharedSlice.reducer;
