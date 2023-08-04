import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  username: "",
  password: "",
  accessToken: "",
  error: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice;
