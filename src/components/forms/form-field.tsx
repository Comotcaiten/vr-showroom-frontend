import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormFieldProps {
    label: string;
    name: string;
    id: string;
    placeholder?: string;
    required: boolean;
    // value: string;
    onChange: (e: |React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string;
    type?: string;
    helperText?: string;
    textarea?: boolean
}

export const FormField = ({
    label,
    name,
    id,
    placeholder,
    required,
    // value,
    onChange,
    error,
    type = "text",
    helperText,
    textarea = false,
}: FormFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>&ensp;{`${label}`}</Label>
            {textarea ? (
                <Textarea
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    // value={value}
                    onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            ) : (<Input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                // value={value}
                onChange={onChange}
                aria-describedby={error ? `${id}-error` : undefined}
            />)}
            {helperText && (<p className="text-xs text-muted-foreground mt-1">{helperText}</p>)}
            {error && <p id={`${id}-error`} className="text-red-500">{error}</p>}
        </div>
    );
}