export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
