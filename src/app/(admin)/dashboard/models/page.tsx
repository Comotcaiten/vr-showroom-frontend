"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";
// {-------------------------------------- //
import { createColumns } from "@/components/dashboard/columns/model-columns";
import Validation from "@/validations/model_validation";
import { useModel } from "@/context/model-context";
// --------------------------------------} //
import { useState } from "react";
import { toast } from "sonner";

const title = "Models";
const schema = Validation.create;

export default function Page() {
  // {-------------------------------------- //
  const { isLoading, data, create, remove } = useModel();
  const [open, setOpen] = useState(false);
  // --------------------------------------} //

  const columns = createColumns({
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
                  toast.error("Please select a file");
                  return;
                }
                
                const res = await create(file);
                toast.success(res.message);
                setOpen(false);
              }}
            />
          }
        />
      )}
    </main>
  );
}
