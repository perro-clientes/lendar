import { type ButtonHTMLAttributes } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "solid-inversor" | "solid-white" | "outline-white";
}

export function CTAButton({ variant = "solid", className, ...props }: CTAButtonProps) {
  const base = "hover:cursor-pointer rounded-full px-8 h-11 text-sm font-semibold transition-colors";

  const variants = {
    solid: "bg-teal text-white hover:bg-teal-dark",
    outline: "border-2 border-violet-dark text-violet-dark hover:bg-violet-dark hover:text-white",
    "solid-inversor": "bg-inversor text-white hover:bg-inversor-dark",
    "solid-white": "bg-surface text-text hover:bg-border",
    "outline-white": "border-2 border-surface text-surface hover:bg-surface/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
