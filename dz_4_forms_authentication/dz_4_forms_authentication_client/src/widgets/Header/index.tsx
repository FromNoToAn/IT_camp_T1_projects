import { logout } from "@/entities/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";

import global from "@/shared/styles/global.module.css";
import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setError(null);
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (e: any) {
      setError(e.message || "Ошибка выхода");
    }
    setLoading(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>Менеджер пользователей</div>
      <div className={styles.title_items}>
        {error && <span className={styles.error}>{error}</span>}
        <button
          className={`${global.custom_button} ${global.rainbow_button}`}
          onClick={handleLogout}
          title="Выйти"
          disabled={loading}
        >
          <LogoutIcon />
          Выход
        </button>
      </div>
    </header>
  );
}
