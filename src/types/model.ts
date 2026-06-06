import modelValidation from "@/validations/model_validation";
import z from "zod";

// src/types/model.ts
export interface Model {
  _id: string;
  fileUrl: string;
  fileFormat: string;
  fileSize?: number;
  _delete: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateModelDto = z.infer<typeof modelValidation.create>;