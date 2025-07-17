import TaskDetails from "@features/TaskDetails";
import { useParams } from "react-router-dom";
import styles from "@pages/page.module.css";

export default function TaskPage() {

  const { id } = useParams();
  const isNew = id === "new";

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{isNew ? "Создание задачи" : "Редактирование задачи"}</h1>
      <TaskDetails id={id ?? "new"}/>
    </div>
  );
}