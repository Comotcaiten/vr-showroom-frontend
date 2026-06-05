// src/services/auth-service.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { AuthResponse } from "@/types/auth-respons";

export const authService = {
  register: async (data: { name: string, email: string, password: string, confirmPassword: string }) => {
    console.log(`Register frontend`);
    return await apiClient<ApiResponse<AuthResponse>>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  },

  login: async (data: { email: string; password: string }) => {
    console.log(`Login frontend`);
    return await apiClient<ApiResponse<AuthResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  },

  logout: async () => {
    return await apiClient<ApiResponse<null>>("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },
};
