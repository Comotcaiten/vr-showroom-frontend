import { furnitureService } from "@/services/furniture-service";
import { FurnitureState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFurnitureStore = create<FurnitureState>((set, get) => ({
    dataFurniture: [],
    loading: false,

    getFurnitures: async () => {
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
    
    getFurnitureById: async (id) => { 
        try {
            set({ loading: true });

            let danhSach = get().dataFurniture;

            // Nếu chưa có data thì fetch
            if (danhSach.length === 0) {
                await get().getFurnitures();
                danhSach = get().dataFurniture; // lấy lại sau khi fetch
            }

            // Tìm theo id
            const data = danhSach.find((item) => item._id === id);

            // Nếu không có trong store thì call API riêng (optional)
            if (!data) {
                const res = await furnitureService.getById(id);
                return res.data;
            }

            return data;
        } catch (err) {
            console.log(err);
            throw new Error("Furniture not found");
        } finally {
            set({ loading: false });
        }
    },

    createFurniture: async (name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl) => {
        try {
            set({ loading: true });
            const res = await furnitureService.create({ name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl });
            await get().getFurnitures();
            toast.success(res.message);

            return true;
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
            return false;
        } finally {
            set({ loading: false });
        }
    },

    updateFurniture: async (id, name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl) => {
        try {
            set({ loading: true });
            const res = await furnitureService.update({ id, name, description, categoryId, brandId, price, quantity, modelId, thumbnailUrl });
            await get().getFurnitures();
            toast.success(res.message);

            return true;
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeFurniture: async (id) => {
        try {
            set({ loading: true });
            const res = await furnitureService.remove(id);
            await get().getFurnitures();
            toast.success(res.message);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            set({ loading: false });
        }
    }
}));