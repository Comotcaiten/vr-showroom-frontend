// src/services/category-services.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";

import { Category, CreateCategoryDto } from "@/types/category";

export const categoryService = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return await apiClient<ApiResponse<Category[]>>("/categories");
  },

  create: async (data: CreateCategoryDto): Promise<ApiResponse<Category>> => {
    return await apiClient<ApiResponse<Category>>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (
    id: string,
    data: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> => {
    return await apiClient<ApiResponse<Category>>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove: async (id: string): Promise<ApiResponse<Category>> => {
    return await apiClient<ApiResponse<Category>>(`/categories/destroy/${id}`, {
      method: "DELETE",
    });
  },
};