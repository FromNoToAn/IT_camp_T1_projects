import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TaskList from "../entities/TaskList";

import global from "@app/App.module.css";
import styles from "@pages/page.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Менеджер задач</h1>
        <button
          className={`${global.custom_button} ${global.rainbow_button}`}
          onClick={() => navigate("/task/new")}
        >
          <AddIcon fontSize="small" /> Создать задачу
        </button>
      </header>
      <TaskList />
    </div>
  );
}
