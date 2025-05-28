import axios from "@/lib/axios";
import { ICourse } from "../types/courses";

export const getCourseList = (searchValue?: string) => {
  return axios.get<{ data: ICourse[] }>("/courses?populate=*", {
    params: { filters: { title: { $containsi: searchValue } } },
  });
};

export const getCourseById = (id: string) => {
  return axios.get<{ data: ICourse }>(`/courses/${id}`);
};

export const startCourse = (id: string) => {
  return axios.post<{ data: ICourse }>(`/courses/${id}/start`);
};
