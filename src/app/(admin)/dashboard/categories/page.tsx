"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";
// {-------------------------------------- //
import { createColumns } from "@/components/dashboard/columns/category-columns";
import Validation from "@/validations/category_validations";
import { Category } from "@/types/category";
// --------------------------------------} //
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/useCategoryStore";

const title = "Brands";
const schema = Validation.create;

export default function Page() {
  // {-------------------------------------- //
  const { loading, dataCategory, createCategory, updateCategory, removeCategory, getCategorys } = useCategoryStore();
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<Category | null>(null);
  // --------------------------------------} //

  const columns = createColumns({
    onEdit: (data) => {
      setEditingData(data);
      setOpen(true);
    },
    onDelete: async (data) => {
      const res = await removeCategory(data._id);
    },
  });

  useEffect(() => {
    getCategorys();
  }, [])

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">{title}</section>

      {loading ? (
        <h1>...Loading</h1>
      ) : (
        <GenericTable
          columns={columns}
          data={dataCategory}
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
              // {-------------------------------------- //
              fields={[
                {
                  name: "name",
                  label: "Category Name",
                  helperText: "Category name like: Chair",
                },
                {
                  name: "description",
                  label: "Description",
                  type: "textarea",
                  showCount: true,
                  maxLength: 500,
                },
                // {
                //   name: "select-name",
                //   label: "select-label",
                //   isSelect: true,
                //   placeholder: "Select a table",
                //   selectContent: {
                //     defaultValue: {id: "1", value: "1", label: "1"},
                //     items: [
                //       {id: "1", value: "1", label: "1"},
                //       {id: "2", value: "2", label: "2"},
                //       {id: "3", value: "3", label: "3"},
                //     ]
                //   }
                // }
              ]}
              // --------------------------------------} //
              initialData={editingData}
              // title={editingData ? "Edit Brand" : "Create Brand"}
              onCreate={async (data) => {
                const success = await createCategory(data.name || "", data.description || "", "");
                if (success) {
                  setOpen(false);
                }
              }}
              onUpdate={async (data) => {
                if (!editingData) return;
                const success = await updateCategory(editingData._id ,data.name || "", data.description || "", "");
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
