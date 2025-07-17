import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Task } from "@/entities/model/tasks";
import { categories, statuses, priorities} from "@/entities/model/tasks";
import { useSelector, useDispatch } from "react-redux";
// import { selectTasks, createTaskLocal, updateTaskLocal } from "@features/taskSlice";

import { selectTasks, createTask, updateTask, selectTasksLoading } from "@features/taskSlice";
import type { AppDispatch } from '@/entities/model/store';

import styles from "./TaskDetails.module.css";
import global from "@app/App.module.css";
import CustomSelect from "@/shared/CustomSelect";
import LoadingMessage from "@/shared/LoadingMessage";

interface TaskDetailsProps {
  id: string;
}

export default function TaskDetails({ id }: TaskDetailsProps)
{
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectTasksLoading);

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
  if (!isNew && loading){
    return (
      <div className={`${styles.container} ${styles.loader_container}`}>
        <div className={styles.lit_container}>
          <LoadingMessage />
        </div>
      </div>
    );
  }


  if (!isNew && !task) {
    return (
      <div className={styles.container}>
        <div className={styles.lit_container}>Задача не найдена</div>
      </div>
    );
  }

  const handleSave = () => {
    if (isNew)
    {
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
    } 
    else
    {
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
        <CustomSelect
          options={categories.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={(v) => setCategory(v as Task["category"])}
          className={global.select}
        />
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Статус</label>
        <CustomSelect
          options={statuses.map((s) => ({ value: s, label: s }))}
          value={status}
          onChange={(v) => setStatus(v as Task["status"])}
          className={global.select}
        />
      </div>
      <div className={styles.lit_container}>
        <label className={global.label}>Приоритет</label>
        <CustomSelect
          options={priorities.map((p) => ({ value: p, label: p }))}
          value={priority}
          onChange={(v) => setPriority(v as Task["priority"])}
          className={global.select}
        />
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
