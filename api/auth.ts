import axios from "@/lib/axios";
import { ILoginPayload, ILoginResponse, IRegisterPayload } from "@/types/auth";
import { setItem } from "../helpers/localstorage";

export const signIn = async (payload: ILoginPayload) => {
  const { data } = await axios.post<ILoginResponse>("/auth/local", payload);

  setItem("user-token", data.jwt);

  return data.user;
};

export const signUp = async (payload: IRegisterPayload) => {
  const { data } = await axios.post<ILoginResponse>(
    "/auth/local/register",
    payload,
  );

  setItem("user-token", data.jwt);

  return data.user;
};
