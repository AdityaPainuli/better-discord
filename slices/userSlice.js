import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
  },
});

export const { login, logout } = user.actions;

export const userState = (state) => state.user.user;

export default user.reducer;
