export interface User {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string | null;
  telephone?: string | null;
  employment?: string;
  userAgreement?: boolean;
}

export interface UserCreateForm {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement: boolean;
}

export interface UserEditForm {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement: boolean;
}

export const initialValues: UserCreateForm = {
  name: "",
  surName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  telephone: "",
  employment: "",
  userAgreement: false,
};
