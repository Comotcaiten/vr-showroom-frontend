"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { Brand, CreateBrandDto } from "@/types/brand";
import { brandService } from "@/services/brand-services";

type BrandsContextType = {
  data: Brand[];
  isLoading: boolean;
  refreshBrands: () => Promise<void>;
  create: (data: CreateBrandDto) => Promise<void>;
  update: (id: string, data: CreateBrandDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const BrandsContext = createContext<BrandsContextType | null>(null);

export function BrandsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const res = await brandService.getAll();
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBrands();
      setIsLoading(false);
    })();
  }, []);

  const refreshBrands = async () => {
    setIsLoading(true);
    await fetchBrands();
    setIsLoading(false);
  };

  const create = async (payload: CreateBrandDto) => {
    await brandService.create(payload);
    await refreshBrands();
  };

  const update = async (id: string, payload: CreateBrandDto) => {
    await brandService.update(id, payload);
    await refreshBrands();
  };

  const remove = async (id: string) => {
    await brandService.remove(id);
    await refreshBrands();
  };

  return (
    <BrandsContext.Provider
      value={{ data, isLoading, refreshBrands, create, update, remove }}
    >
      {children}
    </BrandsContext.Provider>
  );
}

export const useBrand = () => {
  const ctx = useContext(BrandsContext);
  if (!ctx) throw new Error("useBrand must be used inside BrandsProvider");
  return ctx;
};
