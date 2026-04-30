import brandValidation from "@/validations/brand_validations";
import z from "zod";

// src/types/brand.ts
export interface Brand {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
  _delete: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateBrandDto = z.infer<typeof brandValidation.create>;
