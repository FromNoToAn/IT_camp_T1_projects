import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "@/entities/api";
import type { User, UserCreateForm, UserEditForm } from "../types/types";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    return await getUsers();
  },
);

export const addUser = createAsyncThunk<User, UserCreateForm>(
  "users/addUser",
  async (userData) => {
    return await createUser(userData);
  },
);

export const editUser = createAsyncThunk<
  User,
  { id: string | number; data: UserEditForm }
>("users/editUser", async ({ id, data }) => {
  return await updateUser(id, data);
});

export const removeUser = createAsyncThunk<string | number, string | number>(
  "users/removeUser",
  async (id) => {
    await deleteUser(id);
    return id;
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    const user = await getUserById(id);
    return user;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.users.push(action.payload);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default userSlice.reducer;
