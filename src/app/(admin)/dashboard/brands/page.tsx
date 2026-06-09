"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";

import { createColumns } from "@/components/dashboard/columns/brand-columns";
import brandValidation from "@/validations/brand_validations";
import { Brand } from "@/types/brand";

import { useEffect, useState } from "react";
import { useBrandStore } from "@/stores/useBrandStore";

const title = "Brands";
const schema = brandValidation.create;

export default function Page() {
  const {loading, dataBrand, createBrand, updateBrand, removeBrand, getBrands} = useBrandStore();
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<Brand | null>(null);

  const columns = createColumns({
    onEdit: (data) => {
      setEditingData(data);
      setOpen(true);
    },
    onDelete: async (data) => {
      await removeBrand(data._id);
    },
  });

  useEffect(() => {
    getBrands();
  }, [])

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">{title}</section>

      {loading ? (
        <h1>...Loading</h1>
      ) : (
        <GenericTable
          columns={columns}
          data={dataBrand}
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
                  type: "textarea",
                  showCount: true,
                  maxLength: 500,
                },
              ]}
              initialData={editingData}
              // title={editingData ? "Edit Brand" : "Create Brand"}
              onCreate={async (data) => {
                const success = await createBrand(
                  data.name || '',
                  data.description || '',
                  ''
                );

                if (success) {
                  setOpen(false);
                }
              }}
              onUpdate={async (data) => {
                if (!editingData) return;
                const success = await updateBrand(editingData._id, data.name || '', data.description || '', '');
                
                if (success) {
                  setOpen(false);
                }
              }}
            />
          }
        />
      )}
    </main>
  );
}
