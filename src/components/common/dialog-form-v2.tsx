"use client";

import { memo, useCallback, useMemo, useEffect } from "react";
import { useForm, DefaultValues, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";

import { FormFieldController } from "../forms/form-field-controller";

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
  onOpenChange?: (open: boolean) => void;
  initialData?: Partial<z.infer<TSchema>> | null;
  onCreate?: (data: z.infer<TSchema>) => Promise<void>;
  onUpdate?: (data: z.infer<TSchema>) => Promise<void>;
  onError?: (error: Error) => void;
};

function DialogFormComponent<TSchema extends z.ZodTypeAny>({
  schema,
  fields,
  title,
  triggerLabel = "Add New",
  initialData,
  onCreate,
  onUpdate,
  open = false,
  onOpenChange,
  onError,
}: DialogFormProps<TSchema>) {
  type FormData = z.infer<TSchema> & FieldValues;

  const isEdit = Boolean(initialData);

  // Only recreate form resolver when schema changes
  const resolver = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => zodResolver(schema as any),
    [schema]
  );

  // Initialize form with memoized defaults - always start empty
  // The actual data will be set via reset() when dialog opens
  const form = useForm<FormData>({
    resolver,
    defaultValues: {} as DefaultValues<FormData>,
  });

  // Reset form when dialog opens with correct data based on mode
  useEffect(() => {
    if (open) {
      form.reset((initialData ?? {}) as DefaultValues<FormData>);
    }
  }, [form, open, initialData]);

  // Memoized form title - clear logic
  const dialogTitle = useMemo(() => {
    if (title) return title;
    return isEdit ? "Edit Item" : "Create Item";
  }, [title, isEdit]);

  // Memoized submit handler with error handling
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        if (isEdit) {
          await onUpdate?.(data);
        } else {
          await onCreate?.(data);
          // Only clear form after create, not after update (parent handles closing)
          form.reset({} as DefaultValues<FormData>);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        onError?.(err);
        console.error("Form submission error:", err);
      }
    },
    [isEdit, onCreate, onUpdate, onError, form]
  );

  // Memoized dialog state handler - reset to empty when closing
  const handleDialogOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        // Explicitly reset to empty object to clear all fields
        form.reset({} as DefaultValues<FormData>);
      }
      onOpenChange?.(newOpen);
    },
    [form, onOpenChange]
  );

  // Memoized cancel handler
  const handleCancel = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Memoized trigger button handler
  const handleTriggerClick = useCallback(() => {
    onOpenChange?.(true);
  }, [onOpenChange]);

  // Memoized rendered fields to prevent unnecessary re-renders
  const renderedFields = useMemo(
    () =>
      fields.map((field) => (
        <FormFieldController
          key={String(field.name)}
          control={form.control}
          name={field.name}
          id={`form-${String(field.name)}`}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          textarea={field.textarea}
          showCount={field.showCount}
          maxLength={field.maxLength}
          helperText={field.helperText}
        />
      )),
    [fields, form.control]
  );

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <Button
        variant="outline"
        className="ml-2"
        onClick={handleTriggerClick}
      >
        <PlusIcon className="size-4" />
        {triggerLabel}
      </Button>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{/* Optional description space */}</DialogDescription>

        <form onSubmit={form.handleSubmit(handleSubmit)} id="dialog-form">
          <FieldGroup>{renderedFields}</FieldGroup>
        </form>

        <DialogFooter>
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" form="dialog-form">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const DialogForm = memo(DialogFormComponent) as typeof DialogFormComponent;
