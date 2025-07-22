import type { UserCreateForm, UserEditForm } from "./types/types";

export function makeUserPayload(values: UserCreateForm | UserEditForm) {
  const payload: any = {
    name: values.name,
    surName: values.surName,
    fullName: values.fullName,
    userAgreement: Boolean(values.userAgreement),
  };
  // email и password только для создания
  if ("password" in values) {
    payload.email = values.email;
    payload.password = (values as UserCreateForm).password;
  }
  if (values.birthDate) {
    payload.birthDate = new Date(values.birthDate).toISOString();
  }
  if (values.telephone) {
    payload.telephone = values.telephone;
  }
  payload.employment = values.employment ? values.employment : "";
  return payload;
}
