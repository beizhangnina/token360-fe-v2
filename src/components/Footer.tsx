import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Partners", href: "/partners" },
];

const resourceLinks = [
  { label: "About Us", href: "/resources" },
  { label: "Doc", href: "/docs" },
  { label: "Contact Sales", href: "/enterprise#contact-us" },
  { label: "Support", href: "/support" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-[40px] font-medium text-[var(--text-primary)] md:text-[80px]">
          Token360
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:flex-wrap md:gap-16">
          <ul className="flex min-w-[200px] flex-col gap-4">
            <li className="text-2xl font-medium text-[var(--text-primary)]">Navigation</li>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex min-w-[200px] flex-col gap-4">
            <li className="text-2xl font-medium text-[var(--text-primary)]">Resources</li>
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 border-t border-[var(--border-subtle)] pt-8 text-center text-xs text-[var(--text-secondary)]">
          © 2026 Super Individual LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
