import { type ButtonHTMLAttributes } from "react";

type Accent = "solicitante" | "inversor";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "solid-inversor" | "solid-white" | "outline-white";
  accent?: Accent;
}

// Mismas animaciones que los CTA de las landings (HeroSolicitante/HeroInversor).
const SOLID_WHITE_ACCENTS: Record<Accent, string> = {
  solicitante: "text-solicitante-dark hover:bg-solicitante-light",
  inversor: "text-inversor-dark hover:bg-inversor-light",
};

const OUTLINE_WHITE_ACCENTS: Record<Accent, string> = {
  solicitante: "hover:text-solicitante-dark",
  inversor: "hover:text-inversor-dark",
};

export function CTAButton({
  variant = "solid",
  accent = "solicitante",
  className,
  ...props
}: CTAButtonProps) {
  const base = "hover:cursor-pointer rounded-full px-8 h-11 text-sm font-semibold transition-colors";

  const variants = {
    solid: "bg-teal text-white hover:bg-teal-dark",
    outline: "border-2 border-violet-dark text-violet-dark hover:bg-violet-dark hover:text-white",
    "solid-inversor": "bg-inversor text-white hover:bg-inversor-dark",
  };

  if (variant === "solid-white") {
    return (
      <button
        className={`${base} bg-surface ${SOLID_WHITE_ACCENTS[accent]} ${className ?? ""}`}
        {...props}
      />
    );
  }

  if (variant === "outline-white") {
    return (
      <button
        className={`${base} border-2 border-surface text-surface hover:bg-surface ${OUTLINE_WHITE_ACCENTS[accent]} ${className ?? ""}`}
        {...props}
      />
    );
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
