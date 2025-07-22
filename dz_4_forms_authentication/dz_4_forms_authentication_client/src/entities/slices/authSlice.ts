import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "@/entities/api";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return await getMe();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as any,
    loading: true,
    error: null as string | null,
    isAuth: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
