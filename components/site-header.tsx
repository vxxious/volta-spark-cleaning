"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./brand";

const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Why us", href: "/#about" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="header-brand" href="/" aria-label="Volta Spark home">
        <Brand />
      </Link>

      <nav className="desktop-navigation" aria-label="Main navigation">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        <Link className="nav-cta" href="/booking">
          Book a clean <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>

      <div className="mobile-navigation">
        <button
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav aria-label="Mobile navigation" hidden={!menuOpen} id="mobile-menu">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <Link className="mobile-nav-cta" href="/booking" onClick={() => setMenuOpen(false)}>Book a clean</Link>
        </nav>
      </div>
    </header>
  );
}
