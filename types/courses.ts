export interface ICourse {
  id: number;
  title: string;
  category: string;
  cover: string;
  createdAt: string;
  description: string;
  documentId: string;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  video: string;
  tutor: ICourseTutor;
  status: "not-started" | "in-progress" | "completed";
  quiz: ICourseQuiz;
}

export interface ICourseTutor {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar: string;
}

export interface ICourseQuiz {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: number | null;
  locale: string | null;
}
