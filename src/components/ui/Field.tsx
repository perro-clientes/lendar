import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-text-muted">{label}</span>
      {children}
    </div>
  );
}
