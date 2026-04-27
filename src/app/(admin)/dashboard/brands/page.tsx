"use client";
import { GenericTable } from "@/components/common/generic-table";
import { useEffect, useState } from "react";

import { BrandColumns } from "@/components/dashboard/columns/brand-columns";
import { brandService } from "@/services/brand-services";
import { Brand } from "@/types/brand";

const columns = BrandColumns;
const title = "Brands";
const service = brandService;

export default function Page() {
  const [data, setData] = useState<Brand[]>([]);
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
