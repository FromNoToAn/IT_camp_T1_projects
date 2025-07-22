import { useForm } from "react-hook-form";
import { login } from "@/entities/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/entities/slices/authSlice";
import type { AppDispatch } from "@/app/store";

import global from "@/shared/styles/global.module.css";
import styles from "./LoginPage.module.css";
import LoginIcon from "@mui/icons-material/Login";

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);

    try {
      await login(data.email, data.password);
      await dispatch(checkAuth());
      const from = (location.state as any)?.from || "/";
      navigate(from, { replace: true });
    } catch (e: any) {
      const msg = e?.message || "Ошибка входа";
      setApiError(msg);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header_form}>Вход в систему</div>
        <div className={styles.form_container}>
          <div className={styles.error}>{apiError || "\u00A0"}</div>

          <div className={styles.field}>
            <label className={global.label}>Email</label>
            <input
              className={global.input}
              type="email"
              {...register("email", { required: "Введите email" })}
              autoComplete="username"
            />
            <span className={styles.error}>
              {errors.email?.message || "\u00A0"}
            </span>
          </div>

          <div className={styles.field}>
            <label className={global.label}>Пароль</label>
            <input
              className={global.input}
              type="password"
              {...register("password", { required: "Введите пароль" })}
              autoComplete="current-password"
            />
            <span className={styles.error}>
              {errors.password?.message || "\u00A0"}
            </span>
          </div>

          <button
            className={`${global.custom_button} ${styles.this_button}`}
            type="submit"
            disabled={isSubmitting}
          >
            <LoginIcon />
            Вход
          </button>
        </div>
      </form>
    </div>
  );
}
