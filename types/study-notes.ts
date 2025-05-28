import { ICourseTutor } from "./courses";

export interface IStudyNote {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  cover: string;
  tutor: ICourseTutor;
}
