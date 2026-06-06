import categoryValidation from "@/validations/category_validations";
import z from "zod";

// src/types/category.ts
export interface Category {
  _id: string;
  name: string;
  description: string;
  categoryUrl: string;
  _delete: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateCategoryDto = z.infer<typeof categoryValidation.create>;
