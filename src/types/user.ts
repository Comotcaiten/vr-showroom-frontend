// src/types/user.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updateAt?: string;
}