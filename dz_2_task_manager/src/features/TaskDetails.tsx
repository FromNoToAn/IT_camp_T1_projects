import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Task } from "@/entities/model/tasks";
import { categories, statuses, priorities} from "@/entities/model/tasks";
import { useSelector, useDispatch } from "react-redux";
// import { selectTasks, createTaskLocal, updateTaskLocal } from "@features/taskSlice";

import { selectTasks, createTask, updateTask } from "@features/taskSlice";
import type { AppDispatch } from '@/entities/model/store';

import styles from "./TaskDetails.module.css";
import global from "@app/App.module.css";

interface TaskDetailsProps {
  id: string;
}

export default function TaskDetails({ id }: TaskDetailsProps)
{
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);

  const isNew = id === "new";
  const task = isNew ? undefined : tasks.find((t) => t.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Task["category"]>("Bug");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [priority, setPriority] = useState<Task["priority"]>("Low");

  useEffect(() => {
    if (!isNew && task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setCategory(task.category);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [isNew, task]);

  // console.log(isNew);
  if (!isNew && !task) {
    return (
      <div className={styles.container}>
        <div className={styles.lit_container}>Задача не найдена</div>
      </div>
    );
  }

  const handleSave = () => {
    if (isNew) {
      dispatch(
        createTask({
          title,
          description,
          category,
          status,
          priority,
          createdAt: new Date().toISOString(),
        }),
      );
    } else {
      dispatch(
        updateTask({
          ...task!,
          title,
          description,
          category,
          status,
          priority,
        }),
      );
    }
    navigate("/");
  };

  return (
    <form className={styles.container}   onSubmit={(e) => {e.preventDefault(); handleSave();}}>
      <div className={styles.lit_container}>
        <label className={global.label}>Заголовок</label>
        <input
          className={global.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Описание</label>
        <textarea
          className={global.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Категория</label>
        <select
          className={global.select}
          value={category}
          onChange={(e) => setCategory(e.target.value as Task["category"])}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Статус</label>
        <select
          className={global.select}
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Приоритет</label>
        <select
          className={global.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonRow}>
        <button
          type="submit"
          className={`${global.custom_button} ${global.rainbow_button}`}
        >
          <SaveIcon fontSize="small" /> Сохранить
        </button>
        <button
          type="button"
          className={`${global.custom_button} ${global.dark_button}`}
          onClick={() => navigate("/")}
        >
          <CancelIcon fontSize="small" /> Отмена
        </button>
      </div>
    </form>
  );
}
