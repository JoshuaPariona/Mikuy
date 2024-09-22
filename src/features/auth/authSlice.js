import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
