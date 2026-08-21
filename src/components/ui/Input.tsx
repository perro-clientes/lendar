import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-text outline-none transition-colors focus:border-text ${className}`}
      {...props}
    />
  );
}
