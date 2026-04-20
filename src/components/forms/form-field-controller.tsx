"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "../ui/input-group";

interface FormFieldControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  helperText?: string;
  textarea?: boolean;
  showCount?: boolean; // 🔥 thêm option xịn
  maxLength?: number;
}

export function FormFieldController<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder,
  required,
  type = "text",
  helperText,
  textarea = false,
  showCount = false,
  maxLength,
}: FormFieldControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const valueLength = field.value?.length ?? 0;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>

            <InputGroup>
              {textarea ? (
                <InputGroupTextarea
                  {...field}
                  name={field.name}
                  id={id}
                  placeholder={placeholder}
                  required={required}
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
              ) : (
                <InputGroupInput
                  {...field}
                  name={field.name}
                  id={id}
                  placeholder={placeholder}
                  required={required}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type={type}
                />
              )}

              {showCount && maxLength && (
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {valueLength}/{maxLength}
                  </InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>

            {helperText && (
              <FieldDescription>{helperText}</FieldDescription>
            )}

            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
}