import { type Action, combineReducers, configureStore, type Reducer } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import counterReducer from "./shared/sharedSlice";

const appReducer = combineReducers({
  shared: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer<RootState, Action, Partial<RootState>> = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
