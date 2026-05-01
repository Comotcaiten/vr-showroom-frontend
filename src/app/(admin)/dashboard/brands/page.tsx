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
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const columns = createBrandColumns({
    onEdit: (brand) => {
      setEditingBrand(brand);
      setOpen(true);
    },
    onDelete: async (brand) => {
      const res = await remove(brand._id);

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
                if (!o) setEditingBrand(null);
              }}
              schema={schema}
              fields={[
                { name: "name", label: "Brand Name" },
                { name: "description", label: "Description" },
              ]}
              initialData={editingBrand}
              title={editingBrand ? "Edit Brand" : "Create Brand"}
              onCreate={async (data) => {
                const res = await create({
                  name: String(data.name),
                  description: data.description,
                });

                toast.success(res.message);
              }}
              onUpdate={async (data) => {
                if (!editingBrand) return;

                const res = await update(editingBrand._id, {
                  name: String(data.name),
                  description: data.description,
                });
                toast.success(res.message);
                setOpen(false);
                setEditingBrand(null);
              }}
            />
          }
        />
      )}
    </main>
  );
}
