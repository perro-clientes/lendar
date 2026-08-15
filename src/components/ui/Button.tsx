import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-14 w-full items-center justify-center rounded-full bg-zinc-900 text-base font-semibold text-white transition-colors active:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
