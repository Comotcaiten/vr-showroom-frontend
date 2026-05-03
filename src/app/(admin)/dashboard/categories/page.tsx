"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";
// {-------------------------------------- //
import { createColumns } from "@/components/dashboard/columns/category-columns";
import Validation from "@/validations/category_validations";
import { useCategory } from "@/context/category-context";
import { Category } from "@/types/category";
// --------------------------------------} //
import { useState } from "react";
import { toast } from "sonner";

const title = "Brands";
const schema = Validation.create;

export default function Page() {
  // {-------------------------------------- //
  const { isLoading, data, create, update, remove } = useCategory();
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<Category | null>(null);
  // --------------------------------------} //

  const columns = createColumns({
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
                const res = await create({
                  name: String(data.name),
                  description: data.description,
                });
                toast.success(res.message);
                setOpen(false);
                setEditingData(null);
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
