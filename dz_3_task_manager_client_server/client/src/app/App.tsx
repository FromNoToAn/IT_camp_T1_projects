import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider, useDispatch } from "react-redux";
import { fetchTasks } from "@/features/taskSlice";
import type { AppDispatch } from "@/entities/model/store";
import { store } from "@entities/model/store";

import Home from "@pages/Home";
import TaskPage from "@pages/TaskPage";

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}