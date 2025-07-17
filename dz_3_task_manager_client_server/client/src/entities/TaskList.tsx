import { useSelector } from "react-redux";
import { selectFilteredTasks, selectTasksLoading } from "@/features/taskSlice";

import TaskItem from "./TaskItem";
import TaskFilters from "../features/TaskFilters";
import styles from "./TaskList.module.css";

import LoadingMessage from "@/shared/LoadingMessage";

export default function TaskList() {

  const filteredTasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectTasksLoading);

  return (
    <>
      <TaskFilters />
      <div className={styles.container}>
        {loading ? (
          <LoadingMessage />
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </>
  );
}
