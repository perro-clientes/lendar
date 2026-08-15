import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-base outline-none transition-colors focus:border-zinc-900 ${className}`}
      {...props}
    />
  );
}
