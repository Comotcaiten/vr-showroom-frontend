import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/user";

export const UserService = {
  me: async () => {
    return await apiClient<ApiResponse<User>>("/users/me", {
      credentials: "include",
    });
  },

}