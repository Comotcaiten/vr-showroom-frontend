// src/types/api-response.ts
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}