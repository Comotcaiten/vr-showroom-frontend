// src/services/auth-service.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/user";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    return await apiClient<ApiResponse<User>>("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include", // 🔥 cực quan trọng
    });
  },

  register: async (data: { email: string; password: string }) => {
    return await apiClient<ApiResponse<User>>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  },

  me: async () => {
    return await apiClient<ApiResponse<User>>("/users/me", {
      credentials: "include",
    });
  },

  logout: async () => {
    return await apiClient<ApiResponse<null>>("/users/logout", {
      method: "POST",
      credentials: "include",
    });
  },
};