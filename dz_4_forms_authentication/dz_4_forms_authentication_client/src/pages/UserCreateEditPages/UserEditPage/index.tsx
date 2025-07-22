import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, useFormikContext, getIn } from "formik";
import { useEffect } from "react";

import { makeUserPayload } from "@/entities/types/makeUserPayload";
import type { UserEditForm } from "@/entities/types/types";
import { editUser, fetchUserById } from "@/entities/slices/userSlice";
import type { RootState, AppDispatch } from "@/app/store";
import CustomSelect from "@/shared/ui/CustomSelect";

import EditIcon from "@mui/icons-material/Edit";

import global from "@/shared/styles/global.module.css";
import styles from "../UserCreateEditPages.module.css";

export function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === id),
  );
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (!user && id) {
      dispatch(fetchUserById(id));
    }
  }, [user, id, dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  const initialValues: UserEditForm = {
    name: user.name || "",
    surName: user.surName || "",
    fullName: user.fullName || "",
    email: user.email || "",
    birthDate: user.birthDate ? user.birthDate.slice(0, 10) : undefined,
    telephone: user.telephone || undefined,
    employment: user.employment || undefined,
    userAgreement: !!user.userAgreement,
  };

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
    if (values.telephone && !/^\+\d{11,15}$/.test(values.telephone))
      errors.telephone = "Некорректный телефон";
    return errors;
  }

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_header}>Редактирование</div>
      <Formik<UserEditForm>
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true);
          setStatus(undefined);
          try {
            const payload = makeUserPayload(values);
            await dispatch(editUser({ id: id!, data: payload })).unwrap();
            navigate("/");
          } catch (e: any) {
            setStatus(e.message || "Ошибка сохранения");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.form}>
            <div className={styles.error}>{status || "\u00A0"}</div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Имя</label>
                <Field className={global.input} name="name" />
                <AlwaysVisibleError name="name" />
              </div>
              <div className={styles.field}>
                <label className={global.label}>Фамилия</label>
                <Field className={global.input} name="surName" />
                <AlwaysVisibleError name="surName" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={global.label}>Полное имя</label>
              <Field className={global.input} name="fullName" />
              <AlwaysVisibleError name="fullName" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={global.label}>Email</label>
                <Field
                  className={global.input}
                  name="email"
                  type="email"
                  disabled
                />
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
              <EditIcon />
              Редактировать
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
