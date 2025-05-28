import axios from "@/lib/axios";
import { ILeaders } from "@/types/leaders";

export const getLeaders = () => {
  return axios.get<ILeaders[]>("/quiz-leaderboard", {
    params: { limit: 10 },
  });
};
