import type { Metadata } from "next";
import { HeroSolicitante } from "@/components/site/HeroSolicitante";

export const metadata: Metadata = {
  title: "Pedí tu préstamo",
  description:
    "Financiá tu próxima propiedad con un préstamo hipotecario en dólares, sin banco, de la mano de la red RE/MAX Argentina.",
};

export default function PediTuPrestamoPage() {
  return <HeroSolicitante />;
}
