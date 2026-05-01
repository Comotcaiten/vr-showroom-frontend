"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldController } from "../forms/form-field-controller";
import { useEffect } from "react";

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  helperText?: string;
  textarea?: boolean;
  showCount?: boolean;
  maxLength?: number;
};

type DialogFormProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  fields: FieldConfig<z.infer<TSchema> & FieldValues>[];
  title?: string;
  triggerLabel?: string;

  open?: boolean;
  onOpenChange?(open: boolean): void;

  initialData?: Partial<z.infer<TSchema>> | null;

  onCreate?: (data: z.infer<TSchema>) => Promise<void>;
  onUpdate?: (data: z.infer<TSchema>) => Promise<void>;
};

export function DialogForm<TSchema extends z.ZodTypeAny>({
  schema,
  fields,
  title = "Create",
  triggerLabel = "Add New",
  initialData,
  onCreate,
  onUpdate,
  open,
  onOpenChange,
}: DialogFormProps<TSchema>) {
  type FormData = z.infer<TSchema> & FieldValues;

  const isEdit = !!initialData;

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: (initialData ?? {}) as DefaultValues<FormData>,
  });

  // reset khi đổi edit item
  useEffect(() => {
    if (open) {
      form.reset((initialData ?? {}) as DefaultValues<FormData>);
    }
  }, [form, open, initialData]);

  async function handleSubmit(data: FormData) {
    if (isEdit) {
      await onUpdate?.(data);
    } else {
      await onCreate?.(data);
      form.reset(); // clear sau create
    }
  }

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.reset({} as DefaultValues<FormData>); // 🔥 clear form
    }

    onOpenChange?.(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        variant="outline"
        className="ml-2"
        onClick={() => onOpenChange?.(true)}
      >
        <PlusIcon />
        {triggerLabel}
      </Button>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {title ?? (isEdit ? "Edit Item" : "Create Item")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription> </DialogDescription>
        <form onSubmit={form.handleSubmit(handleSubmit)} id="dialog-form">
          <FieldGroup>
            {fields.map((field) => (
              <FormFieldController
                key={String(field.name)}
                control={form.control}
                name={field.name}
                id={`form-${String(field.name)}`}
                label={field.label}
                placeholder={field.placeholder}
                textarea={field.textarea}
                showCount={field.showCount}
                maxLength={field.maxLength}
                helperText={field.helperText}
              />
            ))}
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="dialog-form">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
