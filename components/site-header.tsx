import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { Brand } from "./brand";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="header-brand" href="/">
        <Brand />
      </Link>

      <nav className="desktop-navigation" aria-label="Main navigation">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        <Link className="nav-cta" href="/booking">
          Book a clean <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>

      <details className="mobile-navigation">
        <summary aria-label="Open navigation"><Menu size={22} aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="mobile-nav-cta" href="/booking">Book a clean</Link>
        </nav>
      </details>
    </header>
  );
}
