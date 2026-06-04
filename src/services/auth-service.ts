// src/services/auth-service.ts
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { AuthResponse } from "@/types/auth-respons";
import { User } from "@/types/user";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    console.log(`Login frontend`);
    return await apiClient<ApiResponse<AuthResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  },

  register: async (data: { name: string, email: string, password: string, confirmPassword: string }) => {
    console.log(`Register frontend`);
    return await apiClient<ApiResponse<AuthResponse>>("/auth/register", {
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
    return await apiClient<ApiResponse<null>>("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },
};
