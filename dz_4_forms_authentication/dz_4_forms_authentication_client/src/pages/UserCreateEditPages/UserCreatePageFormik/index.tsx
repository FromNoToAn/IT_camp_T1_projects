import { Formik, Form, Field, useFormikContext, getIn } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

function validate(values: typeof initialValues) {
  const errors: any = {};
  if (!values.name) errors.name = "Введите имя";
  else if (values.name.length > 64) errors.name = "Максимум 64 символа";
  if (!values.surName) errors.surName = "Введите фамилию";
  else if (values.surName.length > 64) errors.surName = "Максимум 64 символа";
  if (!values.fullName) errors.fullName = "Введите полное имя";
  else if (values.fullName.length > 130)
    errors.fullName = "Максимум 130 символов";
  if (!values.email) errors.email = "Введите email";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))
    errors.email = "Некорректный email";
  if (!values.password) errors.password = "Введите пароль";
  if (!values.confirmPassword) errors.confirmPassword = "Подтвердите пароль";
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  )
    errors.confirmPassword = "Пароли не совпадают";
  if (values.telephone && !/^\+\d{11,15}$/.test(values.telephone))
    errors.telephone = "Некорректный телефон";
  return errors;
}

export function UserCreateFormikPage() {
  function AlwaysVisibleError({ name }: { name?: string }) {
    const formik = useFormikContext<any>();
    if (!name)
      return (
        <div className={styles.error} style={{ visibility: "hidden" }}>
          {"\u00A0"}
        </div>
      );

    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);

    return (
      <div
        className={styles.error}
        style={{ visibility: touched && error ? "visible" : "hidden" }}
      >
        {touched && typeof error === "string" ? error : "\u00A0"}
      </div>
    );
  }

  function AutoFullNameEffect({
    autoFullName,
    setFieldValue,
    name,
    surName,
  }: {
    autoFullName: boolean;
    setFieldValue: (field: string, value: any) => void;
    name: string;
    surName: string;
  }) {
    useEffect(() => {
      if (autoFullName) {
        setFieldValue("fullName", name + " " + surName);
      }
    }, [autoFullName, name, surName, setFieldValue]);

    return null;
  }

  const navigate = useNavigate();
  const [autoFullName, setAutoFullName] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_header}>Создание: Formick</div>
      <Formik<UserCreateForm>
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = validate(values);
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true);
          setStatus(undefined);
          try {
            const payload = makeUserPayload(values);
            await dispatch(addUser(payload)).unwrap();
            setSubmitting(false);
            setStatus(undefined);
            navigate("/");
          } catch (e: any) {
            setStatus(e.message || "Ошибка создания пользователя");
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, status }) => (
          <Form className={styles.form}>
            <AutoFullNameEffect
              autoFullName={autoFullName}
              setFieldValue={setFieldValue}
              name={values.name}
              surName={values.surName}
            />
            <div className={styles.error}>{status || "\u00A0"}</div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Имя</label>
                <Field
                  className={global.input}
                  name="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("name", e.target.value);
                    if (autoFullName)
                      setFieldValue(
                        "fullName",
                        e.target.value + " " + values.surName,
                      );
                  }}
                />
                <AlwaysVisibleError name="name" />
              </div>
              <div className={styles.field}>
                <label className={global.label}>Фамилия</label>
                <Field
                  className={global.input}
                  name="surName"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("surName", e.target.value);
                    if (autoFullName)
                      setFieldValue(
                        "fullName",
                        values.name + " " + e.target.value,
                      );
                  }}
                />
                <AlwaysVisibleError name="surName" />
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
              <Field name="fullName">
                {({ field }: any) => (
                  <input
                    {...field}
                    className={global.input}
                    onChange={(e) => {
                      setAutoFullName(false);
                      field.onChange(e);
                    }}
                  />
                )}
              </Field>
              <AlwaysVisibleError name="fullName" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Email</label>
                <Field className={global.input} name="email" type="email" />
                <AlwaysVisibleError name="email" />
              </div>
              <div className={styles.field}>
                <label className={global.label}>Дата рождения</label>
                <Field className={global.input} name="birthDate" type="date" />
                <AlwaysVisibleError />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Телефон</label>
                <Field
                  className={global.input}
                  name="telephone"
                  placeholder="+79991231231"
                />
                <AlwaysVisibleError name="telephone" />
              </div>
              <div className={styles.field}>
                <label className={global.label} htmlFor="employment">
                  Должность
                </label>
                <Field name="employment">
                  {({ field, form }: any) => (
                    <CustomSelect
                      value={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                      options={[
                        { value: "", label: "Не выбрано" },
                        { value: "developer", label: "Разработчик" },
                        { value: "manager", label: "Менеджер" },
                        { value: "designer", label: "Дизайнер" },
                      ]}
                    />
                  )}
                </Field>
                <AlwaysVisibleError />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Пароль</label>
                <Field
                  className={global.input}
                  name="password"
                  type="password"
                />
                <AlwaysVisibleError name="password" />
              </div>
              <div className={styles.field}>
                <label className={global.label}>Подтверждение пароля</label>
                <Field
                  className={global.input}
                  name="confirmPassword"
                  type="password"
                />
                <AlwaysVisibleError name="confirmPassword" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={global.label}>
                <Field type="checkbox" name="userAgreement" /> Я согласен с
                условиями
              </label>
            </div>
            <button
              className={`${global.custom_button} ${styles.this_button}`}
              type="submit"
              disabled={isSubmitting}
            >
              <AddIcon />
              Создать
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserCreateFormikPage;
