import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}
