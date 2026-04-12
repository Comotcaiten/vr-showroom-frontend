// hooks/useFetchData.ts
"use client";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export function useFetchData<T>(route: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAPI({ route });
        setData(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [route]);

  return { data, loading, error };
}