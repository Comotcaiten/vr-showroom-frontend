import { brandService } from "@/services/brand-services";
import { Brand } from "@/types/brand";
import { BrandState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useBrandStore = create<BrandState>((set, get) => ({
  dataBrand: [],
  loading: false,

  getBrands: async () => {
    try {
      set({ loading: true });
      const res = await brandService.getAll();
      set({ dataBrand: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  createBrand: async (name, description, logoUrl) => {
    try {
      set({ loading: true });
      const res = await brandService.create({ name, description, logoUrl });
      await get().getBrands();
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

  updateBrand: async (id, name, description, logoUrl) => {
    try {
      set({ loading: true });
      const res = await brandService.update({ id, name, description, logoUrl });
      await get().getBrands();
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

  removeBrand: async (id) => {
    try {
      set({ loading: true });
      const res = await brandService.remove(id);
      await get().getBrands();
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
}));
