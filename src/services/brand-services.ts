// src/services/brand-services.ts
import { apiClient } from "@/lib/api-client";
import { Brand, CreateBrandDto } from "@/types/brand";
import { ApiResponse } from "@/types/api-response";

export const brandService = {
  getAll: async (): Promise<ApiResponse<Brand[]>> => {
    return await apiClient<ApiResponse<Brand[]>>("/brands");
  },

  create: async (data: CreateBrandDto): Promise<ApiResponse<Brand>> => {
    return await apiClient<ApiResponse<Brand>>("/brands", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (
    id: string,
    data: CreateBrandDto,
  ): Promise<ApiResponse<Brand>> => {
    return await apiClient<ApiResponse<Brand>>(`/brands/${id}`, {
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
