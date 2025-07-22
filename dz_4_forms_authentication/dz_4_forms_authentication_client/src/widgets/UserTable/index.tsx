import styles from "./UserTable.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, removeUser } from "@/entities/slices/userSlice";
import type { RootState, AppDispatch } from "@/app/store";

import global from "@/shared/styles/global.module.css";

const ADMIN_EMAIL = "admin@inno.tech";

export function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      if (
        error.includes("Не авторизован") ||
        error.includes("Failed to fetch") ||
        error.includes("NetworkError") ||
        error.includes("Ошибка загрузки пользователей")
      ) {
        navigate("/login", { state: { serverError: error } });
      }
    }
  }, [error, navigate]);

  const handleDelete = async (user: any) => {
    if (user.email === ADMIN_EMAIL) {
      alert("Удаление администратора запрещено");
      return;
    }

    if (!window.confirm(`Вы точно хотите удалить ${user.fullName}?`)) {
      return;
    }

    await dispatch(removeUser(user.id));
  };

  if (loading) return <div>Загрузка пользователей...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Действия</th>
            <th>ID</th>
            <th>Email</th>
            <th>Полное имя</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>
                {user.email !== ADMIN_EMAIL && (
                  <div className={styles.td_items}>
                    <Link
                      to={`/user/edit/${user.id}`}
                      className={global.custom_button}
                      title="Редактировать"
                    >
                      <EditIcon fontSize="small" />
                    </Link>
                    <button
                      className={`${global.custom_button} ${global.dark_button}`}
                      title="Удалить"
                      onClick={() => handleDelete(user)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                )}
              </td>
              <td>
                <span
                  className={styles.copyableCell}
                  title="Кликните, чтобы скопировать"
                  onClick={() => {
                    navigator.clipboard.writeText(String(user.id));
                    alert("Скопировано: " + user.id);
                  }}
                >
                  {user.id}
                </span>
              </td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
