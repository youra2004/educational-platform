import axios from "@/lib/axios";
import { IStudyNote } from "@/types/study-notes";

export const getStudyNotes = () => {
  return axios.get<{ data: IStudyNote[] }>("/notes", {
    params: { populate: "*" },
  });
};

export const getStudyNoteById = (id: string) => {
  return axios.get<{ data: IStudyNote }>(`/notes/${id}`, {
    params: { populate: "*" },
  });
};
