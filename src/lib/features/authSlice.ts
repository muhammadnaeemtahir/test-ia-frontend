import { createSlice } from "@reduxjs/toolkit";
import { authSliceTypes } from "@/utils/types";

const initialState: authSliceTypes = {
  user: {
    id: null,
    role: null,
    name: null,
  },
  token: null,
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
