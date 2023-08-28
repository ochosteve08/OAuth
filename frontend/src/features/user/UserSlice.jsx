import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  success: false,
  errMsg: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    signInFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    updateUserFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    deleteUserFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
       signOut: () => initialState,
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} = userSlice.actions;

export const showLoading = (state) => state.user.loading;
export const showError = (state) => state.user.error;
export const showErrorMessage = (state) => state.user.errMsg;
export const showSuccess = (state) => state.user.success;
export const userDetails = (state) => state.user.currentUser;

export default userSlice.reducer;
