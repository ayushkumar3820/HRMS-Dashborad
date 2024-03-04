import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};
export const GlobalSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setMode } = GlobalSlice.actions;
export default GlobalSlice.reducer;
