"use client";

import clsx from "clsx";
import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";

import styles from "./Input.module.css";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "prefix"> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  rightSlot?: ReactNode;
  isLoading?: boolean;
  maxChars?: number;
  onChange?: (value: string) => void;
};

/* ---------------- Input component ---------------- */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      error,
      prefix,
      suffix,
      rightSlot,
      isLoading = false,
      maxChars,
      value,
      defaultValue,
      className,
      onChange,
      disabled = false,
      readOnly = false,
      required = false,
      type = "text",
      min,
      placeholder,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const inputId = rest.id;

    const descriptionId = inputId ? `${inputId}-description` : undefined;

    const errorId = inputId ? `${inputId}-error` : undefined;

    const isDisabled = disabled || isLoading;

    const rawValue = String(value ?? defaultValue ?? "");

    const charCount = rawValue.length;

    const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    };

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}

            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.controlWrapper}>
          <div
            className={clsx(styles.control, {
              [styles.error]: Boolean(error),
              [styles.disabled]: isDisabled,
            })}
          >
            {prefix && <span className={styles.prefix}>{prefix}</span>}

            <div className={styles.inputWrapper}>
              <input
                {...rest}
                id={inputId}
                ref={ref}
                type={type}
                value={isLoading ? "Loading..." : value}
                defaultValue={isLoading ? undefined : defaultValue}
                disabled={isDisabled}
                readOnly={readOnly || isLoading}
                required={required}
                min={min}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={clsx(styles.input, className)}
                placeholder={placeholder}
                aria-invalid={Boolean(error)}
                aria-required={required}
                aria-describedby={ariaDescribedBy || undefined}
              />

              {rightSlot && <span className={styles.rightSlot}>{rightSlot}</span>}
            </div>

            {suffix && <span className={styles.suffix}>{suffix}</span>}
          </div>
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

Input.displayName = "Input";
