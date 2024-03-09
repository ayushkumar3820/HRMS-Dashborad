import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
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
