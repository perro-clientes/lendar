"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/pedi-tu-prestamo", label: "Préstamos" },
  { href: "/inverti-en-lendar", label: "Inversiones" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 text-sm font-medium text-text-secondary md:flex">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`underline-offset-4 transition-colors hover:text-inversor hover:underline ${
                active ? "text-inversor underline" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
