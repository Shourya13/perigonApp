import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
  },
  reducers: {
    getUsersFetch: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    getUsersFailure: (state) => {
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsersFetch, getUsersSuccess, getUsersFailure, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
