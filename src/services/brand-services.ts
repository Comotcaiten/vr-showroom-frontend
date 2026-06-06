// src/services/brand-services.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";

import { Brand } from "@/types/brand";

export const brandService = {
  getAll: async (): Promise<ApiResponse<Brand[]>> => {
    return await apiClient<ApiResponse<Brand[]>>("/brands");
  },

  create: async (data: {name: string, description: string, logoUrl: string}): Promise<ApiResponse<Brand>> => {
    return await apiClient<ApiResponse<Brand>>("/brands", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async ( data: {id: string, name: string, description: string, logoUrl: string}
  ): Promise<ApiResponse<Brand>> => {
    return await apiClient<ApiResponse<Brand>>(`/brands/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove: async (id: string): Promise<ApiResponse<Brand>> => {
    return await apiClient<ApiResponse<Brand>>(`/brands/destroy/${id}`, {
      method: "DELETE",
    });
  },
};
