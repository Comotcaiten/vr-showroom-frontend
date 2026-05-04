"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { ApiResponse } from "@/types/api-response";

import { Model } from "@/types/model";
import { modelService } from "@/services/model-services";

type ModelContextType = {
  data: Model[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  create: (file: File) => Promise<ApiResponse<Model>>;
  remove: (id: string) => Promise<ApiResponse<Model>>;
};

const ModelContext = createContext<ModelContextType | null>(null);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await modelService.getAll();
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

  const create = async (file: File) => {
    const res = await modelService.create(file);
    await refreshData();
    return res;
  };

  const remove = async (id: string) => {
    const res = await modelService.remove(id);
    await refreshData();
    return res;
  };

  return (
    <ModelContext.Provider
      value={{ data, isLoading, refreshData, create, remove }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export const useModel = () => {
  const ctx = useContext(ModelContext);
  if (!ctx) throw new Error("useModel must be used inside ModelProvider");
  return ctx;
};
