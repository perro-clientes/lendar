import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-14 w-full items-center justify-center rounded-full bg-text text-base font-semibold text-surface transition-colors active:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
