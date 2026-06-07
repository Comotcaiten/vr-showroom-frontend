import { modelService } from "@/services/model-services";
import { ModelState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useModelStore = create<ModelState>((set, get) => ({
    data: [],
    loading: false,

    getModels: async () => {
        try {
            set({ loading: true });
            const res = await modelService.getAll();
            set({ data: res.data });
        } catch (err) {
            console.log(err);
        } finally {
            set({ loading: false });
        }
    },

    createModel: async (file) => {
        try {
            set({ loading: true });
            const res = await modelService.create(file);
            await get().getModels();
            toast.success(res.message);

            return true;
        }
        catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
            return false;
        }
        finally {
            set({ loading: false });
        }
    },

    removeModel: async (id) => {
        try {
            set({ loading: true });
            const res = await modelService.remove(id);
            await get().getModels();
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