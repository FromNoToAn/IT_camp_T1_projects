import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import type { Task } from "@/entities/model/tasks";

import { useDispatch } from "react-redux";
import type { AppDispatch } from '@/entities/model/store';
import { deleteTask } from "@features/taskSlice";

import styles from "./TaskItem.module.css";
import global from "@app/App.module.css";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate();
  
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (confirm(`Вы уверены, что хотите удалить задачу:\n"${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };

  // Форматируем дату в читаемый вид, например: 15 июля 2025
  const formattedDate = new Date(task.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.createdAt}>Дата создания: {formattedDate}</div>
      <div className={styles.title}>{task.title}</div>
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}
      <div className={styles.chipRow}>
        <span className={styles.chip}>{task.category}</span>
        <span className={`${styles.chip} ${styles.status}`}>{task.status}</span>
        <span className={`${styles.chip} ${styles.priority}`}>
          {task.priority}
        </span>
        <button
          className={`${global.custom_button} ${styles.this_button}`}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <EditIcon fontSize="small" /> Изменить
        </button>
        <div className={styles.last_button_container}>
          <button
            type="button"
            className={`${global.custom_button} ${styles.this_button} ${global.dark_button}`}
            onClick={handleDelete}
            aria-label="Удалить задачу"
          >
            <DeleteIcon fontSize="small" /> Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
