import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task, Category, Status, Priority, Filters, SortBy, SortOrder } from "@/entities/model/tasks";
import {categories, statuses, priorities, defaultFilters} from "@/entities/model/tasks";

// import { tasks as initialTasks } from "@/data/tasks";

interface TaskState {
  tasks: Task[];
  filters: Filters;
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  // tasks: initialTasks,
  filters: defaultFilters,
  loading: false,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const response = await fetch(API_URL);
    return await response.json();
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return await response.json();
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    const idStr = String(task.id);
    const response = await fetch(`${API_URL}/${idStr}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return await response.json();
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number | string) => {
    const idStr = String(id);
    await fetch(`${API_URL}/${idStr}`, {
      method: 'DELETE',
    });
    return idStr;
  }
);

export const selectTasksLoading = (state: { tasks: TaskState }) => state.tasks.loading;

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Устаревшие методы для локалки
    updateTaskLocal(state, action: PayloadAction<Task>) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    },
    createTaskLocal(state, action: PayloadAction<Omit<Task, "id">>) {
      const newId =
        state.tasks.length > 0
          ? Math.max(...state.tasks.map((t) => t.id)) + 1
          : 1;
      state.tasks.push({
        id: newId,
        ...action.payload,
      });
    },
    deleteTaskLocal(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.map(task => ({
          ...task,
          id: Number(task.id),
        }));
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push({ ...action.payload, id: Number(action.payload.id) });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = { ...action.payload, id: Number(action.payload.id) };
        state.tasks = state.tasks.map(t => (t.id === updated.id ? updated : t));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== Number(action.payload));
      });
  }
});

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export const selectFilters = (state: { tasks: TaskState }) => state.tasks.filters;

const priorityOrder = (priority: Priority) => priorities.indexOf(priority);
const statusOrder = (status: Status) => statuses.indexOf(status);
const categoryOrder = (category: Category) => categories.indexOf(category);

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    let filtered = tasks.filter((task) => {
      if (filters.category !== "All" && task.category !== filters.category)
        return false;
      if (filters.status !== "All" && task.status !== filters.status)
        return false;
      if (filters.priority !== "All" && task.priority !== filters.priority)
        return false;
      if (filters.createdAt && task.createdAt < filters.createdAt)
        return false;

      return true;
    });

    if (filters.sortBy)
    {
      const sortBy = filters.sortBy as SortBy;
      const sortOrder = filters.sortOrder as SortOrder;

      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "createdAt")
        {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          comparison = dateA.getTime() - dateB.getTime();
        }
        else if (sortBy === "priority") {
          comparison = priorityOrder(a.priority) - priorityOrder(b.priority);
        }
        else if (sortBy === "status") {
          comparison = statusOrder(a.status) - statusOrder(b.status);
        }
        else if (sortBy === "category") {
          comparison = categoryOrder(a.category) - categoryOrder(b.category);
        }
        else
        {
          // fallback string comparison (e.g., title)
          comparison = a[sortBy].localeCompare(b[sortBy]);
        }

        return sortOrder === "asc" ? comparison : -comparison;  
      });
    }

    return filtered;
  }
);

export const { updateTaskLocal, createTaskLocal, deleteTaskLocal, setFilters } = taskSlice.actions;
export default taskSlice.reducer;
