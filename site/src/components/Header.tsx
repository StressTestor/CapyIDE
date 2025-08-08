import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image src="/capy-mascot.png" alt="CapyIDE" width={28} height={28} />
          <span>CapyIDE</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-neutral-700">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/security">Security</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}


