import axios from "@/lib/axios";
import { IQuiz, ISubmitQuizPayload } from "../types/quiz";

export const getQuizById = (id: string) => {
  return axios.get<{ data: IQuiz }>(`/quizzes/${id}`, {
    params: {
      populate: {
        questions: {
          populate: "options",
        },
      },
    },
  });
};

export const submitQuiz = (payload: ISubmitQuizPayload) => {
  return axios.post<{ data: IQuiz }>(`/quizzes/submit-quiz`, payload);
};
