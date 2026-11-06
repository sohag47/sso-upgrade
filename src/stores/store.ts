import storage from "@/lib/storage";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import apiSlice from "./apiSlice";
import counterReducer from "./shared/sharedSlice";
// export const store = configureStore({
//   reducer: {
//     // counter: counterReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const appReducer = combineReducers({
  shared: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action,
) => {
  if (action.type === "USER_LOGOUT") {
    // 1. Remove persisted state from storage engine
    storage.removeItem("persist:root");

    // 2. Clear RTK Query API cache completely
    apiSlice.util.resetApiState();

    // 3. Reset state of all reducers to initial default values
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shared"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
