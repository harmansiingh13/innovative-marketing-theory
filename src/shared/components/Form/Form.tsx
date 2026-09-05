import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  type FormEventHandler,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import {
  FormProvider,
  type FieldValues,
  type SubmitErrorHandler,
  type UseFormReturn,
} from "react-hook-form";
import styles from "./Form.module.css";

export type FormProps<T extends FieldValues = FieldValues> = Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit"
> & {
  methods: UseFormReturn<T>;
  readOnly?: boolean;
  beforeSubmitValidators?: Array<() => boolean>;
  onSubmit: (values: T) => void | Promise<void>;
  onSubmitError?: SubmitErrorHandler<T>;
};

export const Form = <T extends FieldValues = FieldValues>({
  children,
  methods,
  readOnly = false,
  beforeSubmitValidators = [],
  onSubmit,
  onSubmitError,
  className,
  ...props
}: PropsWithChildren<FormProps<T>>) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;

    if (!form) return;

    if (readOnly) {
      form.setAttribute("inert", "");
    } else {
      form.removeAttribute("inert");
    }
  }, [readOnly]);

  const defaultSubmitErrorHandler: SubmitErrorHandler<T> = (errors) => {
    console.error("Form validation failed:", errors);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const canSubmit = beforeSubmitValidators.every((validator) => validator());

    if (!canSubmit) {
      event.preventDefault();
      return;
    }

    return methods.handleSubmit(onSubmit, onSubmitError ?? defaultSubmitErrorHandler)(event);
  };

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        noValidate
        autoComplete="off"
        className={clsx(styles.root, className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};
