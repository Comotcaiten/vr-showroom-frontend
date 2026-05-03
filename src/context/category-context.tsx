"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { ApiResponse } from "@/types/api-response";

import { Category, CreateCategoryDto } from "@/types/category";
import { categoryService } from "@/services/category-services";

type CategoryContextType = {
  data: Category[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  create: (data: CreateCategoryDto) => Promise<ApiResponse<Category>>;
  update: (id: string, data: CreateCategoryDto) => Promise<ApiResponse<Category>>;
  remove: (id: string) => Promise<ApiResponse<Category>>;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategotysProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await categoryService.getAll();
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

  const create = async (payload: CreateCategoryDto) => {
    const res = await categoryService.create(payload);
    await refreshData();
    return res;
  };

  const update = async (id: string, payload: CreateCategoryDto) => {
    const res = await categoryService.update(id, payload);
    await refreshData();
    return res
  };

  const remove = async (id: string) => {
    const res = await categoryService.remove(id);
    await refreshData();
    return res;
  };

  return (
    <CategoryContext.Provider
      value={{ data, isLoading, refreshData, create, update, remove }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used inside CategotysProvider");
  return ctx;
};
