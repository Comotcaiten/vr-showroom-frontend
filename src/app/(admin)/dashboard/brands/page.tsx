"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";

import { createBrandColumns } from "@/components/dashboard/columns/brand-columns";
import brandValidation from "@/validations/brand_validations";
import { useBrand } from "@/context/brand-context";
import { Brand } from "@/types/brand";

import { useState, useMemo } from "react";

const title = "Brands";
const schema = brandValidation.base;

export default function Page() {
  const { isLoading, data, create, update, remove } = useBrand();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const columns = createBrandColumns({
    onEdit: (brand) => setEditingBrand(brand),
    onDelete: async (brand) => {
      await remove(brand._id);
    },
  });

  const defaultValues = useMemo(() => {
    if (!editingBrand) return { name: "", description: "" };

    return {
      name: editingBrand.name,
      description: editingBrand.description ?? "",
    };
  }, [editingBrand]);

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">{title}</section>

      {/* Edit Dialog */}
      {editingBrand && (
        <DialogForm
          open={!!editingBrand}
          onOpenChange={(open) => {
            if (!open) setEditingBrand(null);
          }}
          schema={schema}
          title="Edit Brand"
          trigger={false}
          defaultValues={{
            name: editingBrand.name,
            description: editingBrand.description ?? "",
          }}
          fields={[
            { name: "name", label: "Brand Name" },
            { name: "description", label: "Description", textarea: true },
          ]}
          onSubmit={async (data) => {
            await update(editingBrand._id, {
              name: data.name || "",
              description: data.description,
            });

            setEditingBrand(null);
            return { success: true };
          }}
        />
      )}

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
              schema={schema}
              title="Create Brand"
              triggerLabel="Add Brand"
              defaultValues={{ name: "", description: "" }}
              fields={[
                { name: "name", label: "Brand Name", placeholder: "e.g. Nike" },
                { name: "description", label: "Description", textarea: true },
              ]}
              onSubmit={async (data) => {
                try {
                  await create({
                    name: data.name || "",
                    description: data.description,
                    logoUrl: data.logoUrl,
                  });
                  return { success: true };
                } catch (err) {
                  return {
                    success: false,
                    error:
                      err instanceof Error ? err.message : "An error occurred",
                  };
                }
              }}
            />
          }
        />
      )}
    </main>
  );
}
