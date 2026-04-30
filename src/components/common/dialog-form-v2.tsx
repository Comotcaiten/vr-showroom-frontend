"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormFieldController } from "../forms/form-field-controller";

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

type ApiResponseDialog = {
  message?: string;
  [key: string]: unknown;
};

type DialogFormProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema> & FieldValues>;
  fields: FieldConfig<z.infer<TSchema> & FieldValues>[];
  onSubmit: (data: z.infer<TSchema>) => Promise<ApiResponseDialog>;
  title?: string;
  triggerLabel?: string;
};

export function DialogForm<TSchema extends z.ZodTypeAny>({
  schema,
  defaultValues,
  fields,
  onSubmit,
  title = "Create",
  triggerLabel = "Add New",
}: DialogFormProps<TSchema>) {
  type FormData = z.infer<TSchema> & FieldValues;

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  async function handleSubmit(data: FormData) {
    try {
      const res = await onSubmit(data);
      toast.success(res?.message ?? "Success");
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <PlusIcon />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
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
              />
            ))}
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="dialog-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
