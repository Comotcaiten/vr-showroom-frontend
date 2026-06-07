// src/types/model.ts
export interface Model {
  _id: string;
  fileUrl: string;
  fileFormat: string;
  fileSize?: number;
  _delete: boolean;
  createdAt: Date;
  updatedAt: Date;
}