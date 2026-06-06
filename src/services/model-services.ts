// src/services/model-services.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";

import { Model } from "@/types/model";

export const modelService = {
  getAll: async (): Promise<ApiResponse<Model[]>> => {
    return await apiClient<ApiResponse<Model[]>>("/models");
  },

  create: async (file: File): Promise<ApiResponse<Model>> => {
    const formData = new FormData();
    formData.append("file", file);
    return await apiClient<ApiResponse<Model>>("/models", {
      method: "POST",
      body: formData,
    })
  },

  remove: async (id: string): Promise<ApiResponse<Model>> => {
    return await apiClient<ApiResponse<Model>>(`/models/destroy/${id}`, {
      method: "DELETE",
    });
  },
};
