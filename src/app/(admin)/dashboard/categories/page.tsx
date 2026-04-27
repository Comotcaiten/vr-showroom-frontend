"use client";

import { GenericTable } from "@/components/common/generic-table";
import { useEffect, useState } from "react";

import { CategoryColumns } from "@/components/dashboard/columns/category-columns";
import { categoryService } from "@/services/category-services";
import { Category } from "@/types/category";

const columns = CategoryColumns;
const title = "Brands";
const service = categoryService;

export default function Page() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await service.getAll();
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">Section 1</section>
      {isLoading ? (
        <>
          <h1>...Loaidng</h1>
        </>
      ) : (
        <GenericTable
          columns={columns}
          title={title}
          data={data}
          filter_column="name"
          has_visibility={true}
        />
      )}
    </main>
  );
}
