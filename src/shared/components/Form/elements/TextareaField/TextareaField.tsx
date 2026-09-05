import { type FieldPath, type FieldValues } from "react-hook-form";
import { Textarea, type TextareaProps } from "@/shared/components/Textarea";
import { useFormField } from "../../hooks/useFormField";

export type TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  TextareaProps,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref" | "error"
> & {
  name: TName;
};

export const TextareaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  ...props
}: TextareaFieldProps<TFieldValues, TName>) => {
  const { field, error } = useFormField<TFieldValues, TName>({
    name,
  });

  return <Textarea {...props} {...field} error={error} />;
};
