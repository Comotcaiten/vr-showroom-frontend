"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "../ui/input-group";
interface FormFieldControllerProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  helperText?: string;
  showCount?: boolean; // 🔥 thêm option xịn
  maxLength?: number;

  isSelect?: boolean;
  selectContent?: FieldSelectConfig;

  disabled?: boolean;
}

export type FieldSelectItemConfig = {
  id: string;
  value: string;
  label: string;
}

export type FieldSelectConfig = {
  defaultValue?: FieldSelectItemConfig;
  items?: FieldSelectItemConfig[];
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
  showCount = false,
  maxLength,
  disabled = false,
}: FormFieldControllerProps<T>) {

  const isTextarea = type === "textarea";
  const isFile = type === "file";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const valueLength = field.value?.length ?? 0;

        // Handle file input separately - don't use value, only onChange
        if (isFile) {
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name={field.name}
                  id={id}
                  placeholder={placeholder}
                  required={required}
                  aria-invalid={fieldState.invalid}
                  type="file"
                  onChange={(e) => {
                    // For file input, pass the FileList to the field
                    const files = e.target.files;
                    field.onChange(files);
                  }}
                  disabled = {disabled}
                />
              </InputGroup>
              {helperText && <FieldDescription>{helperText}</FieldDescription>}
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>

            <InputGroup>
              {isTextarea ? (<InputGroupTextarea
                // {...field}
                value={field.value ?? ""}
                name={field.name}
                id={id}
                placeholder={placeholder}
                required={required}
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
                onChange={field.onChange}
                disabled = {disabled}
              />) : (             // type = default
                <InputGroupInput
                  // {...field}
                  value={field.value ?? ""}
                  name={field.name}
                  id={id}
                  placeholder={placeholder}
                  required={required}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type={type}
                  onChange={field.onChange}
                  disabled = {disabled}
                />)}

              {showCount && maxLength && (
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {valueLength}/{maxLength}
                  </InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>

            {helperText && <FieldDescription>{helperText}</FieldDescription>}

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

