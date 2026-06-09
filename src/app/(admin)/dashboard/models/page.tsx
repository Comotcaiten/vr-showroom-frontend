"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";
// {-------------------------------------- //
import { createColumns } from "@/components/dashboard/columns/model-columns";
import Validation from "@/validations/model_validation";
// --------------------------------------} //
import { useEffect, useState } from "react";
import { useModelStore } from "@/stores/useModelStore";

const title = "Models";
const schema = Validation.create;

export default function Page() {
  // {-------------------------------------- //
  const { loading, dataModel, createModel, removeModel, getModels } = useModelStore();
  const [open, setOpen] = useState(false);
  // --------------------------------------} //

  const columns = createColumns({
    onDelete: async (data) => {
      const success = await removeModel(data._id);
    },
  });

  useEffect(() => {
    getModels();
  }, []);

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">{title}</section>

      {loading ? (
        <h1>...Loading</h1>
      ) : (
        <GenericTable
          columns={columns}
          data={dataModel}
          has_visibility={true}
          dialogForm={
            <DialogForm
              open={open}
              onOpenChange={(o) => {
                setOpen(o);
                if (!o) {
                  setOpen(false);
                }
              }}
              schema={schema}
              // {-------------------------------------- //
              fields={[
                {
                  name: "file",
                  label: "Model file",
                  type: "file",
                  helperText: "Upload your model file",
                },
              ]}
              // --------------------------------------} //
              onCreate={async (data) => {
                let file: File | null = null;

                // Handle FileList (from file input)
                if (data.file instanceof FileList) {
                  file = data.file[0] || null;
                }
                // Handle File instance directly
                else if (data.file instanceof File) {
                  file = data.file;
                }
                // Handle array
                else if (Array.isArray(data.file) && data.file[0] instanceof File) {
                  file = data.file[0];
                }

                if (!file) {
                  return;
                }

                const success = await createModel(file);
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
