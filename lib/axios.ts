// lib/axios.ts
import axios from "axios";
import { getItem } from "../helpers/localstorage";

const instance = axios.create({
  baseURL: "http://localhost:1337/api",
});

instance.interceptors.request.use(
  (config) => {
    const jwtToken = getItem("user-token");
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
