import axios from "axios";
import Cookies from "js-cookie";
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

    const locale = Cookies.get("NEXT_LOCALE");
    if (locale && locale !== "en") {
      config.params = {
        ...config.params,
        locale,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
