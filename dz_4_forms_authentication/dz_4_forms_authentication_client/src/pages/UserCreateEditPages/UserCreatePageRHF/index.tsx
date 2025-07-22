import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { makeUserPayload } from "@/entities/types/makeUserPayload";
import type { UserCreateForm } from "@/entities/types/types";
import { useDispatch } from "react-redux";
import { addUser } from "@/entities/slices/userSlice";
import type { AppDispatch } from "@/app/store";
import { initialValues } from "@/entities/types/types";
import CustomSelect from "@/shared/ui/CustomSelect";

import AddIcon from "@mui/icons-material/Add";

import global from "@/shared/styles/global.module.css";
import styles from "../UserCreateEditPages.module.css";

export function UserCreateRHFPage() {
  const navigate = useNavigate();
  const [autoFullName, setAutoFullName] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateForm>({ defaultValues: initialValues });
  const name = watch("name");
  const surName = watch("surName");
  const [apiError, setApiError] = useState<string | null>(null);

  // Автозаполнение fullName
  if (autoFullName) {
    const fullName = (name + " " + surName).trim();
    if (fullName !== watch("fullName")) setValue("fullName", fullName);
  }

  const onSubmit = async (data: UserCreateForm) => {
    try {
      const payload = makeUserPayload(data);
      await dispatch(addUser(payload)).unwrap();
      navigate("/");
    } catch (e: any) {
      setApiError(e.message || "Ошибка создания пользователя");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_header}>Создание: React Hook Form</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.error}>{apiError || "\u00A0"}</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={global.label}>Имя</label>
            <input
              className={global.input}
              {...register("name", {
                required: "Введите имя",
                maxLength: { value: 64, message: "Максимум 64 символа" },
              })}
            />
            <div className={styles.error}>
              {errors.name?.message || "\u00A0"}
            </div>
          </div>
          <div className={styles.field}>
            <label className={global.label}>Фамилия</label>
            <input
              className={global.input}
              {...register("surName", {
                required: "Введите фамилию",
                maxLength: { value: 64, message: "Максимум 64 символа" },
              })}
            />
            <div className={styles.error}>
              {errors.surName?.message || "\u00A0"}
            </div>
          </div>
        </div>
        <div className={styles.field}>
          <label className={global.label}>
            Полное имя
            <input
              type="checkbox"
              checked={autoFullName}
              onChange={() => setAutoFullName((v) => !v)}
              title="Автозаполнение"
            />
            <span>авто</span>
          </label>
          <input
            className={global.input}
            value={watch("fullName")}
            onChange={(e) => {
              setAutoFullName(false);
              setValue("fullName", e.target.value);
            }}
          />
          <div className={styles.error}>
            {errors.fullName?.message || "\u00A0"}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={global.label}>Email</label>
            <input
              className={global.input}
              type="email"
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Некорректный email",
                },
              })}
            />
            <div className={styles.error}>
              {errors.email?.message || "\u00A0"}
            </div>
          </div>
          <div className={styles.field}>
            <label className={global.label}>Дата рождения</label>
            <input
              className={global.input}
              type="date"
              {...register("birthDate")}
            />
            <div className={styles.error}>{"\u00A0"}</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={global.label}>Телефон</label>
            <input
              className={global.input}
              {...register("telephone", {
                pattern: {
                  value: /^\+\d{11,15}$/,
                  message: "Некорректный телефон",
                },
              })}
              placeholder="+79991231231"
            />
            <div className={styles.error}>
              {errors.telephone?.message || "\u00A0"}
            </div>
          </div>
          <div className={styles.field}>
            <label className={global.label} htmlFor="employment">
              Должность
            </label>
            <Controller
              name="employment"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomSelect
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  options={[
                    { value: "", label: "Не выбрано" },
                    { value: "developer", label: "Разработчик" },
                    { value: "manager", label: "Менеджер" },
                    { value: "designer", label: "Дизайнер" },
                  ]}
                />
              )}
            />
            <div className={styles.error}>{"\u00A0"}</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={global.label}>Пароль</label>
            <input
              className={global.input}
              type="password"
              {...register("password", { required: "Введите пароль" })}
            />
            <div className={styles.error}>
              {errors.password?.message || "\u00A0"}
            </div>
          </div>
          <div className={styles.field}>
            <label className={global.label}>Подтверждение пароля</label>
            <input
              className={global.input}
              type="password"
              {...register("confirmPassword", {
                required: "Подтвердите пароль",
                validate: (value) =>
                  value === watch("password") || "Пароли не совпадают",
              })}
            />
            <div className={styles.error}>
              {errors.confirmPassword?.message || "\u00A0"}
            </div>
          </div>
        </div>
        <div className={styles.field}>
          <label className={global.label}>
            <input type="checkbox" {...register("userAgreement")} /> Я согласен
            с условиями
          </label>
          {errors.userAgreement && (
            <div className={styles.error}>{errors.userAgreement.message}</div>
          )}
        </div>
        <button
          className={`${global.custom_button} ${styles.this_button}`}
          type="submit"
          disabled={isSubmitting}
        >
          <AddIcon />
          Создать
        </button>
      </form>
    </div>
  );
}
