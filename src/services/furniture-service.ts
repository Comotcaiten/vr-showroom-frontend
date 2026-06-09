import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Furniture } from "@/types/furniture";

const path = "/furnitures";
export const furnitureService = {
    getAll: async (): Promise<ApiResponse<Furniture[]>> => {
        const res = await apiClient<ApiResponse<Furniture[]>>(path);
        return res;
    },

    getById: async (id: string): Promise<ApiResponse<Furniture>> => {
        const res = await apiClient<ApiResponse<Furniture>>(`${path}/${id}`);

        return res;
    },

    create: async (data: {
        name: string,
        description: string,
        categoryId: string,
        brandId: string,
        price: Number,
        quantity: Number,
        modelId: string,
        thumbnailUrl: string
    }): Promise<ApiResponse<Furniture>> => {
        const res = await apiClient<ApiResponse<Furniture>>(path, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return res;
    },

    update: async (data: {
        id: string, name: string,
        description: string,
        categoryId: string,
        brandId: string,
        price: Number,
        quantity: Number,
        modelId: string,
        thumbnailUrl: string
    }): Promise<ApiResponse<Furniture>> => {
        const res = await apiClient<ApiResponse<Furniture>>(`${path}/${data.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
        return res;
    },

    remove: async (id: string): Promise<ApiResponse<void>> => {
        return await apiClient<ApiResponse<void>>(`${path}/destroy/${id}`, {
            method: "DELETE",
        });
    },
}