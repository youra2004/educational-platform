import { IUser } from "@/types/user";
import axios from "@/lib/axios";

export const getMe = () => {
  return axios.get<IUser>("/users/me");
};
