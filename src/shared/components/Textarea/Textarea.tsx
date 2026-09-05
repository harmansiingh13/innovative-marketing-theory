import clsx from "clsx";
import { forwardRef, type ChangeEvent, type ReactNode, useId } from "react";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";
import styles from "./Textarea.module.css";

export type TextareaProps = Omit<TextareaAutosizeProps, "onChange"> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  rightSlot?: ReactNode;
  maxChars?: number;
  onChange?: (value: string) => void;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      rightSlot,
      maxChars,
      value,
      defaultValue,
      className,
      onChange,
      disabled = false,
      required = false,
      readOnly = false,
      minRows = 3,
      maxRows = 8,
      ...rest
    },
    ref,
  ) => {
    const textareaId = useId();
    const descriptionId = `${textareaId}-description`;
    const errorId = `${textareaId}-error`;

    const isDisabled = disabled;
    const currentValue = String(value ?? defaultValue ?? "");
    const charCount = currentValue.length;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.value);
    };

    const ariaDescribedBy = [description ? descriptionId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}

            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}

        <div
          className={clsx(styles.control, {
            [styles.error]: Boolean(error),
            [styles.disabled]: isDisabled,
          })}
        >
          <TextareaAutosize
            {...rest}
            id={textareaId}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            disabled={isDisabled}
            readOnly={readOnly}
            required={required}
            minRows={minRows}
            maxRows={maxRows}
            onChange={handleChange}
            className={clsx(styles.textarea, className)}
            aria-invalid={Boolean(error)}
            aria-required={required}
            aria-describedby={ariaDescribedBy || undefined}
          />

          {rightSlot && <span className={styles.rightSlot}>{rightSlot}</span>}
        </div>

        {(description || maxChars !== undefined) && (
          <div className={styles.footer}>
            {description ? (
              <span id={descriptionId} className={styles.description}>
                {description}
              </span>
            ) : (
              <span aria-hidden="true" />
            )}

            {maxChars !== undefined && (
              <span
                className={clsx(styles.charCount, {
                  [styles.charCountExceeded]: charCount > maxChars,
                })}
                aria-live="polite"
              >
                {charCount}/{maxChars}
              </span>
            )}
          </div>
        )}

        {error && (
          <span id={errorId} role="alert" className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
