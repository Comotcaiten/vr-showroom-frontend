"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { ApiResponse } from "@/types/api-response";

import { Brand, CreateBrandDto } from "@/types/brand";
import { brandService } from "@/services/brand-services";

type BrandsContextType = {
  data: Brand[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  create: (data: CreateBrandDto) => Promise<ApiResponse<Brand>>;
  update: (id: string, data: CreateBrandDto) => Promise<ApiResponse<Brand>>;
  remove: (id: string) => Promise<ApiResponse<Brand>>;
};

const BrandsContext = createContext<BrandsContextType | null>(null);

export function BrandsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await brandService.getAll();
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      setIsLoading(false);
    })();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  const create = async (payload: CreateBrandDto) => {
    const res = await brandService.create(payload);
    await refreshData();
    return res;
  };

  const update = async (id: string, payload: CreateBrandDto) => {
    const res = await brandService.update(id, payload);
    await refreshData();
    return res
  };

  const remove = async (id: string) => {
    const res = await brandService.remove(id);
    await refreshData();
    return res;
  };

  return (
    <BrandsContext.Provider
      value={{ data, isLoading, refreshData, create, update, remove }}
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
