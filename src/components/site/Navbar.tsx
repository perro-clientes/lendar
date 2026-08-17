import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "./CTAButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/isologo-lendar.svg"
            alt="Lendar"
            width={120}
            height={32}
            priority
            className="w-22"
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm font-medium text-text-secondary md:flex">
            {/* Links de secciones — agregar cuando existan */}
          </ul>
          <Link href="/contacto">
            <CTAButton>Contacto</CTAButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}
