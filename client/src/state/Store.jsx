import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "./global/GlobalSlice";

export const Store = configureStore({
  reducer: {
    global: GlobalSlice,
  },
});
