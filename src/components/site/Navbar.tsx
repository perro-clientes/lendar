import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "./CTAButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

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
          <NavLinks />
          <div className="hidden md:block">
            <Link href="/contacto">
              <CTAButton>Contacto</CTAButton>
            </Link>
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
