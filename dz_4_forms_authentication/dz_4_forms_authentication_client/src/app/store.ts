import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/slices/userSlice";
import authReducer from "@/entities/slices/authSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
