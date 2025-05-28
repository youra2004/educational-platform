export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface ILoginResponse {
  jwt: string;
  user: {
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
  };
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}
