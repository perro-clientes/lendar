"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CTAButton } from "./CTAButton";

const links = [
  { href: "/pedi-tu-prestamo", label: "Préstamos" },
  { href: "/inverti-en-lendar", label: "Inversiones" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="hover:cursor-pointer p-1 text-text"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-border bg-surface px-4 pb-6 shadow-lg">
          <ul className="flex flex-col items-start gap-1 pt-2 text-base font-medium text-text-secondary">
            {links.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  onClick={close}
                  className="hover:text-text block rounded-lg px-3 py-3 transition-colors hover:bg-background"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/contacto" onClick={close}>
              <CTAButton>Contacto</CTAButton>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
