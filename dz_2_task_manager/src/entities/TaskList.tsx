import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTasks, fetchTasks } from "@/features/taskSlice";
import type { AppDispatch } from "@/entities/model/store";

import TaskItem from "./TaskItem";
import TaskFilters from "../features/TaskFilters";
import styles from "./TaskList.module.css";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredTasks = useSelector(selectFilteredTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <TaskFilters />
      <div className={styles.container}>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
