import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      const { email, firstName, lastName } = action.payload;
      state.user = { email, firstName, lastName };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  selectors: {
    getAuth: (state) => state,
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export const { getAuth } = authSlice.selectors;
export default authSlice.reducer;
