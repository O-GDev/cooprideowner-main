export interface userType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  phone: string;
  company: string;
}

export interface signUpPayloadType {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  phone: string;
  company: string;
  password: string;
  privacyPolicy: boolean;
}

export interface signUpResponseType {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  phone: string;
  company: string;
  password: string;
  privacyPolicy: boolean;
}
