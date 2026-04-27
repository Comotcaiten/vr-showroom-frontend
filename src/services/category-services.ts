// src/services/category-services.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/category";

export const categoryService = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return await apiClient<ApiResponse<Category[]>>("/categories");
  },
};