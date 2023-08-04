import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPass: "",
  error: "",
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPass(state, action) {
      state.confirmPass = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const registerActions = RegisterSlice.actions;

export default RegisterSlice;
