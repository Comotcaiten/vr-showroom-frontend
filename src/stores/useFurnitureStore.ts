import { furnitureService } from "@/services/furniture-service";
import { FurnitureState } from "@/types/store";
import { create } from "zustand";

export const useFurnitureStore = create<FurnitureState>((set, get) => ({
    dataFurniture: [],
    loading: false,

    getFurnitures: async() => {
        try {
            set({ loading: true });
            const res = await furnitureService.getAll();
            set({ dataFurniture: res.data });
        } catch (err) {
            console.log(err);
        } finally {
            set({ loading: false });
        }
    },

    createFurniture: async (name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl) => {
        return true
    },

    updateFurniture: async (id, name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl) => {
      return true  
    },

    removeFurniture: async (id) => {
        return;
    }
}));