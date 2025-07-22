import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/PersonAdd";
import TableIcon from "@mui/icons-material/TableChart";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
              end
            >
              <TableIcon className={styles.icon} />
              <span className={styles.sidebar_text_wrapper}>Пользователи</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/create/formik"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <AddIcon className={styles.icon} />
              <span className={styles.sidebar_text_wrapper}>
                Создать Formik
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/create/react-hook-form"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <AddIcon className={styles.icon} />
              <span className={styles.sidebar_text_wrapper}>Создать RHF</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
