import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { authorize, logout } = authSlice.actions;
