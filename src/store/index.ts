import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "./slices/userSessionSlice";
import { apiSlice } from "./api/apiSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";

export const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
