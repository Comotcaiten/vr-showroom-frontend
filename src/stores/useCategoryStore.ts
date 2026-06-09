import { categoryService } from "@/services/category-services";
import { CategoryState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useCategoryStore = create<CategoryState>((set, get) => ({
    dataCategory: [],
    loading: false,

    getCategorys: async () => {
        try {
            set({ loading: true });
            const res = await categoryService.getAll();
            set({ dataCategory: res.data });
        } catch (err) {
            console.log(err);
        } finally {
            set({ loading: false });
        }
    },

    createCategory: async (name, description, categoryUrl) => {
        try {
            set({ loading: true });
            const res = await categoryService.create({ name, description, categoryUrl });
            await get().getCategorys();
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

    updateCategory: async (id, name, description, categoryUrl) => {
        try {
            set({ loading: true });
            const res = await categoryService.update({ id, name, description, categoryUrl });
            await get().getCategorys();
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

    removeCategory: async (id) => {
        try {
            set({ loading: true });
            const res = await categoryService.remove(id);
            await get().getCategorys();
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
    },
}))