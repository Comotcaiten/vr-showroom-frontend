// src/services/category-services.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";

import { Category} from "@/types/category";

export const categoryService = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return await apiClient<ApiResponse<Category[]>>("/categories");
  },

  create: async (data: {name: string, description: string, categoryUrl: string}): Promise<ApiResponse<Category>> => {
    return await apiClient<ApiResponse<Category>>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (data: {id: string, name: string, description: string, categoryUrl: string}): Promise<ApiResponse<Category>> => {
    return await apiClient<ApiResponse<Category>>(`/categories/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove: async (id: string): Promise<ApiResponse<void>> => {
    return await apiClient<ApiResponse<void>>(`/categories/destroy/${id}`, {
      method: "DELETE",
    });
  },
};