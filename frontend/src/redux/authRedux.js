import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      
    },

    loginFail: (state) => {
      state.isLoading = false;
      state.error = true;
    },

    logOut: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
      
     
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail,logOut } = authSlice.actions;
export default authSlice.reducer;
