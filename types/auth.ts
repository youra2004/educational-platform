import { IUser } from "./user";

export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface ILoginResponse {
  jwt: string;
  user: IUser;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}
