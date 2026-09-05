import {
  useController,
  useFormContext,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
} from "react-hook-form";

export type UseFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
};

export const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  defaultValue,
}: UseFormFieldProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error, invalid, isTouched, isDirty },
  } = useController<TFieldValues, TName>({
    name,
    control,
    defaultValue,
  });

  const errorMessage = typeof error?.message === "string" ? error.message : undefined;

  return {
    field,
    error: errorMessage,
    invalid,
    isTouched,
    isDirty,
  };
};
