import { type FieldPath, type FieldValues } from "react-hook-form";
import { Input, type InputProps } from "@/shared/components/Input/Input";
import { useFormField } from "../../hooks/useFormField";

export type InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  InputProps,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref" | "error"
> & {
  name: TName;
};

export const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  ...props
}: InputFieldProps<TFieldValues, TName>) => {
  const { field, error } = useFormField<TFieldValues, TName>({
    name,
  });

  return <Input {...props} {...field} error={error} />;
};
