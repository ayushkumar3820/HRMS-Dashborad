import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  collapsed: false,
  toggled: false,
};
export const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setToggled: (state) => {
      state.toggled = !state.toggled;
    },
  },
});

export const { setMode, setCollapsed, setToggled } = GlobalSlice.actions;
export default GlobalSlice.reducer;
