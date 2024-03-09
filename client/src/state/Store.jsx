import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "./global/GlobalSlice";
import { adminApi } from "./api/adminApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const Store = configureStore({
  reducer: {
    global: GlobalSlice,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

setupListeners(Store.dispatch);
