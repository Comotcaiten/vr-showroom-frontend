// src/services/brand-services.ts
import { apiClient } from "@/lib/api-client";
import { Brand } from "@/types/brand";
import { ApiResponse } from "@/lib/api-response";

export const brandService = {
  getAll: async (): Promise<ApiResponse<Brand[]>> => {
    return await apiClient<ApiResponse<Brand[]>>("/brands");
  },
};