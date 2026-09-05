import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  isWide?: boolean;
  variant?: "primary" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  shape?: "default" | "pill" | "round";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      isLoading = false,
      isWide = false,
      variant = "primary",
      size = "md",
      shape = "default",
      disabled,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          styles.root,
          styles[variant],
          styles[size],
          styles[shape],
          {
            [styles.wide]: isWide,
          },
          className,
        )}
      >
        {leftIcon && <span className={styles.slot}>{leftIcon}</span>}

        <span className={styles.content}>{children}</span>

        {rightIcon && <span className={styles.slot}>{rightIcon}</span>}

        {isLoading && <span className={styles.loader} />}
      </button>
    );
  },
);

Button.displayName = "Button";
