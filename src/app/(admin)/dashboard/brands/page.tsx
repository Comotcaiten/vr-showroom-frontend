"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";

import { createBrandColumns } from "@/components/dashboard/columns/brand-columns";
import brandValidation from "@/validations/brand_validations";
import { useBrand } from "@/context/brand-context";
import { Brand } from "@/types/brand";

import { useState } from "react";
import { toast } from "sonner";

const title = "Brands";
const schema = brandValidation.create;

export default function Page() {
  const { isLoading, data, create, update, remove } = useBrand();
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<Brand | null>(null);

  const columns = createBrandColumns({
    onEdit: (data) => {
      setEditingData(data);
      setOpen(true);
    },
    onDelete: async (data) => {
      const res = await remove(data._id);

      toast.success(res.message);
    },
  });

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">{title}</section>

      {isLoading ? (
        <h1>...Loading</h1>
      ) : (
        <GenericTable
          columns={columns}
          data={data}
          filter_column="name"
          has_visibility={true}
          dialogForm={
            <DialogForm
              open={open}
              onOpenChange={(o) => {
                setOpen(o);
                console.log(o);
                if (!o) {
                  console.log("Set Null")
                  setEditingData(null)
                };
              }}
              schema={schema}
              fields={[
                {
                  name: "name",
                  label: "Brand Name",
                  helperText: "Brand name like: Nike",
                },
                {
                  name: "description",
                  label: "Description",
                  textarea: true,
                  showCount: true,
                  maxLength: 500,
                },
              ]}
              initialData={editingData}
              title={editingData ? "Edit Brand" : "Create Brand"}
              onCreate={async (data) => {
                const res = await create({
                  name: String(data.name),
                  description: data.description,
                });

                toast.success(res.message);
              }}
              onUpdate={async (data) => {
                if (!editingData) return;

                const res = await update(editingData._id, {
                  name: String(data.name),
                  description: data.description,
                });
                toast.success(res.message);
                setOpen(false);
                setEditingData(null);
              }}
            />
          }
        />
      )}
    </main>
  );
}
