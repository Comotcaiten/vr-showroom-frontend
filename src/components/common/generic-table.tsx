// components/GenericTablePage.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

interface GenericTablePageProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  title?: string;
  filter_column?: string;
  has_visibility?: boolean;
  dialogForm?: React.ReactNode;
}

export function GenericTable<TData>({
  columns,
  data,
  filter_column = "",
  has_visibility = false,
  dialogForm,
}: GenericTablePageProps<TData>) {
  //   const { data, loading, error } = useFetchData<TData>(route);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;
  //   if (!data) return <p>Not Found</p>;

  return (
    <section className="min-h-screen container mx-auto">
      {/* {title && <h1 className="text-2xl font-bold px-6 pt-6">{title}</h1>} */}
      <DataTable
        columns={columns}
        data={data}
        filter_column={filter_column}
        has_visibility={has_visibility}
        dialogForm={dialogForm}
      />
    </section>
  );
}
